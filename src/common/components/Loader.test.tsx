import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Renders loader", () => {
  it("should render correctly", () => {
    expect(render(<Loader />)).toMatchSnapshot();
  });

  it("should render loader image", () => {
    render(<Loader />);
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage.getAttribute("src")).toContain("loading.gif");
  });
});
