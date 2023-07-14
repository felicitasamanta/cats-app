import { describe, it, expect } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { LoaderContainer } from "./LoaderContainer";

describe("LoaderContainer", () => {
  it("renders the Loader component when isLoading is true", () => {
    const { findByTestId } = render(
      <LoaderContainer isLoading={true}>
        <div>Child component</div>
      </LoaderContainer>
    );
    const loader = findByTestId("loader");
    expect(loader).toBeTruthy();
  });

  it("renders the children components when isLoading is false", () => {
    cleanup();
    const { getByText, queryByTestId } = render(
      <LoaderContainer isLoading={false}>
        <div>Child component</div>
      </LoaderContainer>
    );
    const childComponent = getByText("Child component");
    const loader = queryByTestId("loader");
    expect(childComponent).toBeTruthy();
    expect(loader).toBeNull();
  });
});
