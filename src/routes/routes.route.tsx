import { createBrowserRouter } from "react-router-dom";
import PersonsPage from "../pages/Persons.page";
import TransactionsPage from "../pages/Transactions.page";

export const routes = { persons: "/", transactions: "/transactions" };

export const router = createBrowserRouter([
  { path: routes.persons, element: <PersonsPage /> },
  { path: routes.transactions, element: <TransactionsPage /> },
]);
