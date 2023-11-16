import React from 'react'
import { auth, provider } from './config/configGoogle'
import { signInWithPopup } from "firebase/auth"
import { useState } from 'react'
import { database } from './config/configGoogle'
import { ref, set, update } from "firebase/database";
import UserDahboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import Logo from './google-color.svg'
import bg from './assets/bg.jpg'

export function Login() {
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const signinwithgoogle = () => {
        signInWithPopup(auth, provider)
            .then((account) => {
                setUser("welcome  " + account.user.displayName)
                setUser(account.user.displayName);
                if (account.user.email == "arun.cs21@bitsathy.ac.in")
                    setAdmin(true)
                else {
                    writedatabase(account.user.displayName, account.user.email);
                }

            })
    }
    function writedatabase(name, email) {
        function WriteUserdata(name, email) {
            set(ref(database, "users/" + name),
                {
                    email: email,
                    dept: "",
                    gyear: "",
                    name: name
                })
        }
        WriteUserdata(name, email)
    }
    const mybg = {
        background: "#F9FFB2"
    }
    return (
        <>
            {isAdmin && <AdminDashboard />}
            {!isAdmin && user == null &&
                <>
                    {/* <div style={mybg}> */}
                    {/* <div className='cont' style={{ padding: "50px" }}> */}
                    {/* <img src={bg} alt="logo" style={{height:"620px", width:"920px", objectFit:"contain"}} /> */}
                    {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#F9FFB2", borderRadius: "30px", padding: "20px" }}> */}
                    {/* <div style={{ flex: "1" }}></div> */}
                    <h3 >  Apply for Leave</h3>

                    {/* <div style={{ flex: "1" }}></div> */}
                    <button onClick={signinwithgoogle} >
                        <img src={Logo} alt="google logo" style={{ width: "50px" }} />
                        {/* <p style={{ flex: "1", textAlign: "center", marginRight: "50px" }}>Sign in</p> */}
                    </button>
                    {/* <div style={{ flex: "2" }}></div> */}
                    {/* </div> */}
                    {/* // </div> */}
                    {/* </div> */}
                </>}
            {!isAdmin && user != null && <UserDahboard username={user} />}
        </>
    )
}
