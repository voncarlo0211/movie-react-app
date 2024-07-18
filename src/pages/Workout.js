import { useEffect, useState, useContext } from "react";
import { Table } from "react-bootstrap";
import AddWorkout from "../components/AddWorkout";
import EditWorkout from "../components/EditWorkout";
import DeleteWorkout from "../components/DeleteWorkout";
import CompleteWorkout from "../components/CompleteWorkout";
import UserContext from "../UserContext";
import { CardGroup } from "react-bootstrap";

export default function Workouts() {
  const { user } = useContext(UserContext);

  const [workouts, setWorkouts] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:4000/workouts/getMyWorkouts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        if (typeof data.message !== "string") {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center my-4">My Workouts</h1>
      <AddWorkout fetchData={fetchData} />
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Duration</th>
            <th>Date Added</th>
            <th>Status</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.duration}</td>
              <td className="text-center">{workout.dateAdded}</td>
              <td
                className={
                  workout.status === "completed"
                    ? "text-success text-center"
                    : "text-danger text-center"
                }
              >
                {workout.status === "completed" ? "Completed" : "Pending"}
              </td>
              <td className="text-center">
                {workout.status !== "completed" && (
                  <CompleteWorkout
                    workout={workout._id}
                    fetchData={fetchData}
                  />
                )}
                <EditWorkout workout={workout._id} fetchData={fetchData} />
                <DeleteWorkout
                  workout={workout._id}
                  status={workout.status}
                  fetchData={fetchData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
