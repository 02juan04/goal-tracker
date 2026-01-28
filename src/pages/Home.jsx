import { useState } from "react";

const currentTasks = [
    {
        task : "Take my dog out for a walk",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
    {
        task : "Do My Homework",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
    {
        task : "Finish My Project",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
    {
        task : "Workout",
        dateCreated : new Date().getDate(),
        goalDate : new Date().getDate(),
        completed: false
    },
]


function NoTask(){
    return(
    <p>No Tasks :(</p>
    );
};


const TaskCardHeader = (props) => {
    const [checked, setChecked] = useState(false);

    function handleChecked(){
        if(!checked){
            setChecked(true);
            return;
        }
        setChecked(false)
    }

    return(
        <>
            <label htmlFor="inProgessCheckBox">
                {props.text}<input type="checkbox" checked={checked} onChange={handleChecked}/>
            </label>
        </>
    )
}

function TaskCard(props){
    const [inProgress, setInProgess] = useState(true);
    return(
        <div id="taskcard" className="flex flex-col rounded-sm border border-white-500 h-50 p-3 sm:h-100">
            <header id="card-header">
                {
                    inProgress ? 
                    <>
                        <TaskCardHeader text="In Progress"/>
                    </>
                    :
                    <>
                        <TaskCardHeader  text="Completed"/>
                    </>
                }
                <h3 className="card-header text-center">{props.task}</h3>
            </header>
            <div id="cardButtonContainer" className="flex justify-between">
                <button id="editButton" className="border border-gray-500 w-1/3">Edit</button>
                <button id="editButton" className="border border-gray-500 w-1/3">Remove</button>
            </div>
        </div>
    );
}

function DisplayCurrentTask(){
    return(
        <>
        {
            currentTasks.map((task, index) =>
                <TaskCard key={currentTasks[index].task} task={currentTasks[index].task} />
            )
        }
        </>
    );
}
function Home(){
    return(
        <>
            <h1 className="text-center">Lets start this day off on the right foot</h1>
            <div id="homeContainer" className=" h-full w-3/4 border border-indigo-500 flex flex-row gap-5">
                <section id="currentTasks" className=" flex flex-col gap-10 justify-center w-1/2 h-9/10 rounded-xl mt-15">
                    <DisplayCurrentTask/>
                </section>
                <div id="twoSectionsDiv" className="flex flex-col w-1/2 h-9/10 mt-15 rounded-xl gap-5">
                    <section id="newTasks" className="border border-yellow-500 w-full h-1/2 rounded-xl"> 
                    </section>
                    <section className="border border-yellow-500 w-full h-1/2 rounded-xl">
                    </section>
                </div>
            </div>

        </>
    )
}

export default Home;