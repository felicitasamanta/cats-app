import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TestsWrapper } from "@/common/tests/TestsWrapper";
import userEvent from "@testing-library/user-event";
import { wait } from "@/common/helpers/wait";

describe("Search", () => {
  const setQueryParamMock = vi.fn();
  const removeQueryParamMock = vi.fn();

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should set query param after the user input and debounce", async () => {
    vi.doMock("@/common/hooks/useQueryParams", () => ({
      useQueryParams: () => ({
        params: {},
        setQueryParam: setQueryParamMock,
        removeQueryParam: removeQueryParamMock,
      }),
    }));

    const { Search } = await import("./Search");
    render(<Search />, { wrapper: TestsWrapper });

    const search = screen.getByTestId("search");
    const user = userEvent.setup();

    await user.click(search);
    await user.keyboard("test");

    await wait(300);
    await user.keyboard("test");
    await wait(300);
    expect(setQueryParamMock).not.toHaveBeenCalled();

    await wait(300);
    expect(setQueryParamMock).toHaveBeenCalledWith("image_id", "testtest");
    expect(removeQueryParamMock).not.toHaveBeenCalled();
  });

  it("should remove query param when the input is empty", async () => {
    vi.doMock("@/common/hooks/useQueryParams", () => ({
      useQueryParams: () => ({
        params: {
          image_id: "1",
        },
        setQueryParam: setQueryParamMock,
        removeQueryParam: removeQueryParamMock,
      }),
    }));

    const { Search } = await import("./Search");
    render(<Search />, { wrapper: TestsWrapper });

    const search = screen.getByTestId("search");
    const user = userEvent.setup();

    await user.click(search);
    await user.keyboard("{backspace}");
    await wait(600);

    expect(setQueryParamMock).not.toHaveBeenCalled();
    expect(removeQueryParamMock).toHaveBeenCalledWith("image_id");
  });

  it("should not modify query parameters when the input is empty and no prior parameters were set", async () => {
    vi.doMock("@/common/hooks/useQueryParams", () => ({
      useQueryParams: () => ({
        params: {},
        setQueryParam: setQueryParamMock,
        removeQueryParam: removeQueryParamMock,
      }),
    }));

    const { Search } = await import("./Search");
    render(<Search />, { wrapper: TestsWrapper });

    const search = screen.getByTestId("search");
    const user = userEvent.setup();

    await user.click(search);
    await user.keyboard(" ");

    await wait(600);
    expect(setQueryParamMock).not.toHaveBeenCalled();
    expect(removeQueryParamMock).not.toHaveBeenCalled();
  });
});
