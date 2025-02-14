import React from "react";
import avatar1 from "../../assets/avatar-1.jpg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import DeleteTasks from "./DeleteTasks";
import TasksDone from "./TasksDone";

const AccountData: React.FC = () => {
  // Seleciona o estado do menu da conta
  const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);

  // Obtém a função dispatch do Redux Toolkit
  const dispatch = useAppDispatch();

  // Função para fechar o menu da conta
  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuAccount());
  };

  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="top-0 right-0 "
    >
      <section className="p-5 flex flex-col h-full">
        {/* Exibe as tarefas concluídas */}
        <TasksDone />
        {/* Exibe a opção para deletar tarefas */}
        <DeleteTasks />
      </section>
    </LayoutMenus>
  );
};

export default AccountData;
