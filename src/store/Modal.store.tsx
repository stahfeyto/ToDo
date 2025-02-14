import { createSlice } from "@reduxjs/toolkit";

// Estado inicial do modal
const initialState = {
  modalCreateTaskOpen: false,
};

// Criação do slice para gerenciar o estado do modal
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    // Abre o modal de criação de tarefas
    openModalCreateTask(state) {
      state.modalCreateTaskOpen = true;
    },
    // Fecha o modal de criação de tarefas
    closeModalCreateTask(state) {
      state.modalCreateTaskOpen = false;
    },
  },
});

// Exporta as ações para serem utilizadas nos componentes
export const modalActions = modalSlice.actions;
// Exporta o reducer para ser adicionado ao store
export default modalSlice.reducer;
