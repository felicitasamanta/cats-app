import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Dropdown } from "./Dropdown";
import userEvent from "@testing-library/user-event";

describe("Dropdown", () => {
  const options = [
    { name: "Bengal", value: "Bengal", selected: true },
    { name: "Abyssinian", value: "Abyssinian", selected: false },
    { name: "Birman", value: "Birman", selected: false },
  ];

  const onChangeMock = vi.fn(() => null);

  beforeEach(() => {
    render(<Dropdown options={options} onChange={onChangeMock} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should correctly set default option", () => {
    expect(screen.getByText("Bengal")).toBeTruthy();
  });

  it("should preselect first value if there is no default value selected", () => {
    cleanup();

    const options = [
      { name: "Bengal", value: "Bengal" },
      { name: "Abyssinian", value: "Abyssinian" },
      { name: "Birman", value: "Birman" },
    ];
    render(<Dropdown options={options} onChange={() => null} preselect />);

    const selected = screen.getByTestId("dropdown-selected");

    expect(selected.textContent).equals(options[0].name);
  });

  it("should render placeholder if there is no default value and preselect flag is not passed", () => {
    cleanup();

    const options = [
      { name: "Bengal", value: "Bengal" },
      { name: "Abyssinian", value: "Abyssinian" },
      { name: "Birman", value: "Birman" },
    ];
    render(
      <Dropdown
        options={options}
        onChange={() => null}
        placeHolder="Select value..."
      />
    );
    const selected = screen.getByTestId("dropdown-selected");

    expect(selected.textContent).equals("Select value...");
  });

  it("should render blank dropdown if there is no default value, placeholder, and preselect flag is not passed", () => {
    cleanup();

    const options = [
      { name: "Bengal", value: "Bengal" },
      { name: "Abyssinian", value: "Abyssinian" },
      { name: "Birman", value: "Birman" },
    ];
    render(<Dropdown options={options} onChange={() => null} />);
    const selected = screen.getByTestId("dropdown-selected");

    expect(selected.textContent).equals("");
  });

  it.only("should allow user to change the value", async () => {
    const user = userEvent.setup();
    const dropdown = screen.getByTestId("dropdown");
    await user.click(dropdown);

    const option = screen.getByText("Abyssinian");
    await user.click(option);

    const selected = screen.getByTestId("dropdown-selected");
    expect(onChangeMock).toHaveBeenNthCalledWith(1, {
      name: "Bengal",
      value: "Bengal",
      selected: true,
    });

    expect(onChangeMock).toHaveBeenNthCalledWith(2, {
      name: "Abyssinian",
      value: "Abyssinian",
      selected: false,
    });

    expect(onChangeMock).toHaveBeenCalledTimes(2);

    expect(selected.textContent).toBe("Abyssinian");

    const menu = screen.queryByTestId("dropdown-options");
    expect(menu).toBeNull();
  });

  it("should render loading indicator and be disabled when isLoading flag is passed", async () => {
    cleanup();
    render(<Dropdown options={options} onChange={() => null} isLoading />);

    const user = userEvent.setup();
    const dropdown = screen.getByTestId("dropdown");
    await user.click(dropdown);

    const menu = screen.queryByTestId("dropdown-options");
    expect(menu).toBeNull();

    const selected = screen.getByTestId("dropdown-selected");
    expect(selected.textContent).equals("Loading...");
  });

  it("should be disabled when isDisabled flag is passed", async () => {
    cleanup();
    render(<Dropdown options={options} onChange={() => null} isDisabled />);

    const user = userEvent.setup();
    const dropdown = screen.getByTestId("dropdown");
    await user.click(dropdown);

    const menu = screen.queryByTestId("dropdown-options");
    expect(menu).toBeNull();

    const selected = screen.getByTestId("dropdown-selected");
    expect(selected.textContent).equals(options[0].name);
  });
});
