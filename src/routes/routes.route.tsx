import { createBrowserRouter, type RouteObject } from "react-router-dom";
import PersonsPage from "../pages/Persons.page";
import TransactionsPage from "../pages/Transactions.page";
import Layout from "../Layout";
import TotalsPage from "../pages/Totals.page";

export const routes = {
  persons: { path: "/", label: "Pessoas", element: <PersonsPage /> },
  transactions: {
    path: "/transactions",
    label: "Transações",
    element: <TransactionsPage />,
  },
  totals: { path: "/totals", label: "Relatório", element: <TotalsPage /> },
} satisfies Record<string, RouteObject & { label: string }>;

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: Object.values(routes).map(({ element, path }) => ({
      element,
      path,
    })),
  },
]);
