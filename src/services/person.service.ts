import type { PersonDTO, PersonResponse } from "../types/person.type";
import { api } from "./api.service";

const route = "person";

export default class PersonService {
  public static async readAll() {
    const persons = await api.get<PersonResponse[]>(route);
    return persons.data;
  }

  public static async create(dto: PersonDTO) {
    const person = await api.post<PersonResponse>(route, dto);
    return person.data;
  }

  public static delete(id: string) {
    return api.delete(`${route}/${id}`);
  }
}
