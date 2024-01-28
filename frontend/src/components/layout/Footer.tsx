import React from 'react';
import { Box, Container, Typography, IconButton, Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter'; // Import icons as needed
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
// ... import other social media icons

export const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'transparent', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" color="#fff" gutterBottom>
              AQUA
            </Typography>
            <Typography variant="subtitle1" color="#fff">
              © {new Date().getFullYear()} AQUA Protocol
            </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="Twitter" color="primary">
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Facebook" color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="primary">
              <InstagramIcon />
            </IconButton>
            {/* Add more social media icons as needed */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

