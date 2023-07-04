import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";
import { BrowserRouter } from "react-router-dom";

describe("Renders error page", () => {
  it("should render error text", () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Sorry, an unexpected error has occurred.")
    ).toBeTruthy();
  });
});
