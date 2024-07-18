import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditWorkout({workout, fetchData}) {

	const [name, setName] = useState('');
	const [duration, setDuration] = useState('');
	const [showEdit, setShowEdit] = useState(false);

	const openEdit = () => {

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);

		setName('');
		setDuration('');
	}

	const editWorkout = (e, workout) => {

		e.preventDefault();

		fetch(`https://fitness-tracker-9vc4.onrender.com/workouts/updateWorkout/${workout}`, {
			method : "PATCH",
			headers : {
				'Content-Type' : 'application/json',
				Authorization : `Bearer ${localStorage.getItem('token')}`
			},
			body : JSON.stringify({
				name, 
				duration
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === 'Workout updated successfully') {

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Workout updated successfully'
				})

				closeEdit();
				fetchData();

			} else {

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})

				closeEdit();
				fetchData();
			}
		})
	}

	return (
		<>
		<Button className="mx-1" variant="primary" size="sm" onClick={() => openEdit()}>Edit</Button>

		<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editWorkout(e, workout)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Workout</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Duration</Form.Label>
							<Form.Control type="text" value={duration} onChange={e => setDuration(e.target.value)} required />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => closeEdit()}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
		)
}