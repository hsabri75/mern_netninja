import {useState} from 'react';

const WorkoutForm = ()=>{
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const wo= {title,reps,load}
        const resp = await fetch('/api/workouts',
        {
            method:'POST',
            body: JSON.stringify(wo),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await resp.json();
        if(!resp.ok){
            console.log(resp);
            console.log(json.error);
            setError(json.error);
        }else{
            setError(null);
            console.log('new workout added ', wo)
            setTitle('');
            setReps('');
            setLoad('')
        }
        
    }

    return (
 
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add Workout</h3>

            <label>Title</label>
            <input 
                type='text' 
                value={title} 
                onChange={(event)=>{setTitle(event.target.value)}}/>

            <label>Reps</label>
            <input 
                type='number' 
                value={reps} 
                onChange={(event)=>{setReps(event.target.value)}}/>

            <label>Load</label>
            <input 
                type='number' 
                value={load} 
                onChange={(event)=>{setLoad(event.target.value)}}/>
            <button type='submit'>Add</button>
            {error && <div className='error'>{error}</div>}
        </form>
        

    )
}

export default WorkoutForm;