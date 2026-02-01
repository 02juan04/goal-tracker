import './nav.css'
import {Link} from 'react-router-dom';

const navOptions = ["Home", "Profile", "Archived"];

export default function Nav(){
    return(
        <nav className='flex justify-center mt-7'>
            <ul className='flex gap-10'>
            {navOptions.map(item => 
            <div key={item} className='navOptionContainer'>
                <li><Link to={item === "Home" ? "/" : item}>{item}</Link></li>
            </div>
            )}
            </ul>
        </nav>
    );
}