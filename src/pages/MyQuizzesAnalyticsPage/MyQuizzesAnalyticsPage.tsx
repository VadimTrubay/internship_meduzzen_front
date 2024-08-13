import React from "react";
import {Bar} from 'react-chartjs-2';
import {Grid, Typography} from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {selectMyQuizzesResults} from "../../redux/analytics/selectors";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const MyQuizzesAnalyticsPage: React.FC = () => {
  const quizzesResults = useSelector(selectMyQuizzesResults);

  const labels = quizzesResults.map(quiz => quiz.quiz_name);
  const averageScores = quizzesResults.map(quiz => quiz.average_score * 100);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Average Score (%)',
        data: averageScores,
        backgroundColor: 'rgba(92, 149, 250, 0.8)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Score (%)',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Average Quizzes Scores',
      },
    },
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h5" gutterBottom>
        My Quizzes Analytics
      </Typography>
      <Box>
        <Bar data={chartData} options={options}/>
      </Box>
    </Grid>
  );
};

export default MyQuizzesAnalyticsPage;
