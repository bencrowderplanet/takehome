import { render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TractDetail from "./TractDetail";

global.fetch = vi.fn();

const createFetchResponse = (data: any) => ({
  json: () => new Promise((resolve) => resolve(data)),
});

describe("TractDetail", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("When it is loading", () => {
    it("Then it renders the loading state", () => {
      // We don't care about the response for this test
      fetch.mockResolvedValue(createFetchResponse({}));

      render(<TractDetail params={{ fid: 1 }} />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });
  });

  describe("When the tract has loaded", () => {
    it("Then it renders the table correctly", async () => {
      fetch.mockResolvedValue(
        createFetchResponse({
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
        })
      );

      render(<TractDetail params={{ fid: 1 }} />);

      expect(screen.queryByText("Loading...")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(12); // 12 fields currently
        expect(
          screen.getByRole("link", { name: "Back to tracts" })
        ).toBeInTheDocument();
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      expect(screen.getByRole("table")).toBeInTheDocument();

      const checkRow = (
        row: HTMLElement | undefined,
        label: string,
        value: string
      ) => {
        expect(
          (within(row).getByRole("columnheader") ?? {}).textContent
        ).toEqual(label);
        expect((within(row).getByRole("cell") ?? {}).textContent).toEqual(
          value
        );
      };

      expect(screen.getByText("Census Tract 9507")).toBeInTheDocument();

      const rows = screen.getAllByRole("row");

      checkRow(rows.at(0), "FID", "1");
      checkRow(rows.at(1), "Name", "9507");
      checkRow(rows.at(2), "State", "27");
      checkRow(rows.at(3), "County", "085");
      checkRow(rows.at(4), "Tract CE", "950700");
      checkRow(rows.at(5), "GeoID", "27085950700");
      checkRow(rows.at(6), "MTFCC", "G5020");
      checkRow(rows.at(7), "FuncStat", "S");
      checkRow(rows.at(8), "A Land", "25065045");
      checkRow(rows.at(9), "A Water", "38157");
      checkRow(rows.at(10), "Latitude", "+44.7706226");
      checkRow(rows.at(11), "Longitude", "-094.1443363");
    });
  });
});
