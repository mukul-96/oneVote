import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const SignUp=()=>{
const [email,setEmail]=useState("");
const [name,setName]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();
const handleEmailChange=(e)=>{
setEmail(e.target.value);
}
const handleNameChange=(e)=>{
    setName(e.target.value);
    }
    const handlePassChange=(e)=>{
        setPassword(e.target.value);
        }
const signup=async()=>{
    try {
        const response = await axios.post("http://localhost:4000/voter/signup", {
          name: name,
          email: email,
          password: password
        });
  
        if (response.data.token) {
          localStorage.setItem("authorization", "Bearer " + response.data.token);
          toast.success("Account created");
          setTimeout(() => {
            navigate("/voter/voting");
          }, 1500);
        } else {
          toast.error("Invalid response from server");
        }
      } catch (error) {
        toast.error("Error creating account:");

      }
}

return(
    <div className='flex justify-center items-center h-screen'>
    <div className='grid grid-cols-3 grid-rows-3 gap-4 p-4 bg-gray-200 rounded-lg shadow-lg'>
      <label htmlFor='name' className='col-span-1'>NAME</label>
      <input className='border-2 border-black p-2 col-span-2' type='text' id='name' onChange={handleNameChange} />

      <label htmlFor='email' className='col-span-1'>EMAIL</label>
      <input className='border-2 border-black p-2 col-span-2' type='email' id='email' onChange={handleEmailChange} />

      <label htmlFor='pass' className='col-span-1'>PASSWORD</label>
      <input className='border-2 border-black p-2 col-span-2' type='password' id='pass' onChange={handlePassChange} />

      <button className='col-span-3 bg-red-300 text-white px-4 py-2 rounded flex justify-center' id='Button' onClick={signup}>SIGNUP</button>

      <ToastContainer />
    </div>
  </div>
);
}


export default SignUp;