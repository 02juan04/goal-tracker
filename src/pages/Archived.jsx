import "../App.css";
import { Fragment } from "react";

function ArchivedTasksTable({ tasks }) {
  const archivedTasks = tasks.filter((task) => task.archived);

  return (
    <>
      <table className="w-full h-fit">
        <thead className="bg-slate-700">
          <tr className="border border-gray-500">
            <th className="p-2">Task</th>
            <th>Goal Date</th>
            <th>Completed</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody className="">
          {archivedTasks.map((task) => {
            return (
              <Fragment key={task.id}>
                <tr className="border-b border-slate-400">
                  <td className="text-center py-4">{task.task_name}</td>
                  <td className="text-center">{task.goal_date}</td>
                  <td className="text-center">
                    {task.completed ? "Yes" : "No"}
                  </td>
                  <td className="text-center">
                    {task.created_at.split("T")[0]}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function Archived({ tasks }) {
  return (
    <>
      <h2 id="archive-main-header" className="text-xl my-5">
        Archived Tasks
      </h2>
      <section id="archived-section" className="w-5/6 h-150">
        <ArchivedTasksTable tasks={tasks}></ArchivedTasksTable>
      </section>
    </>
  );
}

export default Archived;
