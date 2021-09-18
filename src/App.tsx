import React, { useState } from "react";
type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  taskName: string;
  done: boolean;
}

function App(): JSX.Element {
  const initialState = "";
  const [newTask, setNewTask] = useState<string>(initialState);
  const [tasks, setTask] = useState<ITask[]>([]);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    console.log("Sending...", newTask);
    addTask(newTask);
    setNewTask(initialState);
    console.log(tasks);
  };

  const addTask = (taskName: string) => {
    const newTasks: ITask[] = [...tasks, { taskName, done: false }];
    setTask(newTasks);
  };

  return (
    <>
      <h1>Please Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button>Save</button>
      </form>
      {tasks.map((t: ITask, index: number) => {
        return <h1 key={index}>{t.taskName}</h1>;
      })}
    </>
  );
}

export default App;
