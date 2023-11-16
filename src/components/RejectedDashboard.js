import { ref,onValue} from "firebase/database";
import { database } from "../config/configGoogle";
import { useEffect, useState } from "react";

function RejectedDashboard({ name }) {
    const [data, setData] = useState(null);
    const [dataloaded, setDataloaded] = useState(false);

    useEffect(() => {
        const dbref = ref(database, "rejected/" + name);
        const unsubscribe = onValue(dbref, (snapshot) => {
            const updatedData = snapshot.val();
            setData(updatedData);
            setDataloaded(true)
          });
          return () => {
            unsubscribe();
          };
    },[])

    return (
        <>
            {dataloaded && <>
                <div className="card">
                    <h3 style={{ backgroundColor: "rgb(231, 0, 0)", color: "white", padding: "10px", textAlign: "center" }}>REJECTED</h3>
                    <h3 className="card-title">{name}</h3>
                    <div className="card-body">
                        <p className="card-email">Email: {data.email}</p>
                        <p className="card-dept">Department: {data.dept}</p>
                        <p className="card-gyear">Graduation Year: {data.gyear}</p>
                        <p className="status">status: {data.status}</p>
                        <p className="status">remarks: {data.remarks}</p>
                    </div>
                </div>
            </>}
        </>

    )

}
export default RejectedDashboard;