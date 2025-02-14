import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useCompletedTasks from "../hooks/useCompletedTasks";
import useTodayTasks from "../hooks/useTodayTasks";

const TasksDone: React.FC = () => {
  // Obtém as tarefas de hoje usando o hook personalizado `useTodayTasks`
  const todaysTasks = useTodayTasks();

  // Filtra as tarefas de hoje que estão concluídas usando o hook personalizado `useCompletedTasks`
  const { tasks: todayTasksDone } = useCompletedTasks({
    tasks: todaysTasks,
    done: true,
  });

  // Função para calcular a porcentagem de tarefas concluídas
  const calculatePercentage = (done: number, total: number) => {
    return total > 0 ? (done * 100) / total : 0; // Evita divisão por zero
  };

  // Calcula a porcentagem de tarefas de hoje que foram concluídas
  const percentageTodayTasks = calculatePercentage(todayTasksDone.length, todaysTasks.length);

  // Limita a exibição das tarefas de hoje a 3 itens
  const todaysTasksToShow = todaysTasks.slice(0, 3);

  // Verifica se há mais tarefas além das 3 exibidas
  const showMore = todaysTasks.length > todaysTasksToShow.length;

  return (
    <>
      {/* Se houver tarefas para hoje, exibe o progresso */}
      {todaysTasks.length !== 0 && (
        <div className="mt-8">
          <span className="flex justify-between mb-2">
            <span>Tasks today</span> {todayTasksDone.length}/{todaysTasks.length}
          </span>
          {/* Barra de progresso */}
          <div className="barProgress">
            <div style={{ width: percentageTodayTasks + "%" }}></div>
          </div>
        </div>
      )}

      {/* Se não houver tarefas para hoje, exibe uma mensagem */}
      {todaysTasks.length === 0 && (
        <span className="mt-6 block pt-4 border-t-slate-200 dark:border-t-slate-700/[.3] border-t-2">
          No tasks today
        </span>
      )}

      {/* Se houver tarefas para hoje, exibe a lista de tarefas */}
      {todaysTasks.length > 0 && (
        <div className="mt-8">
          <ul>
            {todaysTasksToShow.map((task) => (
              <li key={task.id} className="py-2 pl-6 text-slate-200 list-item">
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
          {/* Link para exibir mais tarefas, se houver mais de 3 */}
          {showMore && (
            <Link to="/today" className="pl-6">
              Show more
            </Link>
          )}
        </div>
      )}
    </>
  );
};

// Exporta o componente com `React.memo` para otimizar re-renderizações
export default React.memo(TasksDone);