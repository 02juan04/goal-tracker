import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineArchive } from "react-icons/md";
import "../App.css";
import { supabase } from "../utils/supabase";
import Archived from "./Archived";

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
  const [task_name, set_task_name] = useState(task.task_name);

  function handleEditButton() {
    setIsEditing((prev) => !prev);
  }

  function handle_task_name_change(e) {
    set_task_name(e.target.value);
  }

  function handleSaveButton(e) {
    e.preventDefault();
    onSave(task.id, task_name);
    setIsEditing(false);
  }

  function handleArchive() {
    onArchive(task.id);
  }

  return (
    <div
      id="taskcard"
      className="flex flex-col rounded-md bg-white/4 h-fit p-4 mt-5 hover:shadow-lg hover:scale-105 hover:bg-white/25 duration-175 ease-in"
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
            value={task_name}
            onChange={handle_task_name_change}
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

function NewTaskWindow({ onCreateTask, user }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskGoalDate, setTaskGoalDate] = useState("");

  function handleNewTask(e) {
    e.preventDefault();

    onCreateTask({
      task_name: taskTitle,
      goal_date: taskGoalDate,
      user_id: user.id,
    });

    console.log(taskGoalDate);

    setTaskTitle("");
    setTaskGoalDate("");
  }

  return (
    <div id="newTasksContainer" className="w-full m-auto mb-10">
      <h2 id="newTaskHeader" className="sectionHeaderTitle">
        New Task
      </h2>

      <form
        className="grid grid-rows-3 grid-cols-10 h-60 gap-5 rounded-xl bg-white/4 p-5"
        onSubmit={handleNewTask}
      >
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full col-span-full text-center"
          required
        />

        <div className="flex gap-4 w-full items-center mx-auto col-span-full text-lg">
          <label className="whitespace-nowrap">Goal Date</label>
          <input
            type="date"
            value={taskGoalDate}
            onChange={(e) => setTaskGoalDate(e.target.value)}
            className="flex-1 text-right"
            required
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
      className="flex flex-row justify-center items-center justify-evenly  bg-white/4 rounded-xl h-20 w-full my-1 px-5 hover:shadow-lg hover:scale-105 hover:bg-white/25 duration-250"
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

  return completedTasks.length ? (
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

function Home({ tasks, setTasks, user }) {
  /* TODO 
    handleRemoveTask needs to delete the row in the DB
    comeplete
  */
  async function handleRemoveTask(id) {
    const currentTasks = tasks;
    const response = await supabase.from("tasks").delete().eq("id", id);
    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (response.status != 204) {
      console.log(`response was not 200, it was: ${response.status}`);
      alert(response.statusText);
      setTasks(currentTasks);
      return;
    }
  }

  /* TODO
    handleEditChange needs to UPDATE its corresponding row in the DB
    complete
  */
  async function handleEditChange(id, new_task_name) {
    const { error } = await supabase
      .from("tasks")
      .update({ task_name: new_task_name })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, task_name: new_task_name } : task,
      ),
    );
  }

  //TODO created may18
  //inserts new row into DB
  //complete
  async function createNewTask(newTask) {
    const { data, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select();

    if (error) {
      console.log(error);
      return;
    }

    setTasks((prev) => [...prev, data[0]]);
  }

  //TODO complete must
  //  - update status from "in progress" to "complete"
  //  - update setTasks state for UI
  async function handleCompleteTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: true } : task,
      ),
    );
    const { error } = await supabase
      .from("tasks")
      .update({ completed: true, completed_date: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }
  }

  async function handleArchive(id) {
    const { error } = await supabase
      .from("tasks")
      .update({ archived: true })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, archived: true } : task,
      ),
    );
  }

  return (
    <div className="h-full w-full flex flex-row gap-15 font-extralight">
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
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="flex flex-col w-fit gap-5">
          <section>
            <NewTaskWindow onCreateTask={createNewTask} user={user} />
          </section>
        </div>
        <section>
          <h2 className="sectionHeaderTitle">Completed Tasks</h2>
          <div className="w-100 m-auto flex flex-col items-center">
            <CompletedTasks
              tasks={tasks}
              onRemove={handleRemoveTask}
              onArchive={handleArchive}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
