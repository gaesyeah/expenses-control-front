import { Outlet } from "react-router-dom";
import Header from "./components/Header.component";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
