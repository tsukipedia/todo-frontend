import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useGetMetricsQuery } from '../redux/slices/ApiSlice'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export function Metrics() {
  const { data: metrics, isLoading } = useGetMetricsQuery()

  return (
    <Paper sx={{ padding: 1, textAlign: 'center', flexGrow: 1 }} mb={3} mt={10}>
      < Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>
            Average time to finish tasks:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            Average time to finish tasks by priority:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {isLoading ? "Loading..." : metrics.averageTime}
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText>
                HIGH: {isLoading ? "Loading..." : metrics.highPriorityAverageTime} 
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                MEDIUM: {isLoading ? "Loading..." : metrics.mediumPriorityAverageTime}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                LOW: {isLoading ? "Loading..." : metrics.highPriorityAverageTime}
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper >
  );
}
