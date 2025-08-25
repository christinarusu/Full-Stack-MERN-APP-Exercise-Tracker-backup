// Christina Rusu

import '../App.css';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function ExerciseItem({exercise, onDelete, onEdit}){
    
    return(
        <tr className='tr'>
            <td className='td'>{exercise.name}</td>
            <td className='td'>{exercise.reps}</td>
            <td className='td'>{exercise.weight}</td>
            <td className='td'>{exercise.unit}</td>
            <td className='td'>{exercise.date}</td>
            <td className='td'>
                <MdEdit onClick={() => onEdit(exercise)}/>
            </td>
            <td className='td'>
                <MdDelete onClick={() => onDelete(exercise._id)}/>
            </td>
        </tr>
    );
}

export default ExerciseItem;
