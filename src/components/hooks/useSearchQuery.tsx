import { useEffect, useState } from "react";
import { Task } from "../../interfaces";  // Importando a interface Task, que provavelmente define a estrutura de dados de uma tarefa.
import { useAppSelector } from "../../store/hooks";  // Hook para acessar o estado global do Redux.

const useSearchQuery = (searchQuery: string) => {
  // Acessa as tarefas do estado global (provavelmente armazenadas no Redux) usando o useAppSelector
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // Estado local para armazenar as tarefas que coincidem com a pesquisa.
  const [matchedTasks, setMatchedTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Filtra as tarefas com base na pesquisa.
    const filteredTasks = tasks.filter((task: Task) => {
      // Converte tanto o título da tarefa quanto a consulta de pesquisa para minúsculas antes de fazer a comparação.
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Se houver um texto de pesquisa (não vazio), define as tarefas filtradas como as correspondentes.
    if (searchQuery.trim().length) {
      setMatchedTasks(filteredTasks);
    } else {
      // Se a consulta de pesquisa estiver vazia, limpa a lista de tarefas correspondentes.
      setMatchedTasks([]);
    }
  }, [searchQuery, tasks]);  // O efeito será executado sempre que `searchQuery` ou `tasks` mudarem.

  // Retorna as tarefas filtradas, ou seja, aquelas que coincidem com a pesquisa.
  return matchedTasks;
};

export default useSearchQuery;
