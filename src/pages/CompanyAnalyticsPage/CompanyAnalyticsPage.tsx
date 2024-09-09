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
import {selectCompanyMembersResults, selectError} from "../../redux/analytics/selectors";
import {CompanyMembersResultsType} from "../../types/analyticsTypes";
import {diffColors} from "../../utils/diffColors";
import {selectCompanyById} from "../../redux/companies/selectors";

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
  const membersResults = useSelector(selectCompanyMembersResults) as CompanyMembersResultsType;
  const company = useSelector(selectCompanyById);
  const error = useSelector(selectError);

  const datasets = Object.entries(membersResults).map(([memberId, timestamps], index) => {
    const sortedTimestamps = Object.keys(timestamps).sort();
    return {
      label: `${memberId}`,
      data: sortedTimestamps.map(timestamp => ({
        x: timestamp,
        y: timestamps[timestamp] * 100,
      })),
      fill: false,
      borderColor: diffColors[index % diffColors.length],
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
          text: 'Rating, %'
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
        <Typography variant="h6">"{company?.name}"</Typography>
        {!error &&
          <Box>
            {membersResults && <Line data={chartData} options={options}/>}
          </Box>
        }
      </Grid>
    </>
  );
};

export default CompanyAnalyticsPage;
