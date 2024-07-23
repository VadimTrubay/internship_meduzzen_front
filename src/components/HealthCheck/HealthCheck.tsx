import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {getHealthCheck} from '../../api/api_healthcheck';
import {HealthCheckTypes} from '../../types/healthCheckTypes';
import {LinearProgress} from "@mui/material";

const HealthCheck: React.FC = () => {
  const [healthCheckData, setHealthCheckData] = useState<HealthCheckTypes | null>(null);

  useEffect(() => {
    const fetchHealthCheck = async () => {
      try {
        const response = await getHealthCheck();
        setHealthCheckData(response.data);
      } catch (error) {
        console.error('Error fetching health check data:', error);
      }
    };

    fetchHealthCheck();
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        component="div"
        style={{
          textAlign: 'center',
        }}
      >
        Congratulations! 🎉 You did it!
      </Typography>
      {healthCheckData ? (
        <div>
          <p>Status Code: {healthCheckData.status_code}</p>
          <p>Detail: {healthCheckData.detail}</p>
          <p>Result: {healthCheckData.result}</p>
        </div>
      ) : (
        <div>
          <LinearProgress/>
        </div>
      )}
    </div>
  );
};

export default HealthCheck;