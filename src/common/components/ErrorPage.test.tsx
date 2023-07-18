import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, RenderResult, cleanup } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";
import { TestsWrapper } from "../tests/TestsWrapper";
import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("ErrorPage", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<ErrorPage />, { wrapper: TestsWrapper });
  });

  afterEach(() => {
    cleanup();
  });

  it("should render error text", () => {
    expect(
      screen.getByText("Sorry, an unexpected error has occurred.")
    ).toBeTruthy();
  });

  it("should check if link's path is correct", async () => {
    const link = await component.findByTestId("link");
    expect(link.getAttribute("href")).equals("/home");
  });

  it("should render cats page", async () => {
    cleanup();

    const Home = () => {
      return <div>home</div>;
    };

    const component = render(
      <Routes>
        <Route path="/" element={<ErrorPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>,
      { wrapper: TestsWrapper }
    );

    const link = await component.findByTestId("link");

    const user = userEvent.setup();
    await user.click(link);

    const homeScreen = screen.getByText("home");
    expect(homeScreen.ELEMENT_NODE).toBeTruthy();
  });
});
