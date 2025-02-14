import { useEffect, useState } from "react";
import { Task } from "../../interfaces";

// Interface para definir as props recebidas pelo hook
interface Props {
  tasks: Task[];    // Lista completa de tarefas
  done: boolean;    // Flag para filtrar tarefas completas/incompletas
}

// Hook personalizado para filtrar tarefas completas/incompletas
const useCompletedTasks = (props: Props): { tasks: Task[] } => {
  // Estado para armazenar a lista filtrada de tarefas
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Função para filtrar tarefas baseado na flag 'done'
    const filteredTasks: Task[] = props.tasks.filter((task: Task) => {
      // Se done = true, retorna tarefas completas
      // Se done = false, retorna tarefas não completas
      return props.done ? task.completed : !task.completed;
    });
    
    // Atualiza o estado com as tarefas filtradas
    setTasks(filteredTasks);
  }, [props.tasks, props.done]); // Executa sempre que a lista de tarefas ou o filtro mudar

  // Retorna as tarefas filtradas
  return { tasks };
};

export default useCompletedTasks;