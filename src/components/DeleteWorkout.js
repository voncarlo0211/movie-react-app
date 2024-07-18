import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function DeleteWorkout({workout, fetchData}) {

	const deleteWorkout = (workoutId) => {
        fetch(`https://fitness-tracker-9vc4.onrender.com/workouts/deleteWorkout/${workoutId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            if(data.message === 'Workout deleted successfully') {

                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Workout deleted successfully'
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
    <>
    	<Button className="mx-1" variant="danger" size="sm" onClick={() => deleteWorkout(workout)}>Delete</Button>

    </>
    	)

}