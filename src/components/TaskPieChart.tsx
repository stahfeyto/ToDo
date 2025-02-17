import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend, ResponsiveContainer as BarContainer } from "recharts";
import { AreaChart, Area, XAxis as AreaXAxis, YAxis as AreaYAxis, CartesianGrid as AreaGrid, Tooltip as AreaTooltip, ResponsiveContainer as AreaContainer, LabelList } from "recharts";

// Dados para o Gráfico Circular (Tarefas)
const taskData = [
  { name: "Completed", value: 6, color: "#f4faff" },
  { name: "Uncompleted", value: 4, color: "#8884d8" },
];

// Dados para o Gráfico de Barras (Visitantes)
const visitorData = [
  { shortName: "All", fullName: "All Tasks", value: 7 },
  { shortName: "Today", fullName: "Today's Tasks", value: 3 },
  { shortName: "Comp", fullName: "Completed Tasks", value: 5 },
  { shortName: "Uncom", fullName: "Uncompleted Tasks", value: 2 },
  { shortName: "Impor", fullName: "Important Tasks", value: 4 },
];

// Dados para o Gráfico de Área
const areaData = [
  { name: "Monday", im: 4, co: 2 },
  { name: "Tuesday", im: 5, co: 3 },
  { name: "Wednesday", im: 2, co: 7 },
  { name: "Thursday", im: 4, co: 3 },
  { name: "Friday", im: 2, co: 4 },
  { name: "Saturday", im: 1, co: 3 },
  { name: "Sunday", im: 4, co: 6 },
];

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
