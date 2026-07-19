import { useState, type ChangeEvent } from "react";
import type { FormType } from "../types/form.types";

//hook com função incentivar o dev a utilizar 'state' de um objeto em formulários
//ao invés de um para cada input, sendo assim, esse hook facilita essa utilização
//e corrige a repetição daquela implementação clássica no onChange com key do objeto.
//?E ainda é utilizado nos componentes de input no projeto
//?para facilitar ainda mais a implementação de formulários.
//?Para mais informações, ler o tipo 'InputStateOnFormProps'.
export default function useStateOnForm<T extends FormType>(initialData: T) {
  const [data, setData] = useState<T>(initialData);

  function onChangeData<K extends keyof T>(
    key: K,
    { target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setData((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "number" ? Number(value) : value,
    }));
  }

  return { data, setData, onChangeData };
}
