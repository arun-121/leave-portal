import { ref, onValue} from "firebase/database";
import { database } from "../config/configGoogle";
import { useState, useEffect } from "react";
import RejectedDashboard from "./RejectedDashboard";
import ApprovedDashboard from "./ApprovedDashboard";
function UserCard({ name, email, gyear, dept, remarks, status }) {
    const [approvedState, setApprovedState] = useState(false)
    const [rejectedState, setRejectedState] = useState(false);
    const [display, setDisplay] = useState(true);
    useEffect(() => {
        const dataRef = ref(database, "rejected/" + name);
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
                setRejectedState(true)
                setDisplay(false)
            }
        });
        return () => {
            unsubscribe();
        }
    });

    useEffect(() => {
        const dataRef = ref(database, "approved/" + name);
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
                setApprovedState(true)
                setDisplay(false)
            }
        });
        return () => {
            unsubscribe();
        }
    });
    return (
        <>
        {approvedState && <ApprovedDashboard name={name}/>}
        {rejectedState && <RejectedDashboard name={name}/>}
            {display && <>
            <h2 style={{marginLeft:"20px"}}>Welcome {name}</h2>
            <div className="card">
                <h3 className="card-title">{name}</h3>
                <div className="card-body">
                    <p className="card-email">Email: {email}</p>
                    <p className="card-dept">Department: {dept}</p>
                    <p className="card-gyear">Graduation Year: {gyear}</p>
                    <p className="status">status: {status}</p>
                    <p className="status">remarks: {remarks}</p>
                </div></div></>}
        </>
    )
}
export default UserCard;