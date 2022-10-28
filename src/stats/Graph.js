import React from 'react'
import { useTheme } from '../context/ThemeContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function Graph({graphData, type}) {
  const {theme} = useTheme();
  return (
    <div>
        <Line
        
        data={
            {
                labels: graphData.map(i =>(type === 'date')?(""):( i[0] + 1)) ,
                datasets: [
                    {
                        data: graphData.map(i => i[1]) ,
                        label: 'WPM',
                        borderColor: theme.stats
                    }
                ]
            }
        } />
    </div>
  )
}

export default Graph