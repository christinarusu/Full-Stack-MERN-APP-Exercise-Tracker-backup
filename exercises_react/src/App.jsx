// Christina Rusu

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CreateExercise from './Pages/CreateExercisePage';
import EditExercise from './Pages/EditExercisePage';
import { useState } from 'react';
import Navigation from './Components/Navigation';


function App() {

  const [exToEdit, setExercise] = useState()

  return (
    <div className="body">
       <h1 className='header'>Exercise Tracker </h1>
        <p className='para'> Full Stack MERN App Demonstration</p>
        <Router>
          <Navigation className='linker'/>
          <Routes>
            <Route path="/" element={<HomePage setExercise={setExercise}/>}></Route>
            <Route path="/edit-exercise" element={ <EditExercise exToEdit={exToEdit}/>}></Route>
            <Route path="/add-exercise" element={ <CreateExercise />}></Route>
          </Routes>
        </Router>
        <footer>
          <p className='copright'>© 2025 Christina Rusu</p>
        </footer>
    </div>
  );
}

export default App;