import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";
import App from "./App";
import "./index.css";

// Obtém a referência ao elemento root do DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Renderiza a aplicação dentro do React.StrictMode para identificar possíveis problemas
root.render(
  <React.StrictMode>
    {/* Provedor do Redux para gerenciamento global de estado */}
    <Provider store={store}>
      {/* BrowserRouter para gerenciar a navegação na aplicação */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
