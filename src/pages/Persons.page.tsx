import styled from "styled-components";
import Input from "../components/Input.component";
import Page from "../components/Page.component";
import useStateOnForm from "../hooks/useStateOnForm";
import type { PersonDTO } from "../types/person.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PersonService from "../services/person.service";
import { useMemo, type SubmitEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SubmitButton from "../components/SubmitButton.component";

const queryKey: string[] = ["persons"];

const initialPersonDTO: PersonDTO = { name: "", age: 0 };

export default function Persons() {
  const stateOnForm = useStateOnForm<PersonDTO>(initialPersonDTO);

  const { data: persons, isLoading: isLoadingPersons } = useQuery({
    queryKey,
    queryFn: PersonService.readAll,
  });

  const client = useQueryClient();
  const { mutate, isPending: isCreatingPerson } = useMutation({
    mutationFn: (dto: PersonDTO) => PersonService.create(dto),
    onSuccess: () => {
      stateOnForm.setData(initialPersonDTO);
      client.invalidateQueries({ queryKey });
      toast.success("Pessoa criada com sucesso!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.detail);
      }
    },
  });

  function createPerson(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(stateOnForm.data);
  }

  const isLoading = useMemo(
    () => isLoadingPersons || isCreatingPerson,
    [isLoadingPersons, isCreatingPerson],
  );

  console.log(persons);

  return (
    <Page>
      <SCForm onSubmit={createPerson}>
        <Input
          required
          isLoading={isLoading}
          stateOnForm={stateOnForm}
          placeholder="Digite seu nome"
          label="nome"
          field="name"
          type="text"
        />
        <Input
          required
          isLoading={isLoading}
          stateOnForm={stateOnForm}
          placeholder="Digite sua idade"
          label="idade"
          field="age"
          type="number"
        />
        <SubmitButton isLoading={isLoading}>Criar pessoa</SubmitButton>
      </SCForm>
    </Page>
  );
}

const SCForm = styled.form`
  padding: 30px;
  width: 430px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
