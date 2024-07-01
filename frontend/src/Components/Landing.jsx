
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Landing = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("voter");

    const clickHandler = () => {
        setUser(prevUser => prevUser === "voter" ? "admin" : "voter");
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const signin = async () => {
        try {
            let response;
            if (user === "voter") {
                response = await axios.post("https://onevote-backend.onrender.com/voter/signin", {
                    email,
                    password
                });
            } else {
                response = await axios.post("https://onevote-backend.onrender.com/admin/signin", {
                    email,
                    password
                });
            }
            localStorage.setItem("authorization", "Bearer " + response.data.token);
            toast.success("Signin successful");
            setTimeout(() => {
                if (user === "voter") {
                    navigate("/voter/voting");
                } else {
                    navigate("/admin/manage");
                }
            }, 800);
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Signin error:", error);
        }
    };

    

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                    <p className="text-2xl px-2">I am a</p>
                    <button id="Button" className="text-2xl px-4 py-2 bg-green-300 text-white rounded-md" onClick={clickHandler}>
                        {user}
                    </button>
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor='email' className="block mb-2 text-lg">Email</label>
                        <input className="w-full border-2 border-gray-300 p-2 rounded" type='email' id='email' value={email} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label htmlFor="pass" className="block mb-2 text-lg">Password</label>
                        <input className="w-full border-2 border-gray-300 p-2 rounded" type='password' id='pass' value={password} onChange={handlePasswordChange} />
                    </div>
                    <button id="Button" className="w-full bg-red-300 text-white px-4 py-2 rounded mt-2" onClick={signin}>
                        Sign In
                    </button>
                    <div className="mt-4 flex justify-center">
                        <p className="mr-2">Don't have an account?</p>
                        <Link className="text-blue-500" to={"/voter/signup"}>Sign up</Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Landing;
