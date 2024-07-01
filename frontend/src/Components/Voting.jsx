import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Voting = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const token = localStorage.getItem("authorization");

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const response = await axios.get('https://onevote-backend.onrender.com/voter/getList');
                setCandidates(response.data || []);
            } catch (error) {
                toast.error("Error fetching candidates");
                console.error("Fetch error:", error);
            }
        };
        getCandidates();
    }, []);

    const vote = async (name) => {
        if (!token) {
            toast.error("Login for voting");
            return;
        }

        try {
            await axios.put("https://onevote-backend.onrender.com/voter/voting", {
                voteTo: name
            }, {
                headers: {
                    Authorization: token?token:""
                }
            });
            toast.success("Voted successfully");
        } catch (error) {
            toast.error("You have already voted");
            console.error("Voting error:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("authorization");
        toast.success("Logged out");
        setTimeout(() => {
            navigate("/");
        }, 800);
    };
    setTimeout(()=>{
        logout();
    },50000)

    const Card = ({ candidate }) => {
        return (
            <div className="p-4 bg-gray-200">
                {candidate.img && <img src={candidate.img} alt={candidate.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />}
                <p className="text-center font-bold">{candidate.name}</p>
                <button  onClick={() => vote(candidate.name)} className="block mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                    Vote
                </button>
            </div>
        );
    };

    return (
        <div className="p-4 grid grid-rows-2">
            <div className="flex justify-end items-start"><button id="Button" className="bg-red-500 font-bold py-2 px-4 text-white" onClick={logout}>
                LOG OUT
            </button></div>
            <div className=" flex justify-center "><h1 className="text-2xl font-bold mb-4">LIST OF PARTIES</h1></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {candidates.map((candidate) => (
                    <Card key={candidate._id} candidate={candidate} />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Voting;
