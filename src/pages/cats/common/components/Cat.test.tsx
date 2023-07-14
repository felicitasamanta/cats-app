import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Cat } from "./Cat";
import { TestsWrapper } from "@/common/tests/TestsWrapper";
import { Cat as CatType } from "../model";

describe("Cat", () => {
  let component;
  const cat: CatType = {
    id: "cat-id",
    url: "cat-image-url",
  };

  beforeEach(() => {
    component = render(<Cat cat={cat} />, { wrapper: TestsWrapper });
  });

  afterEach(() => {
    cleanup();
  });

  // pasitvarkyti renderinima
  it("should render correctly", () => {
    expect(
      render(<Cat cat={cat} />, { wrapper: TestsWrapper })
    ).toMatchSnapshot();
  });

  it("should render a cat", () => {
    const displayedImage = document.querySelector("img") as HTMLImageElement;
    expect(displayedImage).toBeTruthy();
  });
});
