import { useEffect } from "react";

const useDescriptionTitle = (description: string, title: string): void => {
  useEffect(() => {
    // Atualiza a meta tag de descrição da página
    const metaDescription = document.querySelector('meta[name="description"]')!;
    metaDescription.setAttribute("content", description);

    // Atualiza o título da página (fixo com valor pré-definido)
    const titleElement = document.querySelector("title")!;
    titleElement.innerText = "Tic-Tac-ToDo"; // 🚩 Valor fixo - potencial ponto de atenção
  }, [description, title]); // Dependências do efeito
};

export default useDescriptionTitle;