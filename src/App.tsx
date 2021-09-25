import React, { useState, useRef } from "react";
type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  taskName: string;
  done: boolean;
}

function App(): JSX.Element {
  const initialState = "";
  const [newTask, setNewTask] = useState<string>(initialState);
  const [tasks, setTask] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    if (newTask === "") {
      console.log("Is empty you");
    } else {
      addTask(newTask);
      setNewTask(initialState);
      taskInput.current?.focus();
    }
  };

  const addTask = (taskName: string): void => {
    const newTasks: ITask[] = [...tasks, { taskName, done: false }];
    setTask(newTasks);
  };

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTask(newTasks);
  };

  const removeTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTask(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2>Add Your New Task!!!</h2>
              <form onSubmit={handleSubmit}>
                <label className="form-control-plaintext pt-0">Add a New Task</label>
                <input
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  type="text"
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-success btn-md mt-3">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, index: number) => (
            <div className="card card-body mt-2" key={index}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.taskName}
              </h2>
              <p>{t.done ? "Complete!!!" : "Not Complete!!!"}</p>

              <button
                className="btn-outline-secondary"
                onClick={() => toggleDoneTask(index)}
              >
                {t.done ? "✓" : "✗"}
              </button>
              <button
                className="btn-outline-danger mt-3"
                onClick={() => removeTask(index)}
              >
                🗑 Delete Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
