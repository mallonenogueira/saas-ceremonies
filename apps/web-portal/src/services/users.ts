import useSWR from "swr";
import { SortingState } from "@tanstack/react-table";
import { fetcher } from "./api";
import { User } from "../models/user";
import { Pagination } from "../models/pagination";

interface RequestData {
  data: User[];
  pagination: Pagination;
}

export const useUsers = (page = 0, order?: SortingState) => {
  let orderText = '';

  if (order?.length) {
    orderText += `&orderBy=${order[0].id}`;
    orderText += `&orderDi=${order[0].desc ? 'asc' : 'desc'}`;
  }

  return useSWR<RequestData>(`/users?page=${page}${orderText}`, fetcher);
};
