import './App.css'
import Nav from './nav'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Archived from './pages/Archived.jsx'
import { useState } from "react";


const currentTasks = [
    {
        id: 1,
        taskName : "Take my dog out for a walk",
        dateCreated : new Intl.DateTimeFormat("en-US").format(new Date()),
        goalDate : "2026-12-12",
        completed: false,
        archived : false
    },
    {
        id: 2,
        taskName : "Do My Homework",
        dateCreated : new Intl.DateTimeFormat("en-US").format(new Date()),
        goalDate : "2026-2-3",
        completed: false,
        archived : false
    },
    {
        id: 3,
        taskName : "Finish My Project",
        dateCreated : new Intl.DateTimeFormat("en-US").format(new Date()),
        goalDate : "2026-1-23",
        completed: false,
        archived : false
    },
    {
        id: 4,
        taskName : "Workout",
        dateCreated : new Intl.DateTimeFormat("en-US").format(new Date()),
        goalDate : "2026-3-24",
        completed: false,
        archived : false
    },
]

function App() {
    const [tasks, setTasks] = useState(currentTasks);

  return (
    <>
      <h1 id="main-header" className="text-[50px] mb-4 mt-2 tracking-widest font-thin">Task Tracker</h1>
      <Nav/>
      <div className='flex w-5/6 md:w-3/4 lg:w-2/3 xl:w-250 flex-col justify-center items-center'>
        <Routes>
          <Route path='/' element={<Home tasks={tasks} setTasks={setTasks}/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
          <Route path='/Archived' element={<Archived tasks={tasks} setTasks={setTasks}/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
