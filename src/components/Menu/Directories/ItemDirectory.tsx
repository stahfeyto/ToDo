import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";  // Importação de componentes para navegação
import { useAppDispatch } from "../../../store/hooks";  // Hook para despachar ações
import { tasksActions } from "../../../store/Tasks.store";  // Ações relacionadas a tarefas no Redux
import { ReactComponent as Trash } from "../../../assets/trash.svg";  // Ícone SVG para o botão de excluir
import { ReactComponent as Edit } from "../../../assets/edit.svg";  // Ícone SVG para o botão de editar
import ModalConfirm from "../../Utilities/ModalConfirm";  // Componente de modal para confirmação
import ModalDirectory from "../../Utilities/ModalDirectory";  // Componente de modal para editar diretório

// Componente para um item de diretório
const ItemDirectory: React.FC<{ dir: string; classActive: string }> = ({
  dir,  // Nome do diretório
  classActive,  // Classe para destacar o diretório ativo
}) => {
  const route = useLocation();  // Hook para obter a localização atual da URL
  const currentPath = route.pathname;  // Caminho atual da URL

  const dispatch = useAppDispatch();  // Hook para despachar ações ao Redux

  const [modalIsShown, setModalIsShown] = useState<boolean>(false);  // Estado para controlar a exibição do modal de confirmação de exclusão
  const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);  // Estado para controlar a exibição do modal de edição de diretório

  // Função para fechar o modal de edição de diretório
  const closeModalDirectoryHandler = () => {
    setModalDirIsShown(false);
  };

  // Função para excluir o diretório ao confirmar
  const deleteDirectoryHandler = () => {
    dispatch(tasksActions.deleteDirectory(dir));  // Despacha a ação para excluir o diretório
  };

  // Função para confirmar a edição do nome do diretório
  const confirmEditDirNameHandler = (dirName: string) => {
    dispatch(
      tasksActions.editDirectoryName({
        previousDirName: dir,  // Nome antigo do diretório
        newDirName: dirName,  // Novo nome do diretório
      })
    );
  };

  return (
    <>
      {/* Modal para editar nome do diretório */}
      {modalDirIsShown && (
        <ModalDirectory
          onClose={closeModalDirectoryHandler}  // Função para fechar o modal
          onConfirm={confirmEditDirNameHandler}  // Função para confirmar a edição
          dirName={dir}  // Passa o nome do diretório para o modal
          title="Edit directory name"  // Título do modal
          btnText="Edit"  // Texto do botão
        />
      )}

      {/* Modal de confirmação para exclusão do diretório */}
      {modalIsShown && (
        <ModalConfirm
          onClose={() => setModalIsShown(false)}  // Função para fechar o modal
          onConfirm={deleteDirectoryHandler}  // Função para confirmar a exclusão
          text="This directory and all its tasks will be deleted."  // Texto de aviso
        />
      )}

      {/* Lista do item de diretório */}
      <li
        className={`flex items-center pr-4 pl-9 py-2 itemDirectory ${
          currentPath === "/dir/" + dir ? classActive : ""  // Aplica a classe ativa se o diretório for o atual
        }`}
      >
        {/* Link para acessar o diretório */}
        <NavLink
          to={`/dir/${dir}`}  // Caminho para o diretório
          title={dir}  // Dica de ferramenta com o nome do diretório
          className="hover:text-rose-600 dark:hover:text-slate-200 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[7rem]"
        >
          {dir}  {/* Exibe o nome do diretório */}
        </NavLink>

        {/* Exibe os botões de edição e exclusão, exceto para o diretório "Main" */}
        {dir !== "Main" && (
          <div className="ml-auto buttonsDir">
            {/* Botão para editar nome do diretório */}
            <button
              title="edit directory name"  // Texto de dica de ferramenta
              onClick={() => setModalDirIsShown(true)}  // Exibe o modal de edição
            >
              <Edit className="w-5 h-5 mr-2" />  {/* Ícone de edição */}
            </button>

            {/* Botão para excluir diretório */}
            <button
              title="delete directory"  // Texto de dica de ferramenta
              onClick={() => setModalIsShown(true)}  // Exibe o modal de confirmação de exclusão
            >
              <Trash className="w-5 h-5" />  {/* Ícone de exclusão */}
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default ItemDirectory;
