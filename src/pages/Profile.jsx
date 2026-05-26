export default function Profile({ tasks, user }) {
  // Directly calculate from the props already passed to the component
  const completedCount = tasks.filter((task) => task.completed).length;
  const archivedCount = tasks.filter((task) => task.archived).length;
  const inProgressCount = tasks.filter(
    (task) => !task.completed && !task.archived,
  ).length;

  console.log(user.user_metadata);
  const userFirstName = user.user_metadata.first_name;
  const userLastName = user.user_metadata.last_name;
  const userEmail = user.user_metadata.email;

  return (
    <div>
      <h1>Tasks Completed : {completedCount}</h1>
      <p>Tasks Archived : {archivedCount}</p>
      <p>Tasks In Progress : {inProgressCount}</p>
      <p>First Name: {userFirstName}</p>
      <p>Last Name: {userLastName}</p>
      <p>email: {userEmail}</p>
    </div>
  );
}
