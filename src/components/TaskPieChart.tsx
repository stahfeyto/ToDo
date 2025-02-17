import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend, ResponsiveContainer as BarContainer } from "recharts";
import { AreaChart, Area, XAxis as AreaXAxis, YAxis as AreaYAxis, CartesianGrid as AreaGrid, Tooltip as AreaTooltip, ResponsiveContainer as AreaContainer, LabelList } from "recharts";
import { Task } from "../interfaces";

// Componente de Tooltip personalizada para o Gráfico Circular
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-2 rounded">
        <p>{data.name}</p>
        <p>Value: {data.value}</p>
      </div>
    );
  }
  return null;
};

// Componente de Tooltip personalizada para o Gráfico de Barras
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-2 rounded">
        <p>{data.fullName}</p>
        <p>Value: {data.value}</p>
      </div>
    );
  }
  return null;
};

// Componente de Tooltip personalizada para o Gráfico de Área
const CustomAreaTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-2 rounded">
        <p>{data.name}</p>
        <p>Important: {data.im}</p>
        <p>Completed: {data.co}</p>
      </div>
    );
  }
  return null;
};

const DashboardCharts: React.FC = () => {
  const [taskData, setTaskData] = useState([
    { name: "Completed", value: 0, color: "#f4faff" },
    { name: "Uncompleted", value: 0, color: "#8884d8" },
  ]);
  const [visitorData, setVisitorData] = useState([
    { shortName: "All", fullName: "All Tasks", value: 0 },
    { shortName: "Today", fullName: "Today's Tasks", value: 0 },
    { shortName: "Comp", fullName: "Completed Tasks", value: 0 },
    { shortName: "Uncom", fullName: "Uncompleted Tasks", value: 0 },
    { shortName: "Impor", fullName: "Important Tasks", value: 0 },
  ]);
  const [areaData, setAreaData] = useState([
    { name: "Monday", im: 0, co: 0 },
    { name: "Tuesday", im: 0, co: 0 },
    { name: "Wednesday", im: 0, co: 0 },
    { name: "Thursday", im: 0, co: 0 },
    { name: "Friday", im: 0, co: 0 },
    { name: "Saturday", im: 0, co: 0 },
    { name: "Sunday", im: 0, co: 0 },
  ]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]") as Task[];
    if (tasks.length) {
      const completed = tasks.filter(task => task.completed).length;
      const uncompleted = tasks.filter(task => !task.completed).length;
      const important = tasks.filter(task => task.important).length;

      // Atualizando os dados para o gráfico circular
      setTaskData([
        { name: "Completed", value: completed, color: "#f4faff" },
        { name: "Uncompleted", value: uncompleted, color: "#8884d8" },
      ]);

      // Atualizando os dados para o gráfico de barras
      setVisitorData([
        { shortName: "All", fullName: "All Tasks", value: tasks.length },
        { shortName: "Today", fullName: "Today's Tasks", value: tasks.filter(task => task.date === new Date().toLocaleDateString()).length },
        { shortName: "Comp", fullName: "Completed Tasks", value: completed },
        { shortName: "Uncom", fullName: "Uncompleted Tasks", value: uncompleted },
        { shortName: "Impor", fullName: "Important Tasks", value: important },
      ]);

      // Atualizando os dados para o gráfico de área
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const newAreaData = daysOfWeek.map(day => ({
        name: day,
        im: tasks.filter(task => task.important && task.date.includes(day)).length,
        co: tasks.filter(task => task.completed && task.date.includes(day)).length,
      }));
      setAreaData(newAreaData);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-12">
      {/* Linha superior: Gráfico Circular e Gráfico de Barras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
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
              <Tooltip content={<CustomPieTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  color: "white",
                  fontSize: "12px", // Diminui o tamanho da fonte na legenda
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap", // Quebra de linha nas legendas
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-black rounded-lg p-4">
          <BarContainer width="100%" height={300}>
            <BarChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="shortName" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Bar
                dataKey="value"
                fill="#f4faff"
                radius={[10, 10, 0, 0]}
                barSize={40}
              />
              <BarTooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <BarLegend
                wrapperStyle={{
                  color: "white",
                  fontSize: "12px", // Diminui o tamanho da fonte na legenda
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap", // Quebra de linha nas legendas
                }}
              />
            </BarChart>
          </BarContainer>
        </div>
      </div>

      {/* Gráfico de Área ocupando toda a largura abaixo */}
      <div className="w-full max-w-5xl bg-black rounded-lg p-4">
        <AreaContainer width="100%" height={300}>
          <AreaChart data={areaData}>
            <AreaGrid strokeDasharray="3 3" stroke="#444" />
            <Area type="monotone" dataKey="im" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="co" stroke="#ffffff" fill="#f4faff" />
            <AreaXAxis
              dataKey="name"
              stroke="#fff"
              tick={{ fontSize: 12 }} // Reduz o tamanho da fonte dos rótulos
              tickLine={false} // Remove a linha dos ticks para ganhar mais espaço
              interval={0} // Mostra todos os ticks
              angle={-45} // Gira os rótulos para que eles ocupem menos espaço
              textAnchor="end" // Alinha o texto do rótulo para o fim
            />
            <AreaYAxis stroke="#fff" />
            <AreaTooltip content={<CustomAreaTooltip />} />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                color: "white",
                fontSize: "12px", // Diminui o tamanho da fonte na legenda
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap", // Quebra de linha nas legendas
                overflow: "auto", // Permite que o conteúdo da legenda não seja cortado
              }}
            />
          </AreaChart>
        </AreaContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
