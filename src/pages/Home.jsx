import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineArchive } from "react-icons/md";
import "../App.css";

/* ===================== TASK CARD HEADER ===================== */

const TaskCardHeader = ({ task, onCompletion, onRemove }) => {
  function handleChecked() {
    onCompletion(task.id);
  }

  function handleRemoveButton() {
    if (typeof onRemove === "function") {
      onRemove(task.id);
    }
  }

  return (
    <>
      <div
        id="customCheckbox"
        className="w-fit h-fit px-2 py-1 rounded-sm hover:bg-[#45c484] cursor-pointer text-xs hover:text-black"
        onClick={handleChecked}
      >
        Mark As Complete
      </div>

      <FaRegTrashCan onClick={handleRemoveButton} className="removeButton" />
    </>
  );
};

/* ===================== TASK CARD ===================== */

function TaskCard({ task, onRemove, onSave, onCompletion, onArchive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskValue, setTaskValue] = useState(task.task_name);

  function handleEditButton() {
    setIsEditing((prev) => !prev);
  }

  function handleTaskValueChange(e) {
    setTaskValue(e.target.value);
  }

  function handleSaveButton(e) {
    e.preventDefault();
    onSave(task.id, taskValue);
    setIsEditing(false);
  }

  function handleArchive() {
    onArchive(task.id);
  }

  return (
    <div
      id="taskcard"
      className="flex flex-col rounded-md bg-white/4 h-fit p-4 mt-5 hover:shadow-lg hover:translate-y-[-5px] duration-150 ease-in"
    >
      <header id="card-header" className="flex justify-between">
        <TaskCardHeader
          task={task}
          onCompletion={onCompletion}
          onRemove={onRemove}
        />
      </header>

      {isEditing ? (
        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSaveButton}>
          <input
            type="text"
            value={taskValue}
            onChange={handleTaskValueChange}
          />

          <button
            id="saveEditButton"
            className="border border-[#4CAF50] w-fit m-auto px-3 py-1 rounded-lg hover:bg-[#4CAF50] duration-75 ease-in hover:border-transparent"
            type="submit"
          >
            Save
          </button>
        </form>
      ) : (
        <h2 className="card-header py-5 font-semibold text-xl">
          {task.task_name}
        </h2>
      )}

      {!isEditing && (
        <div id="cardButtonContainer" className="flex justify-between">
          <button
            className="editButton border border-gray-500 w-fit px-3 py-1 rounded-sm hover:bg-gray-500 duration-150 ease-in"
            onClick={handleEditButton}
          >
            Edit
          </button>

          <button
            id="archive-button"
            className="border border-gray-500 rounded-md px-2 hover:bg-[#c3cc5e] hover:text-yellow-900 duration-150 ease-in"
            onClick={handleArchive}
          >
            Archive
          </button>
        </div>
      )}
    </div>
  );
}

/* ===================== CURRENT TASKS ===================== */

function DisplayCurrentTask({
  tasks,
  onRemove,
  onSave,
  onCompletion,
  onArchive,
}) {
  return (
    <>
      {tasks ? (
        tasks
          .filter((task) => !task.completed && !task.archived)
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onRemove={onRemove}
              onSave={onSave}
              onCompletion={onCompletion}
              onArchive={onArchive}
            />
          ))
      ) : (
        <h3>Lets Create Some Tasks!!</h3>
      )}
    </>
  );
}

/* ===================== NEW TASK ===================== */

function NewTaskWindow({ onCreateTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskGoalDate, setTaskGoalDate] = useState("");

  function handleNewTask(e) {
    e.preventDefault();

    onCreateTask({
      id: crypto.randomUUID(),
      task_name: taskTitle,
      dateCreated: new Date().getDate(),
      goalDate: taskGoalDate,
      completed: false,
      archived: false,
    });

    setTaskTitle("");
    setTaskGoalDate("");
  }

  return (
    <div id="newTasksContainer" className="w-5/6 p-[1rem] m-auto">
      <h2 id="newTaskHeader" className="sectionHeaderTitle">
        New Task
      </h2>

      <form
        className="grid grid-rows-3 grid-cols-10 w-full gap-5 rounded-xl bg-white/4 p-5"
        onSubmit={handleNewTask}
      >
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full col-span-full"
          required
        />

        <div className="flex gap-4 w-full items-center col-span-full">
          <label className="whitespace-nowrap">Goal Date</label>
          <input
            type="date"
            value={taskGoalDate}
            onChange={(e) => setTaskGoalDate(e.target.value)}
            className="flex-1"
          />
        </div>

        <button
          className="createTaskButton w-full col-start-4 col-span-4"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

/* ===================== COMPLETED TASK CARD ===================== */

function CompleteTaskCard({ task, onRemove, onArchive }) {
  function handleRemove() {
    onRemove(task.id);
  }

  function handleArchive() {
    onArchive(task.id);
  }

  return (
    <div
      id="completedTaskcard"
      className="flex flex-row justify-between w-5/6 h-fit my-3 px-5 border-b border-black pt-2 m-auto"
    >
      <h2 className="card-header font-semibold text-lg">{task.task_name}</h2>

      <div className="flex flex-row gap-5">
        <MdOutlineArchive onClick={handleArchive} className="archive-icon" />
        <FaRegTrashCan onClick={handleRemove} className="removeButton" />
      </div>
    </div>
  );
}

/* ===================== COMPLETED TASKS LIST ===================== */

function CompletedTasks({ tasks, onRemove, onArchive }) {
  const completedTasks = tasks.filter(
    (task) => task.completed && !task.archived,
  );

  return completedTasks.length > 0 ? (
    completedTasks.map((task) => (
      <CompleteTaskCard
        key={task.id}
        task={task}
        onRemove={onRemove}
        onArchive={onArchive}
      />
    ))
  ) : (
    <h3 className="m-auto text-lg">When you complete a task, it goes here!</h3>
  );
}

/* ===================== HOME ===================== */

function Home({ tasks, setTasks }) {
  function handleRemoveTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleEditChange(id, newTask) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, task_name: newTask } : task,
      ),
    );
  }

  function createNewTask(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

  function handleCompleteTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: true } : task,
      ),
    );
  }

  function handleArchive(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, archived: true } : task,
      ),
    );
  }

  return (
    <div className="h-full w-full flex flex-row gap-15">
      <section className="w-1/2 min-h-[600px] h-fit rounded-xl">
        <h2 className="sectionHeaderTitle">Tasks in Progress</h2>

        <DisplayCurrentTask
          tasks={tasks}
          onRemove={handleRemoveTask}
          onSave={handleEditChange}
          onCompletion={handleCompleteTask}
          onArchive={handleArchive}
        />
      </section>
      {/*
      <div className="flex flex-col w-1/2 gap-5">
        <section>
          <NewTaskWindow onCreateTask={createNewTask} />
        </section>

        <section>
          <h2 className="sectionHeaderTitle">Completed Tasks</h2>

          <div className="w-full m-auto bg-white/4 rounded-xl flex flex-col items-center">
            <CompletedTasks
              tasks={tasks}
              onRemove={handleRemoveTask}
              onArchive={handleArchive}
            />
          </div>
        </section>
      </div>
    </div>*/}
    </div>
  );
}

export default Home;
