import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Filters } from "./Filters";
import { TestsWrapper } from "@/common/tests/TestsWrapper";
import userEvent from "@testing-library/user-event";

describe("Filters", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render filters with specific names when isLoading flag is passed", async () => {
    render(<Filters isLoading={true} />, { wrapper: TestsWrapper });

    const search = screen.getByTestId("search");
    const orderPicker = screen.getByText("Random");
    const breedPicker = screen.getByText("Loading...");

    expect(search).toBeDefined();
    expect(orderPicker).toBeDefined();
    expect(breedPicker).toBeDefined();
  });

  it("should be disabled when isLoading flag is passed", async () => {
    render(<Filters isLoading={true} />, { wrapper: TestsWrapper });

    const pickers = screen.getAllByTestId("dropdown");
    const user = userEvent.setup();

    await user.click(pickers[0]);
    await user.click(pickers[1]);

    const pickersMenu = screen.queryByTestId("dropdown-options");
    expect(pickersMenu).toBeNull();
  });

  it("should render 'all' (on BreedsPicker) when isLoading flag is false", async () => {
    render(<Filters isLoading={false} />, { wrapper: TestsWrapper });

    const breedPicker = screen.getByText("Loading...");
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(breedPicker.textContent).toEqual("All");
  });
});
