import {useEffect, useState} from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = ()=>{
    const [workouts, setWorkouts] = useState(null);
    useEffect(
        ()=>{
            const fetchWorkouts = async()=>{
                const resp = await fetch('/api/workouts');                
                const json = await resp.json();
                console.log(json);
                if(resp.ok){
                    setWorkouts(json);
                }                
            }
            fetchWorkouts();
        },[]
    )
    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((wo)=>(
                    <WorkoutDetails key={wo._id} workout={wo} ></WorkoutDetails>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home;