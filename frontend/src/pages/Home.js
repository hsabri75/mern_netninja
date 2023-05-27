import {useEffect} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = ()=>{
    const {workouts, dispatch} = useWorkoutsContext(); 
    //const [workouts, setWorkouts] = useState(null);
    useEffect(()=>{
            const fetchWorkouts = async()=>{
                const resp = await fetch('/api/workouts');                
                const json = await resp.json();
                if(resp.ok){
                    dispatch({type:'SET_WORKOUTS', payload: json})
                    //setWorkouts(json);
                }                
            }
            fetchWorkouts()
        }, [dispatch])
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