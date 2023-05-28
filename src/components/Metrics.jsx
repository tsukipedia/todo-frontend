import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useGetMetricsQuery } from '../redux/slices/ApiSlice'

const MetricsContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function Metrics() {
  const { data: metrics } = useGetMetricsQuery()

  return (
    <MetricsContainer sx={{ flexGrow: 1, padding: 0.5 }} mb={3} mt={6}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          Average time to finish tasks:
        </Grid>
        <Grid item xs={6}>
          Average Time to finish tasks by priority
        </Grid>
        <Grid item xs={6}>
          {metrics.averageTime}
        </Grid>
        <Grid item xs={6}>
          <ol style={{ listStyle: 'none' }}>
            <li>HIGH: {metrics.highPriorityAverageTime}</li>
            <li>MEDIUM: {metrics.mediumPriorityAverageTime}</li>
            <li>LOW: {metrics.lowPriorityAverageTime}</li>
          </ol>
        </Grid>
      </Grid>
    </MetricsContainer>
  );
}
