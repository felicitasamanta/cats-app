import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";
import { wait } from "../helpers/wait";
import { render, renderHook } from "@testing-library/react";

describe("useDebounce", () => {
  it("should call onChange with given value after delay", async () => {
    const onChangeMock = vi.fn();

    renderHook(() =>
      useDebounce({ value: "Hello", delay: 800, onChange: onChangeMock })
    );

    await wait(200);

    expect(onChangeMock).not.toHaveBeenCalled();

    await wait(700);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("Hello");
  });

  it("should call onChange with given value after default delay", async () => {
    const onChangeMock = vi.fn();

    const Component = () => {
      useDebounce({ value: "Hello", onChange: onChangeMock });
      return null;
    };

    render(<Component />);

    await wait(200);

    expect(onChangeMock).not.toHaveBeenCalled();

    await wait(400);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("Hello");
  });
});
