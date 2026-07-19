import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import PersonService from "../services/person.service";

//Transformei esse uso do 'useQuery' em hook personalizado
//devido a necessidade de utilizado tanto para renderizar a tabela de pessoas
//quanto para renderizar as 'options' para criação de uma transação.
export default function useQueryPersons() {
  const { data: persons, isLoading: isLoadingPersons } = useQuery({
    queryKey: [QUERY_KEYS.persons],
    queryFn: PersonService.readAll,
  });

  return { persons, isLoadingPersons };
}
