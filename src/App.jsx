import './App.css'
import Nav from './nav'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Consistency from './pages/Consistency.jsx'

function App() {

  return (
    <>
      <Nav/>
      <div className='flex w-5/6 md:w-3/4 lg:w-2/3 xl:w-250 flex-col justify-center items-center'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
          <Route path='/Consistency' element={<Consistency/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
