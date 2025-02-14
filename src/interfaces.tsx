export interface Task {
  title: string; // Título da tarefa
  dir: string; // Diretório ou categoria da tarefa
  description: string; // Descrição detalhada da tarefa
  date: string; // Data da tarefa (pode ser ISO string ou outro formato)
  completed: boolean; // Indica se a tarefa foi concluída
  important: boolean; // Indica se a tarefa é marcada como importante
  id: string; // Identificador único da tarefa
}
