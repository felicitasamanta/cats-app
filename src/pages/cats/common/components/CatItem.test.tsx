import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CatItem } from "./CatItem";
import { TestsWrapper } from "@/common/tests/TestsWrapper";
import { Cat as CatType } from "../model";

describe("CatItem", () => {
  it("should render detailed cat", () => {
    const cat: CatType = {
      id: "cat-id",
      url: "cat-image-url",
    };
    render(<CatItem cat={cat} />, { wrapper: TestsWrapper });

    expect(screen.getAllByAltText("cat-id")).toBeDefined();

    screen.debug();
  });
});
