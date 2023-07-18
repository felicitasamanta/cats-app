import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
import { CatDetail } from "./CatDetail";
import { TestsWrapper } from "@/common/tests/TestsWrapper";
import { setupServer } from "msw/node";
import { rest } from "msw";

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;

  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

const cat = {
  id: "2jp",
  url: "https://cdn2.thecatapi.com/images/2jp.jpg",
};

const server = setupServer(
  rest.get("https://api.thecatapi.com/v1/images/1", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(cat));
  })
);

describe("CatDetail", () => {
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

  it.only("should render one cat", async () => {
    render(<CatDetail />, { wrapper: TestsWrapper });
    await waitForElementToBeRemoved(() => screen.getByTestId("loader"));
    const item = screen.getByTestId("catItem");

    expect(
      item.getElementsByTagName("img").item(0)?.getAttribute("src")
    ).toEqual(cat.url);
  });
});
