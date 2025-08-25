// Christina Rusu

import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import ExerciseTable from '../Components/ExerciseTable';



function HomePage({setExercise}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate()

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const data = await response.json()
        setExercises(data)
    }

    useEffect( () => {
        loadExercises(); 
    }, [])

    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`, 
            { method: 'DELETE' }
        );
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } 
        else {
            console.error(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = (exercise) =>{
        setExercise(exercise)
        navigate('/edit-exercise')
    }

    return (
        <>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
        </>
    );
}

export default HomePage;