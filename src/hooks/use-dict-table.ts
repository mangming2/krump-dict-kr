import { useQuery } from "@tanstack/react-query";
import { fetchDictTable } from "../api";

export const useDictTable = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["dictTable"],
    queryFn: fetchDictTable,
  });

  return { data, error, isLoading }; // 데이터와 상태 반환
};
