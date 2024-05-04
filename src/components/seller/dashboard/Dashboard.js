import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

Dashboard.propTypes = {

};

function Dashboard(props) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;