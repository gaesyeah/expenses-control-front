import styled from "styled-components";
import Input from "../components/Input.component";
import Page from "../components/Page.component";
import useStateOnForm from "../hooks/useStateOnForm";
import type { PersonDTO, PersonResponse } from "../types/person.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PersonService from "../services/person.service";
import { useMemo, type SubmitEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SubmitButton from "../components/buttons/SubmitButton.component";
import Table from "../components/Table.component";
import CircularButton from "../components/buttons/CircularButton.component";
import { FaRegTrashCan } from "react-icons/fa6";
import { QUERY_KEYS } from "../constants/queryKeys";
import Swal from "sweetalert2";

const initialPersonDTO: PersonDTO = { name: "", age: 1 };

export default function PersonsPage() {
  const stateOnForm = useStateOnForm<PersonDTO>(initialPersonDTO);

  const { data: persons, isLoading: isLoadingPersons } = useQuery({
    queryKey: [QUERY_KEYS.persons],
    queryFn: PersonService.readAll,
  });

  const client = useQueryClient();

  const { mutate: createPerson, isPending: isCreatingPerson } = useMutation({
    mutationFn: (dto: PersonDTO) => PersonService.create(dto),
    onSuccess: () => {
      stateOnForm.setData(initialPersonDTO);
      client.invalidateQueries({ queryKey: [QUERY_KEYS.persons] });
      toast.success("Pessoa criada com sucesso!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.detail);
      }
    },
  });
  function submitCreatePerson(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createPerson(stateOnForm.data);
  }

  const { mutate: deletePerson, isPending: isDeletingPerson } = useMutation({
    mutationFn: (id: string) => PersonService.delete(id),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: [QUERY_KEYS.persons] }),
        client.invalidateQueries({ queryKey: [QUERY_KEYS.transactions] }),
      ]);
      toast.success("Pessoa apagada com sucesso!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.detail);
      }
    },
  });
  function confirmDeletePerson({ name, id }: PersonResponse) {
    Swal.fire({
      title: `Tem certeza que deseja deletar "${name}"?`,
      text: "Não será possível reverter!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Tenho certeza!",
    }).then((result) => {
      if (result.isConfirmed) deletePerson(id);
    });
  }

  const isLoading = useMemo(
    () => isLoadingPersons || isCreatingPerson || isDeletingPerson,
    [isLoadingPersons, isCreatingPerson, isDeletingPerson],
  );

  return (
    <Page>
      <SCForm onSubmit={submitCreatePerson}>
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
          max={150}
          min={1}
        />
        <SubmitButton isLoading={isLoading}>Criar pessoa</SubmitButton>

        <Table
          items={persons?.map((person) => ({
            ...person,
            delete: (
              <CircularButton
                isLoading={isLoading}
                onClick={() => confirmDeletePerson(person)}
              >
                <FaRegTrashCan size={20} />
              </CircularButton>
            ),
          }))}
          columns={[
            { key: "name", label: "Nome" },
            { key: "age", label: "Idade" },
            { key: "delete", label: "Apagar" },
          ]}
        />
      </SCForm>
    </Page>
  );
}

const SCForm = styled.form`
  padding-left: 10px;
  padding-right: 10px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
