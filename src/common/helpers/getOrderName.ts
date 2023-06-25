import { Order } from "../model";

const getOrderName = (order: Order) => {
  if (order === "ASC") return "Ascending";
  if (order === "DESC") return "Descending";
  return "Random";
};

export { getOrderName };
