import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useQueryParams", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    cleanup();
  });

  it("should create single query param", async () => {
    const setSearchParamsMock = vi.fn();

    vi.doMock("react-router-dom", () => {
      return {
        useSearchParams: () => {
          return [
            {
              entries: () => {
                return [];
              },
            },
            setSearchParamsMock,
          ];
        },
      };
    });

    const { useQueryParams } = await import("./useQueryParams");
    const { setQueryParam } = useQueryParams();

    setQueryParam("breed_ids", "Bengal");

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      breed_ids: "Bengal",
    });
    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
  });

  it("should create multiple query params", async () => {
    const setSearchParamsMock = vi.fn();

    vi.doMock("react-router-dom", () => {
      return {
        useSearchParams: () => {
          return [
            {
              entries: () => [],
            },
            setSearchParamsMock,
          ];
        },
      };
    });

    const { useQueryParams } = await import("./useQueryParams");
    const { setQueryParams } = useQueryParams();

    setQueryParams({ breed_ids: "Bengal", page: null, order: "ASC" });

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
    expect(setSearchParamsMock).toHaveBeenCalledWith({
      breed_ids: "Bengal",
      order: "ASC",
    });
  });

  it("should read query param", async () => {
    vi.doMock("react-router-dom", () => {
      return {
        useSearchParams: () => {
          return [
            {
              entries: () => {
                return [["page", 1]];
              },
            },
          ];
        },
      };
    });

    const { useQueryParams } = await import("./useQueryParams");
    const { params } = useQueryParams();

    expect(params).toEqual({ page: 1 });
  });

  it("should update single query param", async () => {
    const setSearchParamsMock = vi.fn();

    vi.doMock("react-router-dom", () => {
      return {
        useSearchParams: () => [
          {
            entries: () => {
              return [
                ["breed_ids", "Abb"],
                ["page", 1],
              ];
            },
          },
          setSearchParamsMock,
        ],
      };
    });

    const { useQueryParams } = await import("./useQueryParams");
    const { setQueryParam } = useQueryParams();

    setQueryParam("breed_ids", "Bengal");

    expect(setSearchParamsMock).toBeCalledTimes(1);
    expect(setSearchParamsMock).toHaveBeenCalledWith({
      breed_ids: "Bengal",
      page: 1,
    });
  });

  it("should update multiple query params and filter out falsy values", async () => {
    const setSearchParamsMock = vi.fn();

    vi.doMock("react-router-dom", () => {
      return {
        useSearchParams: () => [
          {
            entries: () => {
              return [];
            },
          },
          setSearchParamsMock,
        ],
      };
    });

    const { useQueryParams } = await import("./useQueryParams");
    const { setQueryParams } = useQueryParams();

    setQueryParams({
      breed_ids: "Bengal",
      page: 2,
      order: null,
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      breed_ids: "Bengal",
      page: 2,
    });
  });

  it("should remove query param", async () => {
    const setSearchParamsMock = vi.fn();

    vi.doMock("react-router-dom", () => {
      return {
        useSearchParams: () => {
          return [
            {
              entries: () => {
                return [
                  ["page", 1],
                  ["order", "ASC"],
                  ["breed_ids", "Bengal"],
                ];
              },
            },
            setSearchParamsMock,
          ];
        },
      };
    });

    const { useQueryParams } = await import("./useQueryParams");
    const { removeQueryParam } = useQueryParams();

    removeQueryParam("page");

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      order: "ASC",
      breed_ids: "Bengal",
    });
  });
});
