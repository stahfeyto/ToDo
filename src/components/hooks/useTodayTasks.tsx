import { useState, useEffect } from "react";
import { Task } from "../../interfaces";  // Importa a interface Task, que provavelmente define a estrutura de dados de uma tarefa.
import { useAppSelector } from "../../store/hooks";  // Hook para acessar o estado global do Redux.

const useTodayTasks = (): Task[] => {
  // Acessa as tarefas do estado global (provavelmente armazenadas no Redux) usando o hook useAppSelector
  const tasks = useAppSelector((state) => state.tasks.tasks);
  
  // Estado local para armazenar as tarefas de hoje.
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);

  // Obtém a data atual (ano, mês, dia)
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;  // O mês em JavaScript começa do zero, então somamos 1.
  const day: number = date.getDate();

  // Formata a data no formato "YYYY-MM-DD" para comparar com a data das tarefas
  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    // Filtra as tarefas para encontrar aquelas cuja data seja igual à data de hoje
    let filteredTasks: Task[] = tasks.filter(
      (task: Task) => task.date === dateTimeFormat
    );

    // Atualiza o estado com as tarefas de hoje
    setTodaysTasks(filteredTasks);
  }, [dateTimeFormat, tasks]);  // O efeito será executado sempre que `dateTimeFormat` ou `tasks` mudarem.

  // Retorna as tarefas de hoje
  return todaysTasks;
};

export default useTodayTasks;
