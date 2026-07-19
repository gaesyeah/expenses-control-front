import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import PersonService from "../services/person.service";

export default function useQueryPersons() {
  const { data: persons, isLoading: isLoadingPersons } = useQuery({
    queryKey: [QUERY_KEYS.persons],
    queryFn: PersonService.readAll,
  });

  return { persons, isLoadingPersons };
}
