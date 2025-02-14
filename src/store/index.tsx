import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./Tasks.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";

// Configuração da store do Redux
const store = configureStore({
  reducer: { 
    tasks: tasksReducer, // Reducer para gerenciar tarefas
    modal: modalReducer, // Reducer para gerenciar estados do modal
    menu: menuReducer // Reducer para gerenciar estados dos menus
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(tasksMiddleware), // Adiciona middleware personalizado para tarefas
});

// Tipagem do estado global da store
export type RootState = ReturnType<typeof store.getState>;
// Tipagem do dispatch da store
export type AddDispatch = typeof store.dispatch;

// Exporta a store configurada
export default store;
