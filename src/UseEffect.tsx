import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Dados padrão para o Gráfico Circular (caso não haja dados no localStorage)
const defaultTaskData = [
  { name: "Completed", value: 6, color: "#f4faff" },
  { name: "Uncompleted", value: 4, color: "#8884d8" },
];

const DashboardCharts: React.FC = () => {
  // Estado para os dados do gráfico de tarefas
  const [taskData, setTaskData] = useState(defaultTaskData);

  // Função para salvar os dados no localStorage
  const saveTaskDataToLocalStorage = (data: any) => {
    localStorage.setItem("taskData", JSON.stringify(data));
  };

  // Função para carregar os dados do localStorage
  const loadTaskDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("taskData");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return defaultTaskData; // Dados padrão caso não existam no localStorage
  };

  // Carregar os dados ao iniciar o componente
  useEffect(() => {
    const loadedData = loadTaskDataFromLocalStorage();
    setTaskData(loadedData);
  }, []);

  // Atualizar os dados do gráfico e salvar no localStorage
  const handleUpdateTaskData = (newData: any) => {
    setTaskData(newData);
    saveTaskDataToLocalStorage(newData);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-12">
      {/* Gráfico Circular */}
      <div className="bg-black rounded-lg p-4 flex flex-col justify-center items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={taskData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={60}
              label
              startAngle={90}
              endAngle={-270}
            >
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                color: "white",
                fontSize: "14px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Aqui você pode adicionar uma lógica para modificar os dados e chamar handleUpdateTaskData */}
    </div>
  );
};

export default DashboardCharts;
