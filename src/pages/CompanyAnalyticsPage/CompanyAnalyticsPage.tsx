import React from "react";
import {Line} from 'react-chartjs-2';
import {Grid, Typography} from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {selectCompanyMembersResults} from "../../redux/analytics/selectors";
import {CompanyMembersResultsType} from "../../types/analyticsTypes";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CompanyAnalyticsPage: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const membersResults = useSelector(selectCompanyMembersResults) as CompanyMembersResultsType;

  console.log(membersResults)

  const datasets = Object.entries(membersResults)?.map(([memberId, timestamps], index) => {
    const sortedTimestamps = Object.keys(timestamps).sort();
    return {
      label: `${memberId}`,
      data: sortedTimestamps?.map(timestamp => ({
        x: timestamp,
        y: timestamps[timestamp],
      })),
      fill: false,
      borderColor: `rgba(${75 + index * 20}, 192, 192, 1)`,
      tension: 0.1,
    };
  });

  const chartData = {
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute'
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rating'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Company Ratings Over Time'
      }
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Company Analytics
        </Typography>
        <Box>
          {membersResults && <Line data={chartData} options={options}/>}
        </Box>
      </Grid>
    </>
  );
};

export default CompanyAnalyticsPage;