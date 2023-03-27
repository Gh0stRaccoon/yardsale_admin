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

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export function Chart({ chartData }) {
	return (
		<>
			<Bar
				data={chartData}
				style={{ display: 'inline-block' }}
				options={{
					title: {
						display: true,
						text: 'Category',
						fontSize: 20,
					},
					Legend: {
						display: true,
						position: 'right',
					},
				}}
			/>
		</>
	);
}
