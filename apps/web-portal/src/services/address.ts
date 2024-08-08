import useSWR from "swr";
import { Address } from "../models/address";
import { fetcher } from "./api";
import { SortingState } from "@tanstack/react-table";
import { Pagination } from "../models/pagination";

interface RequestData {
  data: Address[];
  pagination: Pagination;
}

export const useAddress = (page = 0, order?: SortingState) => {
  let orderText = '';

  if (order?.length) {
    orderText += `&orderBy=${order[0].id}`;
    orderText += `&orderDi=${order[0].desc ? 'asc' : 'desc'}`;
  }

  return useSWR<RequestData>(`/address?page=${page}${orderText}`, fetcher);
};
