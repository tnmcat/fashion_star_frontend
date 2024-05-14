import React from 'react';
import PropTypes from 'prop-types';
import { Box, Breadcrumbs, CssBaseline, Link, Paper, Typography, useTheme } from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';

Dashboard.propTypes = {

};

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00'),
];


function Dashboard(props) {
  const theme = useTheme();
  return (
    <>

      <CssBaseline />
      <Box>
        <div role="presentation" >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/react-breadcrumbs/"
              aria-current="page"
            >
              Dashboard
            </Link>
          </Breadcrumbs>
        </div>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>
              Sale Analyst
            </Typography>
          </Box>

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>

              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          </Box>
        </Paper>
      </Box>





    </>
  );
}

export default Dashboard;