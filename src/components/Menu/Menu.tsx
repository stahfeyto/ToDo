import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";  // Hooks personalizados para acessar o Redux
import { menusActions } from "../../store/Menu.store";  // Ações relacionadas ao menu no Redux
import BtnAddTask from "../Utilities/BtnAddTask";  // Componente para adicionar uma tarefa
import NavLinks from "./NavLinks";  // Componente para os links de navegação
import LayoutMenus from "../Utilities/LayoutMenus";  // Layout principal do menu

// Nova classe para o item ativo no menu (destaque visual)
const classLinkActive =
  "text-black bg-slate-300 border-r-4 border-transparent dark:bg-slate-700/[.2] dark:text-slate-200";

const Menu: React.FC = () => {
  // Obtém o estado de abertura do menu a partir do Redux
  const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
  const dispatch = useAppDispatch();  // Hook para disparar ações do Redux

  // Função para fechar o menu
  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuHeader());  // Dispara a ação para fechar o menu
  };

  return (
    // LayoutMenus recebe propriedades relacionadas ao estado do menu
    <LayoutMenus
      menuOpen={menuOpen}  // Passa o estado de abertura do menu
      closeMenuHandler={closeMenuHandler}  // Passa a função para fechar o menu
      className="left-0"  // Estilização do layout
    >
      <header className="h-full flex flex-col">
        {/* Título do aplicativo, visível apenas em telas grandes */}
        <h1 className="font-bold uppercase text-center mt-8 text-lg tracking-wide hidden xl:block">
          Tic-Tac-ToDo
        </h1>
        {/* Botão para adicionar uma nova tarefa */}
        <BtnAddTask className="my-8 mx-4" />
        {/* Componente de links de navegação com a classe de estilo para itens ativos */}
        <NavLinks classActive={classLinkActive} />
      </header>
    </LayoutMenus>
  );
};

export default Menu;
