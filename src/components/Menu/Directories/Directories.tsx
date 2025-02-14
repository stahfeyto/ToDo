import React, { useState } from "react";
import { ReactComponent as Arrow } from "../../../assets/arrow.svg";  // Ícone SVG da seta para abrir/fechar
import ContentDirectories from "./ContentDirectories";  // Componente para exibir o conteúdo dos diretórios

// Componente para a lista de diretórios
const Directories: React.FC<{ classActive: string }> = ({ classActive }) => {
  // Estado para controlar se os diretórios estão abertos ou fechados
  const [isDirectoriesOpen, setIsDirectoriesOpen] = useState<boolean>(true);

  // Função para alternar o estado dos diretórios (abrir/fechar)
  const toggleDirectoriesOpen = () => {
    setIsDirectoriesOpen((prevState) => !prevState);  // Alterna entre true e false
  };

  return (
    <div className="py-4">
      {/* Botão para abrir ou fechar os diretórios */}
      <button
        className={`flex items-center w-full mx-4 mb-2 ${
          isDirectoriesOpen ? "dark:text-slate-200" : ""  // Aplica uma classe de estilo quando os diretórios estão abertos
        }`}
        onClick={toggleDirectoriesOpen}  // Chama a função para alternar o estado
      >
        {/* Ícone de seta que rotaciona conforme o estado dos diretórios */}
        <Arrow
          className={`w-3 h-3 mr-2 rotate-90 transition ${
            isDirectoriesOpen ? "rotate-180" : ""  // Rotaciona a seta dependendo do estado (aberto/fechado)
          }`}
        />
        Directories  {/* Texto do botão */}
      </button>

      {/* Exibe o conteúdo dos diretórios quando estiverem abertos */}
      <div className={isDirectoriesOpen ? "visible" : "hidden"}>
        <ContentDirectories classActive={classActive} />  {/* Componente de conteúdo dos diretórios */}
      </div>
    </div>
  );
};

export default Directories;
