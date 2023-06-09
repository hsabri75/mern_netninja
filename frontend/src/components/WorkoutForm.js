import {useState} from 'react';
import {useWorkoutsContext} from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthcontext';

const WorkoutForm = ()=>{
    const {dispatch} = useWorkoutsContext(); 
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields,setEmptyFields]=useState([]);
    const {user} = useAuthContext()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const wo= {title,reps,load}
        if(!user){
            setError('You must be logged in')
            return
        }
        const resp = await fetch('/api/workouts',
        {
            method:'POST',
            body: JSON.stringify(wo),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await resp.json();
        if(!resp.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);            
        }else{
            setError(null);
            console.log('new workout added ', wo)
            setTitle('');
            setReps('');
            setLoad('')
            setEmptyFields([]);
            dispatch({type:'CREATE_WORKOUT', payload: json})
        }
        
    }

    return (
 
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add Workout</h3>

            <label>Title</label>
            <input 
                type='text' 
                value={title} 
                onChange={(event)=>{setTitle(event.target.value)}}
                className={emptyFields.includes('title') ? 'error' : ''}
                />

            <label>Reps</label>
            <input 
                type='number' 
                value={reps} 
                onChange={(event)=>{setReps(event.target.value)}}
                className={emptyFields.includes('reps') ? 'error' : ''}
                />

            <label>Load</label>
            <input 
                type='number' 
                value={load} 
                onChange={(event)=>{setLoad(event.target.value)}}
                className={emptyFields.includes('load') ? 'error' : ''}
                />
            <button type='submit'>Add</button>
            {error && <div className='error'>{error}</div>}
        </form>
        

    )
}

export default WorkoutForm;