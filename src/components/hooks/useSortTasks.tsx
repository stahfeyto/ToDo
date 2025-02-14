import { useState, useEffect } from "react";
import { Task } from "../../interfaces";  // Importa a interface Task, que provavelmente define a estrutura de dados de uma tarefa.

const useSortTasks = (tasks: Task[]) => {
  // Estado para armazenar o tipo de ordenação selecionado (ex: "min-date", "max-date", etc.).
  const [sortedBy, setSortedBy] = useState<string>("");

  // Estado para armazenar as tarefas ordenadas de acordo com a seleção.
  const [sortedTasks, setSortedTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    // Função que ordena as tarefas por data (ascendente ou descendente).
    const sortByDate = (order: "max-date" | "min-date"): Task[] => {
      // Função auxiliar para converter as datas de string para milissegundos, permitindo comparação.
      const toMillisseconds = (date: string) => Date.parse(date);

      // Cria uma cópia das tarefas para evitar a mutação direta do estado
      const tasksCopy = [...tasks];
      
      // Ordena as tarefas por data
      const sorted = tasksCopy.sort((task1, task2) => {
        const date1 = toMillisseconds(task1.date);
        const date2 = toMillisseconds(task2.date);

        if (date1 < date2) {
          return -1;  // Se a data1 for menor que a data2, coloca task1 antes
        }

        if (date1 > date2) {
          return 1;   // Se a data1 for maior que a data2, coloca task2 antes
        }

        return 0;  // Se as datas forem iguais, mantém a ordem
      });

      // Se a ordenação for por data mais recente (max-date), inverte a ordem das tarefas
      if (order === "min-date") {
        return sorted; // Retorna as tarefas ordenadas em ordem crescente
      }

      if (order === "max-date") {
        return sorted.reverse(); // Retorna as tarefas em ordem decrescente
      }

      return tasks; // Se não houver uma ordenação válida, retorna as tarefas originais
    };

    // Função que ordena as tarefas com base no status de conclusão (concluídas ou não).
    const sortByCompletedStatus = (completed: boolean): Task[] => {
      // Cria uma cópia das tarefas para evitar mutação direta
      const tasksCopy = [...tasks];
      
      // Ordena as tarefas com base na conclusão
      const sorted = tasksCopy.sort((task1) => {
        if (task1.completed) {
          return -1;  // Tarefas concluídas devem vir antes
        }
        return 0;  // Tarefas não concluídas vêm depois
      });

      if (completed) {
        return sorted; // Se for para mostrar as concluídas primeiro, retorna a ordenação
      }

      if (!completed) {
        return sorted.reverse(); // Se for para mostrar as não concluídas primeiro, inverte a ordem
      }

      return tasks; // Retorna as tarefas originais se não houver ordenação válida
    };

    // Dependendo do valor de `sortedBy`, realiza a ordenação das tarefas
    if (sortedBy === "min-date" || sortedBy === "max-date") {
      setSortedTasks(sortByDate(sortedBy));  // Ordenação por data
    }
    if (sortedBy === "" || sortedBy === "order-added") {
      setSortedTasks(tasks);  // Se a ordenação for vazia ou por ordem de adição, mantém a ordem original
    }
    if (sortedBy === "completed-first") {
      setSortedTasks(sortByCompletedStatus(true));  // Ordenação colocando as concluídas primeiro
    }
    if (sortedBy === "uncompleted-first") {
      setSortedTasks(sortByCompletedStatus(false));  // Ordenação colocando as não concluídas primeiro
    }
  }, [sortedBy, tasks]);  // O efeito será executado sempre que `sortedBy` ou `tasks` mudarem.

  // Retorna o estado da ordenação, a função para mudar o critério de ordenação e as tarefas ordenadas
  return { sortedBy, setSortedBy, sortedTasks };
};

export default useSortTasks;
