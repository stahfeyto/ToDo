import { useEffect, useState } from "react";

// Interface que define o tipo para os valores das queries de mídia. As chaves são strings e os valores são booleanos.
interface Query {
  [key: string]: boolean;
}

const useScreenMedia = () => {
  // Estado para armazenar os valores das queries de mídia (como sm, md, lg, xl).
  const [mediaQueries, setMediaQueries] = useState<Query>({
    sm: false,  // Tamanho pequeno
    md: false,  // Tamanho médio
    lg: false,  // Tamanho grande
    xl: false,  // Extra grande
  });

  useEffect(() => {
    // Função que atualiza os valores das queries de mídia no estado
    const setNewMediaValues = (size?: string) => {
      setMediaQueries((prevState: Query) => {
        // Faz uma cópia do estado atual
        const prevStateCopy = { ...prevState };

        // Reseta todos os valores para false
        for (const key in prevStateCopy) {
          prevStateCopy[key] = false;
        }

        // Se um tamanho for passado, atualiza o valor correspondente para true
        if (size) return { ...prevStateCopy, [size]: true };

        // Se não houver tamanho, apenas retorna a cópia do estado
        return { ...prevStateCopy };
      });
    };

    // Função que verifica o tamanho da tela e chama setNewMediaValues para ajustar os valores de mídia
    const checkMediaSize = () => {
      // Verifica o tamanho da largura da janela (window.innerWidth) e define o estado de acordo
      if (window.innerWidth >= 1280) {
        setNewMediaValues("xl");  // Extra grande
      } else if (window.innerWidth >= 1024) {
        setNewMediaValues("lg");  // Grande
      } else if (window.innerWidth >= 768) {
        setNewMediaValues("md");  // Médio
      } else if (window.innerWidth >= 640) {
        setNewMediaValues("sm");  // Pequeno
      } else if (window.innerWidth > 0) {
        setNewMediaValues();  // Para telas muito pequenas
      }
    };

    // Chama a função para definir o estado de mídia logo após o componente ser montado
    checkMediaSize();

    // Adiciona um ouvinte de evento para resize da janela, que chama a função checkMediaSize quando a janela for redimensionada
    window.addEventListener("resize", checkMediaSize);

    // Função de limpeza do useEffect que remove o ouvinte de evento quando o componente for desmontado
    return () => window.removeEventListener("resize", checkMediaSize);
  }, []); // O array vazio significa que o useEffect será executado apenas uma vez, após a montagem do componente

  // Retorna o estado das queries de mídia
  return mediaQueries;
};

export default useScreenMedia;
