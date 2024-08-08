import { useSearchParams } from "react-router-dom";

export function useSearchParam(
  name: string
): [string | null, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(name);

  function setParam(value: string) {
    setSearchParams((params) => {
      params.set(name, value);
      return params;
    });
  }

  return [value, setParam];
}
