// Christina Rusu

import {Link} from 'react-router-dom'
import '../App.css'


function Navigation() {
  return (
    <nav className='nav'>
        <u className='linker'><Link to="/">Home</Link></u>
        <u className='linker'><Link to="/add-exercise">Create</Link></u>
    </nav>
  );
}
export default Navigation;