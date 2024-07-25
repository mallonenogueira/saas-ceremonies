import useSWR from "swr";
import { Address } from "../models/address";
import { fetcher } from "./api";

interface OrderBy {
  field: string;
  order: "asc" | "desc";
}

interface RequestData {
  data: Address[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}

export const useAddress = (page = 0, order?: OrderBy) => {
  let orderText = '';

  if (order) {
    orderText += `&orderBy=${order.field}`;
    orderText += `&orderDi=${order.order}`;
  }

  return useSWR<RequestData>(`/address?page=${page}${orderText}`, fetcher);
};
