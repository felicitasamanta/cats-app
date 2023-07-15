import { TestsWrapper } from "@/common/tests/TestsWrapper";
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import Cats from "./Cats";

// https://api.thecatapi.com/v1/images/search?limit=10&&api_key=live_23gBCX5oksoKw4hl4o6DMzmjuh2APvDNxWAAC2Ctrg9zgEcomnY44ce7mSbfuyjF
const cats = [
  {
    breeds: [],
    id: "4s4",
    url: "https://cdn2.thecatapi.com/images/4s4.jpg",
    width: 500,
    height: 332,
  },
  {
    breeds: [],
    id: "77t",
    url: "https://cdn2.thecatapi.com/images/77t.jpg",
    width: 500,
    height: 375,
  },
  {
    breeds: [],
    id: "ch8",
    url: "https://cdn2.thecatapi.com/images/ch8.jpg",
    width: 420,
    height: 583,
  },
];

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
    return res(ctx.status(200), ctx.json(cats));
  })
);

describe("Cats", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should match snapshot", async () => {
    const component = render(<Cats />, { wrapper: TestsWrapper });

    await waitForElementToBeRemoved(() => screen.getByTestId("loader"));
    expect(component).toMatchSnapshot();
  });

  it("should render a list of cats", async () => {
    render(<Cats />, { wrapper: TestsWrapper });

    await waitForElementToBeRemoved(() => screen.getByTestId("loader"));
    const list = screen.getAllByTestId("cat");
    expect(list.length).toEqual(3);
    expect(list[0].getElementsByTagName("img").item(0)?.src).toEqual(
      cats[0].url
    );
    expect(list[1].getElementsByTagName("img").item(0)?.src).toEqual(
      cats[1].url
    );
    expect(list[2].getElementsByTagName("img").item(0)?.src).toEqual(
      cats[2].url
    );
  });
});
