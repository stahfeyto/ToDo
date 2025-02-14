import { createSlice } from "@reduxjs/toolkit";

// Estado inicial para controlar a abertura dos menus
const initialState = {
  menuHeaderOpened: false, // Estado do menu do cabeçalho
  menuAccountOpened: false, // Estado do menu da conta
};

// Criação do slice para gerenciar o estado dos menus
const menusSlice = createSlice({
  name: "menus", // Nome do slice corrigido de "modal" para "menus"
  initialState: initialState,
  reducers: {
    // Abre o menu do cabeçalho
    openMenuHeader(state) {
      state.menuHeaderOpened = true;
    },
    // Fecha o menu do cabeçalho
    closeMenuHeader(state) {
      state.menuHeaderOpened = false;
    },
    // Abre o menu da conta
    openMenuAccount(state) {
      state.menuAccountOpened = true;
    },
    // Fecha o menu da conta
    closeMenuAccount(state) {
      state.menuAccountOpened = false;
    },
  },
});

// Exporta as ações para serem utilizadas nos componentes
export const menusActions = menusSlice.actions;
// Exporta o reducer para ser adicionado ao store
export default menusSlice.reducer;
