import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Guard clause para que não sejam permitidos valores vazios
    if (newTaskTitle === "") return;

    // Cria nova task com id randomico
    const newTask = {
      id: Math.trunc(Math.random() * 1000),
      title: newTaskTitle,
      isComplete: false,
    };

    // Atualiza valor das tasks
    setTasks((task) => [...task, newTask]);

    // Reseta input
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altera o isComplete de uma determinada task para true
    const newTaskList = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );

    setTasks(newTaskList);
  }

  function handleRemoveTask(id: number) {
    // Filtra o array de tasks pelo id passado e atualiza a lista de tasks
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            id="input-text"
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
