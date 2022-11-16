import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'

function Contact() {
  return (
    <Grid container pt={15}>
        <Grid item xs={12}>
            <Typography variant="h3" style={{color:'white'}}>
                <b>I'd <FavoriteIcon fontSize="large" style={{color:'red'}}/> to help!</b>
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <img src="https://images.vexels.com/media/users/3/136553/isolated/preview/c315314f865458b657940a0729a77949-people-head-contact-icon.png" width="600"/>
        </Grid>
        <Grid item xs={6} pt={10}>
            <Card sx={{maxWidth:600}} style={{background: '#242526'}}>
                <CardContent align="left">
                    <Grid item mb={2}>
                <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth               color="warning"
              focused/>
                </Grid>
                <Grid item mb={2}>
                <TextField id="outlined-basic" label="LastName" variant="outlined" fullWidth               color="warning"
              focused/>
                </Grid>
                <Grid item mb={2}>
                <TextField id="outlined-basic" label="What's your email" variant="outlined" fullWidth               color="warning"
              focused/>
                </Grid>
                <Grid item mb={4}>
                <TextField multiline rows={5} label="Your question..." variant="outlined" fullWidth               color="warning"
              focused/>
                </Grid>
                <Grid item mb={2}>
                    <Button fullWidth variant="contained" color="warning">Send</Button>
                </Grid>

                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default Contact
