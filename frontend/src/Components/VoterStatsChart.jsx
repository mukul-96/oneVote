
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

const VoterStatsChart = ({resetTrigger}) => {
    const [chartData, setChartData] = useState(null);
    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("authorization");
            const response = await axios.get("https://onevote-backend.onrender.com/admin/stats", {
                headers: {
                    Authorization: token ? token : " "
                }
            });
            const percentage = response.data.percentage;
            setChartData({
                labels: ['Voted', 'Not Voted'],
                datasets: [{
                    data: [percentage, 100 - percentage],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384']
                }]
            });
        } catch (error) {
            toast.error("Error fetching stats");
            console.error("Fetch stats error:", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [resetTrigger]);

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-full h-full">
            {chartData ? (
                <div className="w-full max-w-md">
                    <Doughnut data={chartData} />
                </div>
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
}

export default VoterStatsChart;
