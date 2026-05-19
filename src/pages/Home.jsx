import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineArchive } from "react-icons/md";
import '../App.css'

const TaskCardHeader = ({task}) => {

    function handleChecked(){
        task.onCompletion(task.id);
    }

        function handleRemoveButton(){
        if(typeof task.onRemove === 'function'){
            task.onRemove(task.id);
            return;
        }
    }

    return(
        <>
            <div id="customCheckbox" className="w-fit h-fit px-2 py-1 rounded-sm hover:bg-[#45c484] cursor-pointer text-xs hover:text-black" onClick={handleChecked}>Mark As Complete</div>
            <FaRegTrashCan onClick={handleRemoveButton} className="removeButton"/>
        </>
    )
}

function TaskCard({task}){
    const [isEditing, setIsEditing] = useState(false);
    const [taskValue, setTaskValue] = useState(task.taskName);

    function handleEditButton(){
        if(!isEditing){
            setIsEditing(true);
        }
        else{
            setIsEditing(false);
        }
        return;
    }

    function handleTaskValueChange(e){
        setTaskValue(e.target.value);        
        console.log(taskValue);
    }

    function handleSaveButton(){
        task.onSave(task.id, taskValue);
        setIsEditing(false);
    }

    function handleArchive(){
        task.onArchive(task.id);
    }

    return(
        <div id="taskcard" className="flex flex-col rounded-md bg-white/4 h-fit p-4 mt-5 hover:shadow-lg hover:translate-y-[-5px] duration-150 ease-in" >
            <header id="card-header" className="flex justify-between">
                <TaskCardHeader task={task} isEditing={isEditing}/>
            </header>
                {
                    isEditing ? 
                    <>
                    <form className="flex flex-col gap-3 mt-5" onSubmit={handleSaveButton}>
                        <input type="text" name="userTaskEdit" id="userTaskEdit" value={taskValue} onChange={handleTaskValueChange}/>
                        <button id="saveEditButton" className="border border-[#4CAF50] w-fit m-auto px-3 py-1 rounded-lg hover:bg-[#4CAF50] duration-75 ease-in hover:border-transparent" type="submit">Save</button>  
                    </form>   
                    </>

                    :
                <h2 className="card-header py-5 font-semibold text-xl">{task.taskName}</h2>
                }
            

            { isEditing ? (
                <div id="cardButtonContainer" className="flex justify-end">
                </div>
            )
            :
            (
            <div id="cardButtonContainer" className="flex justify-between">
                <button className="editButton border border-gray-500 w-fit px-3 py-1 rounded-sm hover:bg-gray-500 duration-150 ease-in" onClick={handleEditButton}>Edit</button>
                <button id="archive-button" className="border border-gray-500 rounded-md px-2 hover:bg-[#c3cc5e] hover:text-yellow-900 duration-150 ease-in" onClick={handleArchive}>Archive</button>
            </div>
            )
            }   
        </div>
    );
}

function DisplayCurrentTask({tasks, onRemove, onSave, onCompletion, onArchive}){
    return(
        <>
        {
            tasks.length !== 0 ? (
            tasks.filter((task) =>
                (task.completed === false && task.archived === false)
            ).map(task => 
                <TaskCard key={task.id} task={{...task, onRemove, onSave, onCompletion, onArchive}} />
            )
        ):
        (
            <h3>Lets Create Some Tasks!!</h3>
        )
        }
        </>
    );
}


function NewTaskWindow({ onCreateTask }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskGoalDate, setTaskGoalDate] = useState('');

    function handleInputChange(e) {
        setTaskTitle(e.target.value);
    }

    function handleDateChange(e) {
        setTaskGoalDate(e.target.value);
    }

    function handleNewTask(e) {
        e.preventDefault();
        onCreateTask({
            id: crypto.randomUUID(),
            taskName: taskTitle,
            dateCreated: new Date().getDate(),
            goalDate: taskGoalDate,
            completed: false,
            archived : false
        });
        setTaskTitle('');
        setTaskGoalDate('');
    }

    return (
        <div id="newTasksContainer" className="w-5/6 p-[1rem] m-auto">
            <h2 id="newTaskHeader" className="sectionHeaderTitle">New Task</h2>
            <form
                className="grid grid-rows-3 grid-cols-10 w-full gap-5 rounded-xl bg-white/4 p-5"
                onSubmit={handleNewTask}
            >
                <input
                    type="text"
                    name="newTaskTitle"
                    id="newTaskTitle"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={handleInputChange}
                    className="w-full col-span-full"
                    required
                />

                <div className="flex gap-4 w-full items-center col-span-full">
                    <label htmlFor="goalDate" className="whitespace-nowrap">
                        Goal Date
                    </label>
                    <input
                        id="newTaskGoalDate"
                        type="date"
                        name="newTaskGoalDate"
                        value={taskGoalDate}
                        onChange={handleDateChange}
                        className="flex-1"
                    />
                </div>

                <button className="createTaskButton w-full col-start-4 col-span-4" type="submit">
                    Create Task
                </button>
            </form>
        </div>
    );
}


function CompleteTaskCard({task}){


    function handleRemove(){
        task.onRemove(task.id);
        return;
    }

    function handleArchive(){
        task.onArchive(task.id);
    }

    return (

        <div id="completedTaskcard" className="flex flex-row justify-between w-5/6 h-fit my-3 px-5 border-b border-black pt-2 m-auto">
                <h2 className="card-header font-semibold text-lg">{task.taskName}</h2>
                <div id="archive-remove-buttons" className="flex flex-row gap-5">
                    <MdOutlineArchive onClick={handleArchive} className="archive-icon"/>
                    <FaRegTrashCan onClick={handleRemove} className="removeButton remove-icon"/>
                </div>
        </div>
    );
}
//figure out what to display when theres no tasks completed
//When you've completed a Task, it goes Here!
function CompletedTasks({tasks, onRemove, onArchive}){
        const completedTasks = tasks.filter(tasks => 
            tasks.completed && tasks.archived === false
        )

        const completedTasksCount = completedTasks.length;
    
    return(

        completedTasksCount > 0 ?
        completedTasks.map(task => (
            <CompleteTaskCard key={task.id} task={{...task, onRemove, onArchive}}></CompleteTaskCard>
            )
        )
        :
        <h3 className="m-auto text-lg">When you complete a task, it goes here!</h3>
    )
}



function Home({tasks, setTasks}){

    function handleRemoveTask(id){
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    //REMEMBER THIS YOU ALWAYS MESS THIS UP 
    //IF THE STATE IS AN OBJECT, for example, YOU MUST RETURN A NEWNEWNEWNEWNWENWENWENWENW NEW OBJECT!!
    function handleEditChange(id, newTask){
        setTasks(currentTasks => currentTasks.map(task =>
            task.id === id ? {...task, taskName: newTask} :
            task
        ));
    }

    function createNewTask(newTask){
        setTasks(currentTasks => [...currentTasks, newTask]);
    }

    function handleCompleteTask(id){
        setTasks(currentTasks => currentTasks.map(task => 
            task.id === id ? {...task, completed : true} : 
            task
        ));
    }

    function handleArchive(id){
        setTasks(currentTasks => currentTasks.map(task => 
            task.id === id ? {...task, archived : true} :
            task
        ));
    }

    return(
        <>
            
            <div id="homeContainer" className=" h-full w-full flex flex-row gap-15">
                <section id="currentTasks" className= "w-1/2 min-h-[600px] h-fit rounded-xl">
                    <h2 className="sectionHeaderTitle h-fit">Tasks in Progress</h2>
                    <DisplayCurrentTask tasks={tasks} onRemove={handleRemoveTask} onSave={handleEditChange} onCompletion={handleCompleteTask} onArchive={handleArchive}/>
                </section>
                <div id="twoSectionsDiv" className="flex flex-col w-1/2 min-h-fit h-9/10 rounded-xl gap-5">
                    <section id="newTasks" className=" w-full h-fit">
                        <NewTaskWindow onCreateTask={createNewTask} tasks={tasks}> </NewTaskWindow>
                    </section>
                    <section className="w-full h-full rounded-xl ">
                        <h2 className="sectionHeaderTitle">Completed Tasks</h2>
                        <div className="w-full m-auto min-h-85 max-h-fit bg-white/4 rounded-xl flex flex-col items-center">
                            <CompletedTasks tasks={tasks} onRemove={handleRemoveTask} onArchive={handleArchive}></CompletedTasks>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home;