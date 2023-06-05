import {useEffect} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext';
import {useAuthContext} from '../hooks/useAuthcontext'

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = ()=>{
    const {workouts, dispatch} = useWorkoutsContext(); 
    const {user} = useAuthContext()
    useEffect(()=>{
            const fetchWorkouts = async()=>{
                const resp = await fetch('/api/workouts',{
                    headers:{
                        'Authorization': `Bearer ${user.token}`
                    }
                });                
                const json = await resp.json();
                if(resp.ok){
                    dispatch({type:'SET_WORKOUTS', payload: json})
                    //setWorkouts(json);
                }                
            }
            if(user){
                fetchWorkouts()
            }            
        }, [dispatch,user])
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