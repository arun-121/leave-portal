import { useState } from "react";
import { auth, provider } from '../config/configGoogle'
import { database } from "../config/configGoogle";
import { ref, get, update } from "firebase/database";
import { useEffect } from "react";
import UserCard from "./UserCard";
import userImg from '../assets/user.png'
import emailImg from  '../assets/email.png'
import GyearImg from '../assets/mortarboard.png'
import deptImg from '../assets/diagram.png'


function UserDahboard(props) {
    const [data, setData] = useState(null);
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const [gyear, setgyear] = useState("");
    const [dept, setDept] = useState("");
    const handleGyearChange = (e) => {
        setgyear(e.target.value);
    };
    const handleDeptChange = (e) => {
        setDept(e.target.value);
    };
    const handleSubmit = async () => {
        update(ref(database, "users/" + props.username),
            {
                gyear: gyear,
                dept: dept
            })
        setIsBtnClicked(true)
    };
    useEffect(() => {
        const dbref = ref(database, 'users/' + props.username);
        get(dbref)
            .then((snapshot) => {
                const data = snapshot.val();
                if (data.status == undefined)
                    data.status = "pending"
                if (data.remarks == undefined)
                    data.remarks = "pending"
                setData(data);
            
            })
            .catch((err) => {
                console.error(err);
            });
    }, [isBtnClicked]);


    return (
        <>
            {!isBtnClicked &&
                <><h1 style={{ textAlign: "center", marginBottom: "50px", marginTop: "20px" }}>Fill in your details</h1>
                    <div className="input-container">

                        <label><img className="labelImg"  src={userImg}></img>Username</label>
                        <input
                            className="input-box"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="name"
                            required

                        />
                        <label><img className="labelImg"  src={emailImg}></img>email</label>
                        <input
                            className="input-box"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            required
                        />
                        <label><img className="labelImg"  src={GyearImg}></img>Graduation Year</label>
                        <input
                            className="input-box"
                            type="number"
                            name="graduationYear"
                            placeholder="graduation Year"
                            required
                            value={gyear}
                            onChange={handleGyearChange}

                        />
                        <label><img className="labelImg" src={deptImg}></img>Department</label>
                        <input
                            className="input-box"
                            type="text"
                            name="dept"
                            placeholder="dept"
                            required
                            value={dept}
                            onChange={handleDeptChange}
                        />
                        <button className="clc-btn" onClick={handleSubmit}>Apply</button>
                    </div></>}
            {isBtnClicked && <UserCard {...data} />}
        </>
    );


    {/*

        if a user got rejected and tries to reapply he should not see input boxes 
        but remarks
        */}

    {/* user dashboard:
cannot apply if already in approved list
can apply if got rejected */}



}

export default UserDahboard;