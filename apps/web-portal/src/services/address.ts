import useSWR from "swr";
import { Address } from "../models/address";
import { fetcher } from "./api";

interface RequestData {
  data: Address[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}

export const useAddress = (page = 0) => useSWR<RequestData>(`/address?page=${page}`, fetcher);
