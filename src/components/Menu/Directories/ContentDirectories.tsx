import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";  // Hooks personalizados para acessar o dispatch e o estado do Redux
import { tasksActions } from "../../../store/Tasks.store";  // Ações do Redux para manipulação de tarefas

import ItemDirectory from "./ItemDirectory";  // Componente para cada diretório

const ContentDirectories: React.FC<{ classActive: string }> = ({
  classActive,  // Prop que é usada para adicionar uma classe ativa aos itens
}) => {
  // Seleciona os diretórios do estado global (Redux)
  const directories = useAppSelector((store) => store.tasks.directories);
  
  // Estado local para controlar a visibilidade de um modal
  const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

  // Hook do Redux para despachar ações
  const dispatch = useAppDispatch();

  // Função que cria um novo diretório
  const createNewDirectoryHandler = (inputValue: string) => {
    // Remove espaços extras do nome do diretório
    const newDirectoryName: string = inputValue.trim();

    // Se o nome do diretório estiver vazio, não faz nada
    if (newDirectoryName.length === 0) return;

    // Verifica se o diretório já existe no estado
    const directoryDoesNotExist = directories.every(
      (dir: string) => dir !== newDirectoryName
    );

    // Se o diretório não existe, despacha a ação para criar o novo diretório
    if (directoryDoesNotExist) {
      dispatch(tasksActions.createDirectory(newDirectoryName));
    }
  };

  // Função que fecha o modal de edição de diretório
  const closeModalDirectoryHandler = () => {
    setModalDirIsShown(false);
  };

  return (
    <>
      {/* Lista de diretórios */}
      <ul className="max-h-36 overflow-auto">
        {/* Mapeia os diretórios e renderiza um ItemDirectory para cada um */}
        {directories.map((dir: string) => (
          <ItemDirectory key={dir} classActive={classActive} dir={dir} />
        ))}
      </ul>
    </>
  );
};

export default ContentDirectories;
