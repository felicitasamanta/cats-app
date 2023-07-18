import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { BreedPicker } from "./BreedPicker";
import { TestsWrapper } from "@/common/tests/TestsWrapper";
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get("https://api.thecatapi.com/v1/breeds", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "abys",
          name: "Abyssinian",
        },
        {
          id: "aege",
          name: "Aegean",
        },
      ])
    );
  }),

  rest.get("https://api.thecatapi.com/v1/images/search", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  })
);

describe("BreedPicker", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should match snapshot", async () => {
    const component = render(<BreedPicker isLoading={false} />, {
      wrapper: TestsWrapper,
    });

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(component).toMatchSnapshot();
  });

  it("should be disabled if isLoading flag is passed ", async () => {
    render(<BreedPicker isLoading={true} />, { wrapper: TestsWrapper });

    const dropdown = screen.getByTestId("dropdown");
    const user = userEvent.setup();
    await user.click(dropdown);

    const menu = screen.queryByTestId("dropdown-options");
    expect(menu).toBeNull();
  });

  it("should preselect 'all'", async () => {
    render(<BreedPicker isLoading={false} />, { wrapper: TestsWrapper });

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    const breed = screen.getByTestId("dropdown-selected");
    expect(breed.textContent).toBe("All");
  });

  it("should show all possible values when expanded", async () => {
    render(<BreedPicker isLoading={false} />, {
      wrapper: TestsWrapper,
    });

    const dropwdown = screen.getByTestId("dropdown");
    const user = userEvent.setup();
    await user.click(dropwdown);

    expect(screen.getByTestId("dropdown-options")).toBeTruthy();

    const options = screen.getAllByTestId("dropdown-option");

    expect(options.length).toEqual(3);
    expect(options[0].textContent).toEqual("All");
    expect(options[1].textContent).toEqual("Abyssinian");
    expect(options[2].textContent).toEqual("Aegean");
  });

  it("should display correct breed based on query param", async () => {
    vi.doMock("@/common/hooks/useQueryParams", () => {
      return {
        useQueryParams: () => {
          return {
            params: { page: "2", breed_ids: "abys", order: "ASC" },
            setQueryParams: () => null,
          };
        },
      };
    });

    const { BreedPicker } = await import("./BreedPicker");
    render(<BreedPicker isLoading={false} />, { wrapper: TestsWrapper });
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(screen.getByTestId("dropdown-selected").textContent).toEqual(
      "Abyssinian"
    );
  });

  it("should set query param (breed_ids and page = 1) when the breed is selected", async () => {
    const setQueryParamsMock = vi.fn(() => null);
    vi.doMock("@/common/hooks/useQueryParams", () => {
      return {
        useQueryParams: () => {
          return {
            params: { page: null, breed_ids: "aege", order: "ASC" },
            setQueryParams: setQueryParamsMock,
          };
        },
      };
    });

    const { BreedPicker } = await import("./BreedPicker");

    render(<BreedPicker isLoading={false} />, { wrapper: TestsWrapper });

    const dropdown = screen.getByTestId("dropdown");
    const user = userEvent.setup();
    await user.click(dropdown);

    const options = screen.getAllByTestId("dropdown-option");
    await user.click(options[2]);

    expect(setQueryParamsMock).toHaveBeenCalledTimes(3);
    expect(setQueryParamsMock).toHaveBeenCalledWith({
      breed_ids: "aege",
      order: "ASC",
      page: null,
    });
  });
});
