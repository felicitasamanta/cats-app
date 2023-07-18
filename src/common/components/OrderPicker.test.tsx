import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TestsWrapper } from "../tests/TestsWrapper";
import userEvent from "@testing-library/user-event";
import { OrderPicker } from "./OrderPicker";

describe("OrderPicker", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    cleanup();
  });

  it("should be disabled if isLoading flag is passed", async () => {
    render(<OrderPicker isLoading={true} />, { wrapper: TestsWrapper });

    const user = userEvent.setup();
    const dropdown = screen.getByTestId("dropdown");
    await user.click(dropdown);

    const menu = screen.queryByTestId("dropdown-options");
    expect(menu).toBeNull();
  });

  it("should preselect random value", () => {
    render(<OrderPicker isLoading={false} />, { wrapper: TestsWrapper });

    const selected = screen.getByTestId("dropdown-selected");
    expect(selected.textContent).toEqual("Random");
  });

  it("should display correct order based on query param", async () => {
    vi.doMock("../hooks/useQueryParams", () => {
      return {
        useQueryParams: () => {
          return {
            params: { page: "2", breed_ids: "Bengal", order: "ASC" },
            setQueryParams: () => null,
          };
        },
      };
    });

    const { OrderPicker } = await import("./OrderPicker");
    render(<OrderPicker isLoading={false} />, {
      wrapper: TestsWrapper,
    });

    expect(screen.getByTestId("dropdown-selected").textContent).toEqual(
      "Ascending"
    );
  });

  it("should show all possible values when expanded", async () => {
    render(<OrderPicker isLoading={false} />, {
      wrapper: TestsWrapper,
    });

    const dropwdown = screen.getByTestId("dropdown");
    const user = userEvent.setup();
    await user.click(dropwdown);

    expect(screen.getByTestId("dropdown-options")).toBeTruthy();

    const options = screen.getAllByTestId("dropdown-option");

    expect(options.length).toEqual(3);
    expect(options[0].textContent).toEqual("Random");
    expect(options[1].textContent).toEqual("Ascending");
    expect(options[2].textContent).toEqual("Descending");
  });

  it("should set query param when the order is clicked ", async () => {
    const setQueryParamsMock = vi.fn(() => null);

    vi.doMock("../hooks/useQueryParams", () => {
      return {
        useQueryParams: () => {
          return {
            params: { page: "2", breed_ids: "Bengal", order: "ASC" },
            setQueryParams: setQueryParamsMock,
          };
        },
      };
    });

    const { OrderPicker } = await import("./OrderPicker");

    render(<OrderPicker isLoading={false} />, {
      wrapper: TestsWrapper,
    });

    const dropwdown = screen.getByTestId("dropdown");
    const user = userEvent.setup();
    await user.click(dropwdown);

    const options = screen.getAllByTestId("dropdown-option");
    await user.click(options[1]);

    expect(setQueryParamsMock).toHaveBeenCalledTimes(2);
    expect(setQueryParamsMock).toHaveBeenCalledWith({
      breed_ids: "Bengal",
      order: "ASC",
      page: "2",
    });
  });
});
