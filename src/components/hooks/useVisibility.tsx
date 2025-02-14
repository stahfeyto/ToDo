import { useEffect, useState } from "react";

const useVisibility = (elements: HTMLElement[], fnClose?: () => void) => {
  // Estado que armazena a visibilidade do(s) elemento(s)
  const [elementIsVisible, setElementIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Função que verifica se o clique foi fora dos elementos observados
    const checkClick = (e: MouseEvent) => {
      if (!elements) return;

      // Verifica se o clique foi fora de todos os elementos fornecidos
      const clickedOutsideElement = elements.every((element) => {
        if (!element) return false;
        // Se o clique não foi no elemento nem dentro dele, considera um "click fora"
        if (
          e.target !== element &&
          !element.contains(e.target as HTMLElement)
        ) {
          return true;
        }
        return false;
      });

      // Se o clique foi fora, muda o estado de visibilidade para false e executa fnClose (se fornecido)
      if (clickedOutsideElement) {
        setElementIsVisible(false);
        if (fnClose) fnClose();  // Chama a função fnClose se ela for fornecida
      }
    };

    // Adiciona o evento de click no documento para verificar os cliques fora
    document.addEventListener("click", checkClick);
    
    // Cleanup: remove o evento quando o componente for desmontado ou o hook for re-executado
    return () => {
      document.removeEventListener("click", checkClick);
    };
  }, [elements, fnClose]);  // O efeito depende de 'elements' e 'fnClose', sendo reexecutado quando algum deles mudar

  // Função para fechar o(s) elemento(s) (tornando-os invisíveis)
  const closeElement = () => {
    setElementIsVisible(false);
  };

  // Função para mostrar o(s) elemento(s) (tornando-os visíveis)
  const showElement = () => {
    setElementIsVisible(true);
  };

  // Retorna o estado de visibilidade e as funções para abrir e fechar o(s) elemento(s)
  return { elementIsVisible, closeElement, showElement };
};

export default useVisibility;
