// Christina Rusu

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercise = ({exToEdit}) => {

    const [name, setName] = useState(exToEdit.name);
    const [reps, setReps] = useState(exToEdit.reps);
    const [weight, setWeight] = useState(exToEdit.weight);
    const [unit, setUnit] = useState(exToEdit.unit);
    const [date, setDate] = useState(exToEdit.date);

    const navigate = useNavigate()

    const modifyExercise = async () => {
        const modExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            `/exercises/${exToEdit._id}`,{
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(modExercise)
            }
        );
        if(response.status === 200){
            alert("Successfully edited the exercise")
        }
        else{
            alert("Failed to edit the exercise")
        }
        navigate('/')
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
        <table className='ordtable'>
        <thead className='thead'>
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
                    value={name}
                    onChange={e => setName(e.target.value)} />
                    </td>
                <td className='tdedit'>
                    <input className='input'
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.valueAsNumber)} />
                    </td>
                <td className='tdedit'>
                    <input className='input'
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.valueAsNumber)} />
                    </td>
                <td className='tdedit'>
                    <select 
                        name="unit" 
                        id="unit-select" 
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
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                    </td>
                </tr>
            </tbody>
            </table>
                <div></div>
            <button className='button'
                onClick={modifyExercise}
            >Save</button>
        </div>
    );
}

export default EditExercise;