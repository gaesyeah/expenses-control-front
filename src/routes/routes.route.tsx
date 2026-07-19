import { createBrowserRouter, type RouteObject } from "react-router-dom";
import PersonsPage from "../pages/Persons.page";
import TransactionsPage from "../pages/Transactions.page";
import Layout from "../Layout";
import TotalsPage from "../pages/Totals.page";
import type { ReactNode } from "react";
import { FaMoneyBill1Wave, FaUsers } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";

export const routes = {
  persons: {
    path: "/",
    label: "Pessoas",
    element: <PersonsPage />,
    icon: <FaUsers size={20} />,
  },
  transactions: {
    path: "/transactions",
    label: "Transações",
    element: <TransactionsPage />,
    icon: <FaMoneyBill1Wave size={22} />,
  },
  totals: {
    path: "/totals",
    label: "Relatório",
    element: <TotalsPage />,
    icon: <TbReportMoney size={24} />,
  },
} satisfies Record<string, RouteObject & { label: string; icon: ReactNode }>;

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: Object.values(routes).map(({ element, path }) => ({
      element,
      path,
    })),
  },
]);
