import { Outlet } from "react-router-dom";
import Header from "./components/Header.component";

//Usado para renderizar o header em somente uma página,
//e o mesmo ter acesso a pagina atual com o 'useLocation()'
//para identificação visual da página atual.
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
