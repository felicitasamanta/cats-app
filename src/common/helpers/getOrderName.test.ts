import { describe, expect, it } from "vitest";
import { getOrderName } from "./getOrderName";
import { Order } from "../model";

describe("getOrderName", () => {
  it("should return user friendly order name", () => {
    expect(getOrderName(Order.ASC)).toEqual("Ascending");
    expect(getOrderName(Order.DESC)).toEqual("Descending");
    expect(getOrderName(Order.RAND)).toEqual("Random");
    expect(getOrderName(null as any)).toEqual("Random");
  });
});
