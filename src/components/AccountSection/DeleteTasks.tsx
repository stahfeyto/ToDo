import React, { useState } from "react";  // Importando React e useState
import { useAppDispatch } from "../../store/hooks";  // Hook personalizado para acessar o dispatch do Redux

import ModalConfirm from "../Utilities/ModalConfirm";  // Componente ModalConfirm (provavelmente usado para confirmar ações destrutivas como deletar)

const DeleteTasks: React.FC = () => {
  // Hook do Redux para despachar ações
  const dispatch = useAppDispatch();

  // Estado local para controlar a visibilidade do modal de confirmação
  const [showModal, setIsModalShown] = useState<boolean>(false);

  return (
    <>
      {/* Botão que ativa a exibição do modal */}
      <button
        className="mt-auto text-left pt-4 hover:text-rose-600 dark:hover:text-slate-200 transition "
        onClick={() => setIsModalShown(true)}  // Quando clicado, abre o modal
      >
        Delete all  {/* Texto do botão */}
      </button>

      {/* Modal de confirmação (não mostrado no código, mas referenciado) */}
      {showModal && (
        <ModalConfirm
          onClose={() => setIsModalShown(false)}  // Fecha o modal
          onConfirm={() => {
            // Aqui poderia ser chamada uma ação para deletar todas as tarefas, por exemplo:
            // dispatch(tasksActions.deleteAllTasks());
            setIsModalShown(false);  // Fecha o modal após confirmação
          }}
          text="Are you sure you want to delete all tasks?"  // Texto exibido no modal
        />
      )}
    </>
  );
};

// Usando React.memo para evitar re-renderizações desnecessárias
export default React.memo(DeleteTasks);
