import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.route";
import Header from "./components/Header.component";

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
