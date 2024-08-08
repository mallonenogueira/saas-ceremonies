import { useSearchParam } from "./use-search-param";

  export function usePageParam() {
    const [pageParams, setPageParam] = useSearchParam("page");
  
    let page = pageParams ? +pageParams - 1 : 0;
    page = page < 0 ? 0 : page;
    page = Number.isNaN(page) ? 0: page;
  
    function setPage(page: number) {
      setPageParam((page + 1).toString());
    }
  
    return { page, setPage };
  }
  