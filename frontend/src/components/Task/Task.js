import { useState } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

function Task() {
  const [isLoadPage, setIsLoadPage] = useState(false);
  const handleLoadPage = () => {
    setIsLoadPage(!isLoadPage);
  };
  return (
    <>
      <CreateTask onChangeCreate={() => handleLoadPage()} />
      <div className="container">
        <hr></hr>
      </div>
      <TaskList isLoadPage={isLoadPage} />
    </>
  );
}

export default Task;
