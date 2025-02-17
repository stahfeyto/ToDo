import React from "react";
import AccountData from "./components/AccountSection/AccountData";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import { Task } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";


const links = [
  { name: "Today's tasks", path: "/today" },
  { name: "All tasks", path: "/" },
  { name: "Important tasks", path: "/important" },
  { name: "Completed tasks", path: "/completed" },
  { name: "Uncompleted tasks", path: "/uncompleted" },
  { name: "Statistics", path: "/statistics" }, // Link para estatísticas
];

const App: React.FC = () => {
  // Seleciona o estado do modal usando Redux
  const modal = useAppSelector((state) => state.modal);
  
  // Obtém a função dispatch do Redux Toolkit
  const dispatch = useAppDispatch();
  
  // Função para fechar o modal de criação de tarefas
  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };

  // Função para adicionar uma nova tarefa ao estado global
  const createNewTaskHandler = (task: Task) => {
    dispatch(tasksActions.addNewTask(task));
  };

  return (
    <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
      {/* Exibe o modal apenas se estiver aberto */}
      {modal.modalCreateTaskOpen && (
        <ModalCreateTask
          onClose={closeModalCreateTask} // Passa a função para fechar o modal
          nameForm="Add a task" // Define o título do formulário
          onConfirm={createNewTaskHandler} // Define a ação ao confirmar a criação da tarefa
        />
      )}
      {/* Componentes principais da aplicação */}
      <Menu />
      <TasksSection />
      <Footer />
      <AccountData />
    </div>
  );
};

export default App;
