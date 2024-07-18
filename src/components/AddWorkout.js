import { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct({ fetchData }) {

	const { user } = useContext(UserContext);
	const [ name, setName ] = useState("");
	const [ duration, setDuration ] = useState("");
	const [ isActive, setIsActive ] = useState(false);
	const [show, setShow] = useState(false);


const openM = () => {

		setShow(true);
	}

const closeEdit = () => {

		setShow(false);

		setName('');
		setDuration('');
	}


function addWorkout(e) {
		e.preventDefault();

		let token = localStorage.getItem('token');

		fetch(`https://fitness-tracker-9vc4.onrender.com/workouts/addWorkout`, {
			method: "POST",
			headers: { 
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
			body: JSON.stringify({
				name: name,
				duration: duration
			})
		})
		.then(res => res.json())
		.then(data => {

			console.table(data);

			if(data.error === 'Workout already exists') {
			Swal.fire({
					title: 'Workout already exists',
					icon: 'error'
				})
				setName("");
				setDuration("");

			} else if(data.error === 'Failed to save the workout') {

				Swal.fire({
					title: 'Failed to save the workout',
					icon: 'error',
					text: 'Try again'

				})
				setName("");
				setDuration("");

				closeEdit();
				fetchData();

			} else if(data !== null) {
				Swal.fire({
					title: 'Workout Added',
					icon: 'success'

				})

				closeEdit();
				fetchData();

			} else {
				Swal.fire({
					title: 'Error in adding the workout',
					icon: 'error'
				})

				closeEdit();
				fetchData();
			}
			
		})
			setName("");
			setDuration("");
	}

		useEffect(() => {
		if(name !=="" && duration) {

			setIsActive(true);
		} else {
			setIsActive(false);
		}

	}, [name, duration])
	return (
	<>
		<Button className="p-3 mb-2" variant="primary" size="sm" onClick={() => openM()}>Add Workout</Button>

		<Modal className="p-5" show={show} onHide={closeEdit}>
		<Form className="p-5" onSubmit={e => addWorkout(e)}>
	    	<h1 className="text-center">Add Workout</h1>
	      <Form.Group className="mb-3" controlId="formBasicEmail">
	        <Form.Label>Name</Form.Label>
	        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => {setName(e.target.value)}} required/>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="formBasicPassword">
	        <Form.Label>Duration</Form.Label>
	        <Form.Control type="text" placeholder="Enter Duration" value={duration} onChange={e => {setDuration(e.target.value)}} required/>
	      </Form.Group>
	      	{
			 isActive?
			<Button variant="primary" type="submit" className="my-3">Submit</Button>
			:
			<Button variant="danger" type="submit" className="my-3" disabled>Submit</Button>
			}
	    </Form>
		</Modal>
	</>
		)
}