// Christina Rusu

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercise = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(`${API_URL}/exercises`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newExercise),
        });
        if(response.status === 201){
            alert("Successfully added the exercise")
        }
        else{
            alert("Failed to add exercise")
        }
        navigate('/')
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <table className='ordtable'>
        <thead className='tr'>
            <tr>
                <th className='th'>Name</th>
                <th className='th'>Reps</th>
                <th className='th'>Weight</th>
                <th className='th'>Unit</th>
                <th className='th'>Date</th>
            </tr>
        </thead>
        <tbody className='tbody'>
            <tr className='tr'>
                <td className='tdedit'>
                    <input className='input'
                    type="text"
                    placeholder="Enter name here"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                </td>
                <td className='tdedit'>
                    <input className='input'
                    type="number"
                    value={reps}
                    placeholder="Enter reps here"
                    onChange={e => setReps(e.target.valueAsNumber)} />
                </td>
                <td className='tdedit'>
                    <input className='input'
                    type="number"
                    placeholder="Enter weight here"
                    value={weight}
                    onChange={e => setWeight(e.target.valueAsNumber)} />
                </td>
                <td className='tdedit'>
                    <select 
                    className='input' 
                    value={unit} 
                    onChange={e => setUnit(e.target.value)}
                    >
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                        </select>
                </td>
                <td className='tdedit'>
                    <input className='input'
                    type="text"
                    placeholder="Enter date here"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                </td>
                </tr>
                </tbody>
                </table>
                <div></div>
            <button className='button'
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercise;
