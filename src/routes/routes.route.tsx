import { createBrowserRouter } from "react-router-dom";
import Persons from "../pages/Persons.page";

export const router = createBrowserRouter([
  { path: "/", element: <Persons /> },
]);
