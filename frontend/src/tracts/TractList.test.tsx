import { render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TractList from "./TractList";

global.fetch = vi.fn();

const createFetchResponse = (data: any) => ({
  json: () => new Promise((resolve) => resolve(data)),
});

describe("TractList", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("When it is loading", () => {
    it("Then it renders the loading state", () => {
      // We don't care about the response for this test
      fetch.mockResolvedValue(createFetchResponse({}));

      render(<TractList />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  describe("When the tract list has loaded", () => {
    it("Then it renders the table correctly", async () => {
      fetch.mockResolvedValue(
        createFetchResponse({
          tracts: [
            {
              aland: 25065045,
              awater: 38157,
              countyfp: "085",
              fid: 1,
              funcstat: "S",
              geoid: "27085950700",
              intptlat: "+44.7706226",
              intptlon: "-094.1443363",
              mtfcc: "G5020",
              name: "9507",
              namelsad: "Census Tract 9507",
              statefp: "27",
              tractce: "950700",
            },
            {
              aland: 10082553,
              awater: 40680,
              countyfp: "017",
              fid: 2,
              funcstat: "S",
              geoid: "27017070200",
              intptlat: "+46.6933946",
              intptlon: "-092.4392159",
              mtfcc: "G5020",
              name: "702",
              namelsad: "Census Tract 702",
              statefp: "27",
              tractce: "070200",
            },
          ],
        })
      );

      render(<TractList />);

      expect(screen.getByRole("table")).toBeInTheDocument();

      // Headers

      const headerRow = screen.getAllByRole("row").at(0);

      const checkColumnContent = (
        row: HTMLElement | undefined,
        role: string,
        index: number,
        value: string
      ) => {
        expect(
          (within(row).getAllByRole(role).at(index) ?? {}).textContent
        ).toEqual(value);
      };

      const checkColumnHeader = (index: number, value: string) =>
        checkColumnContent(headerRow, "columnheader", index, value);

      checkColumnHeader(0, "Name");
      checkColumnHeader(1, "State");
      checkColumnHeader(2, "County");
      checkColumnHeader(3, "Tract CE");
      checkColumnHeader(4, "GeoID");
      checkColumnHeader(5, "Latitude");
      checkColumnHeader(6, "Longitude");

      // Rows

      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(3);
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      const checkColumn = (
        row: HTMLElement | undefined,
        index: number,
        value: string
      ) => checkColumnContent(row, "cell", index, value);

      const row1 = screen.getAllByRole("row").at(1);
      const row1link = within(row1).getByRole("link", {
        name: "Census Tract 9507",
      });
      expect(row1link).toBeInTheDocument();
      expect(row1link.href).toMatch(/\/1$/);
      checkColumn(row1, 0, "27"); // statefp
      checkColumn(row1, 1, "085"); // countyfp
      checkColumn(row1, 2, "950700"); // tractce
      checkColumn(row1, 3, "27085950700"); // geoid
      checkColumn(row1, 4, "+44.7706226"); // intptlat
      checkColumn(row1, 5, "-094.1443363"); // intptlon

      const row2 = screen.getAllByRole("row").at(2);
      const row2link = within(row2).getByRole("link", {
        name: "Census Tract 702",
      });
      expect(row2link).toBeInTheDocument();
      expect(row2link.href).toMatch(/\/2$/);
      checkColumn(row2, 0, "27"); // statefp
      checkColumn(row2, 1, "017"); // countyfp
      checkColumn(row2, 2, "070200"); // tractce
      checkColumn(row2, 3, "27017070200"); // geoid
      checkColumn(row2, 4, "+46.6933946"); // intptlat
      checkColumn(row2, 5, "-092.4392159"); // intptlon
    });
  });
});
