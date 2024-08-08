import useSWR from "swr";
import { SortingState } from "@tanstack/react-table";
import { fetcher } from "./api";
import { Pagination } from "../models/pagination";
import { Ceremony } from "../models/ceremony";

interface RequestData {
  data: Ceremony[];
  pagination: Pagination;
}

export const useCeremonies = (page = 0, order?: SortingState) => {
  let orderText = '';

  if (order?.length) {
    orderText += `&orderBy=${order[0].id}`;
    orderText += `&orderDi=${order[0].desc ? 'asc' : 'desc'}`;
  }

  return useSWR<RequestData>(`/ceremonies?page=${page}${orderText}`, fetcher);
};
