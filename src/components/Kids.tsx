import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../store/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Kids() {
  const ageArr = useAppSelector(state => state.PresentReducer.ageCount)
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Ж',
        data: ageArr.female,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'M',
        data: ageArr.male,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="kids element">
        <Bar options={options} data={data} />
    </div>
  )
}
