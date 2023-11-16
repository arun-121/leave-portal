import { database } from '../config/configGoogle'
import { ref, remove, set} from "firebase/database";
import { useEffect, useState } from 'react';


function Cards({ name, email, dept, gyear}) {
    const[remarks,setRemarks]=useState();
    const[isBtnClicked,setisBtnclicked]=useState(false);


    useEffect(()=>{


    },[isBtnClicked])
     

    let user_name=name;
    let admin="ARUN"
    function approveReq() {
        //stores approved requests
        set(ref(database, "approved/" + name),
            {
                name: name,
                email: email,
                gyear: gyear,
                dept: dept,
                remarks:remarks,
                status:"approved"
            }
        )
        console.log(name)

        //deleting users so that they wont appear in admin dashboard
        remove(ref(database,"users/"+user_name)).then(()=>{console.log("delted")}).catch((err)=>{console.error(err)})
       
        
    }

    function rejectReq() {
        setisBtnclicked(true);
        //stores rejected requests
        set(ref(database, "rejected/" + name),
            {
                name: name,
                email: email,
                gyear: gyear,
                dept: dept,
                remarks:remarks,
                status:"rejected"
            }
        )
        //deleting users so that they wont appear in admin dashboard
        remove(ref(database,"users/"+user_name)).then(()=>{console.log("delted")}).catch((err)=>{console.error(err)})
    }
    return (
        <div className="card">
            <h3 className="card-title">{name}</h3>
            <div className="card-body">
                <p className="card-email">Email: {email}</p>
                <p className="card-dept">Department: {dept}</p>
                <p className="card-gyear">Graduation Year: {gyear}</p>
                <div className="card-actions">
                    <button className="approve-button" onClick={approveReq}>Approve</button>
                    <button className="reject-button" onClick={rejectReq}>Reject</button>
                </div>
                <textarea className="card-textarea" rows="4" placeholder="Enter your comment" onChange={(e)=>{
                    setRemarks(e.target.value);
                }}></textarea>
            </div>
        </div>
    );
}

export default Cards;
