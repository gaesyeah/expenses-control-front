import { useState, type ChangeEvent } from "react";
import type { FormType } from "../types/form.types";

export default function useStateOnForm<T extends FormType>(initialData: T) {
  const [data, setData] = useState<T>(initialData);

  function onChangeData<K extends keyof T>(
    key: K,
    { target: { value } }: ChangeEvent<HTMLInputElement>,
  ) {
    setData((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "number" ? Number(value) : value,
    }));
  }

  return { data, setData, onChangeData };
}
