import type useStateOnForm from "../hooks/useStateOnForm.hook";
import type { FormType } from "./form.types";

//Tipo utilizado nos inputs do projeto que usam o hook 'useStateOnForm'
//para facilitar, reduzir repetição e acelerar a implementação de formulários no projeto
//? T serve para "introduzir" props customizadas para o input que vai utilizar esse tipo.
//? D estende o tipo 'FormType', que é a base dos formulários, um objeto que guarda números ou strings.
//? K estende as keys do tipo do objeto do formulário, para o input saber por qual propriedade ele é responsável.
//? A prop 'stateOnForm' espera exatamente o retorno do hook, ou seja, ao chamar um input é necessário
//? que seja enviado somente o objeto do formulário e key que o input controla.
export type InputStateOnFormProps<
  T,
  D extends FormType,
  K extends keyof D,
> = T & {
  stateOnForm: ReturnType<typeof useStateOnForm<D>>;
  field: K;
  isLoading?: boolean;
  label?: string;
  /* errorValidation?: { validation: boolean; message: string }; */
};
