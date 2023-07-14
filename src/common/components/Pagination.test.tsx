import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TestsWrapper } from "../tests/TestsWrapper";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render all pages when there are less or equal to 7 pages", async () => {
    render(<Pagination total={14} limit={2} />, { wrapper: TestsWrapper });
    const pages = screen.getAllByTestId("pagination-page");
    expect(pages.length).toEqual(7);
  });

  it("should not render pagination when there are less than 2 pages", async () => {
    render(<Pagination total={14} limit={14} />, { wrapper: TestsWrapper });
    const pages = screen.queryByTestId("pagination-page");
    expect(pages).toBeNull();
  });

  it("should render first 5 pages, '...', and the last page", async () => {
    render(<Pagination total={100} limit={10} />, { wrapper: TestsWrapper });
    const pages = screen.queryAllByTestId("pagination-page");
    expect(pages.length).toEqual(7);
    expect(pages[0].textContent).toEqual("1");
    expect(pages[1].textContent).toEqual("2");
    expect(pages[2].textContent).toEqual("3");
    expect(pages[3].textContent).toEqual("4");
    expect(pages[4].textContent).toEqual("5");
    expect(pages[5].textContent).toEqual("...");
    expect(pages[6].textContent).toEqual("10");
  });

  it("should render first page, '...', three active pages, '...', and the last page", async () => {
    vi.doMock("../hooks/useQueryParams", () => {
      return {
        useQueryParams: () => {
          return {
            params: {
              page: "5",
            },
          };
        },
      };
    });
    const { Pagination } = await import("./Pagination");
    render(<Pagination total={100} limit={10} />, {
      wrapper: TestsWrapper,
    });
    const pages = screen.queryAllByTestId("pagination-page");
    expect(pages.length).toEqual(7);
    expect(pages[0].textContent).toEqual("1");
    expect(pages[1].textContent).toEqual("...");
    expect(pages[2].textContent).toEqual("4");
    expect(pages[3].textContent).toEqual("5");
    expect(pages[4].textContent).toEqual("6");
    expect(pages[5].textContent).toEqual("...");
    expect(pages[6].textContent).toEqual("10");
  });

  it("should render first page, '...', and 5 last pages", async () => {
    vi.doMock("../hooks/useQueryParams", () => {
      return {
        useQueryParams: () => {
          return {
            params: {
              page: "8",
            },
          };
        },
      };
    });
    const { Pagination } = await import("./Pagination");
    render(<Pagination total={100} limit={10} />, {
      wrapper: TestsWrapper,
    });
    const pages = screen.queryAllByTestId("pagination-page");
    expect(pages.length).toEqual(7);
    expect(pages[0].textContent).toEqual("1");
    expect(pages[1].textContent).toEqual("...");
    expect(pages[2].textContent).toEqual("6");
    expect(pages[3].textContent).toEqual("7");
    expect(pages[4].textContent).toEqual("8");
    expect(pages[5].textContent).toEqual("9");
    expect(pages[6].textContent).toEqual("10");
  });

  it("should set query param when the page is clicked", async () => {
    const setQueryParamMock = vi.fn(() => null);
    vi.doMock("../hooks/useQueryParams", () => {
      return {
        useQueryParams: () => {
          return {
            params: {},
            setQueryParam: setQueryParamMock,
          };
        },
      };
    });
    const { Pagination } = await import("./Pagination");
    render(<Pagination total={100} limit={10} />, {
      wrapper: TestsWrapper,
    });
    const pages = screen.queryAllByTestId("pagination-page");
    const user = userEvent.setup();
    await user.click(pages[1]);
    expect(setQueryParamMock).toHaveBeenCalledTimes(1);
    expect(setQueryParamMock).toHaveBeenCalledWith("page", 2);
  });
});
