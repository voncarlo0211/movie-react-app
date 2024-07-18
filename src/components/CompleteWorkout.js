import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function CompleteWorkout({workout, fetchData}) {

const completeToggle = (workoutId) => {

        fetch(`https://fitness-tracker-9vc4.onrender.com/workouts/completeWorkoutStatus/${workoutId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if(data.message === "Workout status updated successfully") {

                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Workout status updated successfully'
                })

                fetchData();

            }else {

                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please try again'
                })

                fetchData();
            }
        })
    }

    return (
    		<Button variant="success" size="sm" onClick={() => completeToggle(workout)}>Complete</Button>
    	)
}