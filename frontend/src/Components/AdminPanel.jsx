import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import VoterStatsChart from './VoterStatsChart';
import Result from './Result';

const AdminPanel = () => {
    let navigate = useNavigate();
    const [partyName, setPartyName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [party, setParty] = useState([]);
    const[resetTrigger,setResetTrigger]=useState(0);
    const token = localStorage.getItem("authorization");

    const handlePartyNameChange = (event) => {
        setPartyName((event.target.value).toUpperCase());
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const logout = () => {
        localStorage.removeItem("authorization");
        toast.success("Logged out");
        setTimeout(() => {
            navigate("/");
        }, 800);
    };

    const addParty = async () => {
        try {
            if (partyName !== '' && imageUrl !== '') {
                await axios.post("https://onevote-backend.onrender.com/admin/party/add", {
                    name: partyName,
                    img: imageUrl
                }, {
                    headers: {
                        Authorization: token ? token : " "
                    }
                });
                toast.success('Party added successfully');
                setPartyName('');
                setImageUrl('');
                getData();
            }
        } catch (error) {
            toast.error('Failed to add party');
            console.error('Add party error:', error);
        }
    };

    
        
    const deleteParty = async (name) => {
        try {
            await axios.delete(`https://onevote-backend.onrender.com/admin/party/delete/${name}`, {
                headers: {
                    Authorization: token ? token : " "
                }
            });
            toast.success('Party deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete party');
            console.error('Delete party error:', error);
        }
    };

    const reset = async () => {
        try {
            await axios.put("https://onevote-backend.onrender.com/admin/reset", {}, {
                headers: {
                    Authorization: token ? token : ""
                }
            });
            toast.success("Data reset successfully");
            setResetTrigger(prevResetTrigger => prevResetTrigger + 1);
        } 
            catch (error) {
            toast.error("Failed to reset data");
            console.error("Reset data error:", error);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get("https://onevote-backend.onrender.com/voter/getList");
            setParty(response.data || []);
        } catch (error) {
            toast.error("Error fetching party list");
            console.error("Fetch party list error:", error);
        }
    };
   
    useEffect(() => {
        getData();
        
    }, [resetTrigger]);

    return (
        <div className="flex flex-col items-center justify-center  p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        LOG OUT
                    </button>
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Add Party</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="partyName" className="mb-1">Party Name:</label>
                                <input type="text" id="partyName" value={partyName} onChange={handlePartyNameChange} className="border-2 border-gray-400 px-2 py-1 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="imageUrl" className="mb-1">Image URL:</label>
                                <input type="text" id="imageUrl" value={imageUrl} onChange={handleImageUrlChange} className="border-2 border-gray-400 px-2 py-1 rounded-md" />
                            </div>
                            <button onClick={addParty} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                Add Party
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold mb-4">Voter Turnout</h2>
                        <VoterStatsChart resetTrigger={resetTrigger}/>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold mb-4">Reset Data</h2>
                        <button onClick={reset} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        RESET
                    </button>
                    </div>
                </div>
                <Result resetTrigger={resetTrigger}/>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {party.length > 0 ? (
                        party.map((candidate) => (
                            <div key={candidate._id} className="bg-white p-4 rounded-lg shadow-md">
                                {candidate.img && <img src={candidate.img} alt={candidate.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />}
                                <p className="text-center font-bold mb-2">{candidate.name}</p>
                                <button onClick={() => deleteParty(candidate.name)} className="block mx-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-3">No parties available</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminPanel;
