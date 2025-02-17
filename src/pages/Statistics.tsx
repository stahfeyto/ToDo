import React, { useEffect } from "react";
import TaskPieChart from "../components/TaskPieChart";
import { useAppSelector } from "../store/hooks";
import { Task } from "../interfaces";

const Statistics: React.FC = () => {

  return (
    <div className="p-4">
      <TaskPieChart />
    </div>
  );
};

export default Statistics;
