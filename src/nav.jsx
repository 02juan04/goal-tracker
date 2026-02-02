import './nav.css'
import {Link} from 'react-router-dom';


export default function Nav(){
    return(
        <nav className='flex justify-center mb-6'>
            <ul className='flex gap-10'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Task-Types">Task Types</Link></li>
                <li><Link to="/Archived">Archived</Link></li>
            </ul>
        </nav>
    );
}