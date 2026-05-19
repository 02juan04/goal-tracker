import './nav.css'
import {NavLink} from 'react-router-dom';

const navOptions = [
    { label: "Home", path: "/" },
    { label: "Profile", path: "/Profile" },
    { label: "Archived", path: "/Archived" },
];

export default function Nav(){
    return(
        <nav className='flex justify-center mb-6'>
            <ul className='flex gap-10'>
            {navOptions.map(item => 
            <div key={item} className='navOptionContainer'>
                <li>
                    <NavLink to={item.path}>{item.label}</NavLink>
                </li>
            </div>
            )}
            </ul>
        </nav>
    );
}