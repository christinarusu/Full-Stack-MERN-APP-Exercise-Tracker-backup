// Christina Rusu


import ExerciseItem from './ExerciseRow.jsx'
import '../App.css'

function ExerciseTable({exercises, onDelete, onEdit}){
    return(
    <table className='ordtable'>
        <thead>
            <tr className='tr'>
                <th className='th'>Name</th>
                <th className='th'>Reps</th>
                <th className='th'>Weight</th>
                <th className='th'>Unit</th>
                <th className='th'>Date</th>
                <th className='th'> </th>
                <th className='th'> </th>
            </tr>
        </thead>
        <tbody>
            {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                    onDelete={onDelete} onEdit={onEdit} key={i} />)}
        </tbody>
    </table>)
}

export default ExerciseTable