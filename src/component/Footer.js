import React from 'react';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <div style={{
        bottom:"0px"
    }}>

    <footer style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Notekeeper App. All rights reserved.
      </Typography>
    </footer>
    </div>
  );
}

export default Footer;
