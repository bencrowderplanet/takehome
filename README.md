# Planet takehome for Ben Crowder

## Backend

### Installation for development

- `cd backend`
- Have Python 3 installed
- Make a virtualenv: `python -m venv venv`
- Activate it: `source venv/bin/activate`
- Install dependencies: `pip3 install -r requirements.txt && pip3 install -r requirements.dev.txt`

### Usage

- Run the Flask app: `make server` (or `FLASK_APP=main.py flask run`)
- This should be running on localhost port 5000; if not, you'll need to update `frontend/.env`

### Testing

- `pytest`

---

## Frontend

### Installation

- `cd frontend`
- Install dependencies: `npm install` (I'm on Node 19.7.0 and npm 9.6.0; you can `nvm use` if you have nvm)

### Usage

- Run the dev server: `npm run dev`
- Vite should give you a URL to navigate to in your browser

### Testing

- `npm run test`


---

## Backend notes & future improvements

- I tried to spend more time on the frontend part since that's how this role is weighted.
- I opted to leave the `geom` field out of the tract list since it's potentially not necessary at that point (but definitely necessary on the detail page), and it's large. I'd ask product/design about the needs here. If we did need to show the geometry at the list level, maybe look into ways to optimize/simplify it.
- For an actual Flask app, I'd probably use SQLAlchemy to work with the database. (But I've mostly done Django which has its own ORM and database drivers built in. Haven't used SQLAlchemy yet.) The current makeshift database abstraction I put together here isn't particularly elegant.
- Look into pooling database connections.
- Order the tracts in whatever order they're supposed to be in (assuming primary key isn't it).
- The architecture here needs work. I'm not as familiar with how Flask apps are idiomatically organized.
- Model the data better. Right now we're just using simple dicts.
- Look into caching the API responses so that the backend doesn't have to pull from the database every hit. This would depend on how often the tracts are updated (we don't want to cache daily if the tracts are updated hourly, for example) and what expected API usage is.
- Make the API consistent with established Planet conventions (response wrappers, pagination, etc.).
- Better error handling. On the API endpoints, for example, I'd figure out which exceptions we need to catch and handle those specifically.
- Add authentication, if this isn't intended to be a public API.
- Maybe add Python type annotations. I haven't used them yet but would like to.
- Add more unit tests on the backend. I didn't test the database abstractions because in reality I wouldn't be using the database abstractions anyway.
- Modularization. This takehome is simple enough that I opted to keep everything in the root directory, but on any normal application we'd want to separate things into modules. (I'm not sure what Flask conventions are, but in Django typically we'd have `models`, `views`, etc.)
- I used Flask-CORS to simplify things, but in reality I would whitelist domains via the access control headers, rather than opening up the endpoint to everywhere (unless it's intended to be a public API).


## Frontend notes & future improvements

- If you're on an older Node, you may run into issues with `.at()`
- I went with wouter as a lightweight react-router replacement, because I'd read about it but hadn't used it before. (Worked well for these very simple needs.)
- I chose Vite for the bundler, again because I'd read about it but hadn't used it. It's fast.
- Because of Vite, I went with vitest instead of jest for testing. It's similar but a little different.
- With the unit tests there are some `act` warnings that React Testing Library should be handling already. At this point it seems like it might be a vitest nuance.
- These instructions just run the dev server. One note for that is that it's using React strict mode, so things render twice (where they'd only render once in prod).
- For a real app, I'd be looking more into server-side generation, maybe using Next.js (which would also replace wouter).
- The homegrown data fetching framework needs to be replaced with something real and robust.
- Having design and product provide input and direction would help tremendously. What are the goals for these pages? What are the constraints? Having actual designs to work off would also help a lot. (I just threw some tables together. I'm not happy with the design.)
- It would be helpful to know more about the data (what forms it can take, what it means, etc.).
- Add pagination, if the backend supports it.
- Better loading states.
- Better URL/path design.
- Better error handling. There's a general ErrorBoundary but it would be better to address error handling at a more granular level.
- Right now the tract list table is a bit sluggish to load with 1,500 rows. Pagination would help here. Lazy loading could also help, though that depends on the design.
- There might be some room for memoization.
- I'd look into bundle size and probably set up tree shaking. (Which I haven't actually done yet, since it's always been set up already on the apps I've worked on.)
- More frontend unit tests. I added a handful but there could be more. (Tests for the fetch hooks, for example.)
- Ideally the app wouldn't reload tracts when coming back from the tract detail page. We'd need to store the tracts in state (Redux or something else) and use them instead, only fetching from the API when it's a cold load. (But this also really depends on how often the tracts are changing. If they're changing frequently, reloading them on back navigation might make sense.)
- I ran out of time to render the geometry of the census tract on the detail page, which is sad because it sounded fun.
