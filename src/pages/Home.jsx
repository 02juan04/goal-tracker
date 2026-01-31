import { useState } from "react";
import '../App.css'

const currentTasks = [
    {
        id: 1,
        taskName : "Take my dog out for a walk",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
    {
        id: 2,
        taskName : "Do My Homework",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
    {
        id: 3,
        taskName : "Finish My Project",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
    {
        id: 4,
        taskName : "Workout",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
]

const TaskCardHeader = ({task, onCompletion}) => {



    function handleChecked(){
        onCompletion(task);
    }

    return(
        <>
            <div id="customCheckbox" className="w-fit h-fit px-2 py-1 rounded-sm hover:bg-[#00FF7F] cursor-pointer text-xs hover:text-black" onClick={handleChecked}>Mark As Complete</div>
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

    function handleRemoveButton(){
        if(typeof task.onRemove === 'function'){
            task.onRemove(task.id);
            return;
        }
    }

    function handleTaskValueChange(e){
        setTaskValue(e.target.value);        
        console.log(taskValue);
    }

    function handleSaveButton(){
        task.onSave(task.id, taskValue);
        setIsEditing(false);
    }

    return(
        <div id="taskcard" className="flex flex-col rounded-md bg-white/4 h-fit p-4 mt-5 hover:shadow-lg hover:translate-y-[-5px] duration-150 ease-in" >
            <header id="card-header" className="flex justify-between">
                <TaskCardHeader task={task} onCompletion={task.onCompletion} isEditing={isEditing}/>
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
                    <button className="removeButton" onClick={handleRemoveButton}>Remove</button>
                </div>
            )
            :
            (
            <div id="cardButtonContainer" className="flex justify-between">
                <button className="editButton border border-gray-500 w-fit px-4 py-1 rounded-sm hover:bg-gray-500 duration-150 ease-in" onClick={handleEditButton}>Edit</button>
                <button className="removeButton" onClick={handleRemoveButton}>Remove</button>
            </div>
            )
            }   
        </div>
    );
}

function DisplayCurrentTask({tasks, onRemove, onSave, onCompletion}){
    return(
        <>
        {
            tasks.map((task) =>
                <TaskCard key={task.id} task={{...task, onRemove, onSave, onCompletion}} />
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
    return (
    <div id="completedTaskcard" class="flex flex-row justify-between w-5/6 h-fit my-5 px-5 border-b border-black p-1 m-auto">
            <h2 class="card-header font-semibold text-lg">{task.taskName}</h2>
            <button class="removeButton h-fit" onClick={handleRemove}>Remove</button>
    </div>
    );
}

function CompletedTasks({completedTasks, onRemove}){
    return(
            completedTasks.map(task =>
                <CompleteTaskCard key={task.id} task={{...task, onRemove}}></CompleteTaskCard>
            )
    )
}



function Home(){
    const [tasks, setTasks] = useState(currentTasks);
    const [completedTasks, setCompletedTasks] = useState([]);

    function handleRemoveTask(id){
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    function handleRemoveCompletedTask(id){
        setCompletedTasks(prev => prev.filter(t=> t.id !== id));
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

    function handleCompleteTask(completedTask){
        setCompletedTasks(completedTasks => [...completedTasks, completedTask])
        setTasks(currentTasks => currentTasks.filter(
            task => task.id !== completedTask.id
        ))
    }

    return(
        <>
            <h1>Lets start this day off on the right foot</h1>
            <div id="homeContainer" className=" h-full w-full flex flex-row gap-15">
                <section id="currentTasks" className= "w-1/2 min-h-[600px] h-fit rounded-xl mt-15">
                    <h2 className="sectionHeaderTitle h-fit">Tasks in Progress</h2>
                    <DisplayCurrentTask tasks={tasks} onRemove={handleRemoveTask} onSave={handleEditChange} onCompletion={handleCompleteTask}/>
                </section>
                <div id="twoSectionsDiv" className="flex flex-col w-1/2 min-h-fit h-9/10 mt-15 rounded-xl gap-5">
                    <section id="newTasks" className=" w-full h-fit">
                        <NewTaskWindow onCreateTask={createNewTask} tasks={tasks}> </NewTaskWindow>
                    </section>
                    <section className="w-full h-full rounded-xl ">
                        <h2 className="sectionHeaderTitle">Completed Tasks</h2>
                        <div className="w-full m-auto min-h-1/2 h-fit bg-white/4 rounded-xl py-1">
                        <CompletedTasks completedTasks={completedTasks} onRemove={handleRemoveCompletedTask}></CompletedTasks>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home;