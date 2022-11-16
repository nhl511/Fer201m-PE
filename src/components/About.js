import { Box, Card, Grid, IconButton, Typography, CardMedia } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

function About() {
  return (
    <Grid container pt={20}>
        <Grid item xs={6} align="left" pl={20}>
            <Typography gutterBottom variant="h3" style={{color:'white'}}>
                HELLO!
            </Typography>
            <Typography variant="body2" style={{color:'white'}}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pe
            </Typography>
            <Box pt={5}>
                <IconButton><FacebookIcon style={{color:'white'}}/></IconButton>
                <IconButton><YouTubeIcon style={{color:'white'}}/></IconButton>

                <IconButton><GitHubIcon style={{color:'white'}}/></IconButton>

            </Box>
        </Grid>
        <Grid item xs={6}>
            <Card sx={{ maxWidth:500 }} style={{background:'transparent'}}>
                <img src="assets/images/dev2.png" width="300"/>
            </Card>
            </Grid>
    </Grid>
  )
}

export default About
