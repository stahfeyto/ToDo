const useDate = (date: string): string => {
  // Converte a string de data para formato compatível com todos os browsers
  // Substitui hífens por barras (ex: "2023-05-15" → "2023/05/15")
  const fullDate: Date = new Date(date.replaceAll("-", "/"));
  
  // Extrai componentes da data
  const year: number = fullDate.getFullYear();  // Ano com 4 dígitos
  const month: number = fullDate.getMonth() + 1; // Mês ajustado (janeiro = 1)
  const day: number = fullDate.getDate();       // Dia do mês

  // Formata garantindo 2 dígitos para mês e dia
  const dateFormated: string =
    month.toString().padStart(2, "0") + // Adiciona zero à esquerda se necessário
    "/" +
    day.toString().padStart(2, "0") +   // Adiciona zero à esquerda se necessário
    "/" +
    year;

  return dateFormated;
};

export default useDate;