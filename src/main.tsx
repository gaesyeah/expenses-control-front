import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme.theme.ts";
import { ResetStyle } from "./styles/ResetStyle.style.ts";
import { GlobalStyle } from "./styles/GlobalStyle.style.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
