import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

function Task() {
  return (
    <>
      <CreateTask />
      <div className="container">
        <hr></hr>
      </div>
      <TaskList />
    </>
  );
}

export default Task;
