import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {AssuredWorkload, Person } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function App() {

  
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [summary, setSummary] = useState("");
  const [label, setLabel] = useState("");
  const [goalFund, setGoalFund] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleGoalFundChange = (e) => {
    setGoalFund(e.target.value);
  };


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };
  
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hai bhai")
    axios.post("https://helpinghands-backend.onrender.com/donationcards/create", {
      
    title: title,
      label: label,
      detail: detail,
      summary: summary,
      goalFund: goalFund,
      name: name,
      phone: phone,
      location: location,
      image: image
      
     
    })
    .then((response) => {
      console.log(response)
      alert(response.data.message)
  })
  .catch((error) => {
    console.log(error);
  });

  setTitle("");
  setDetail("");
  setSummary("");
  setLabel("");
  setGoalFund("");
  setName("");
  setPhone("");
  setLocation("");
  setImage("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '97vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-photo/hand-with-coins-economy_23-2148568038.jpg?w=360&t=st=1681846575~exp=1681847175~hmac=466a680191425ebaf54500c4111a1cab93dda80244a97914226bcb1d8b1cb018)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            // height:'90vh'
          }}
          style={{ "minWidth": "100px", "maxWidth": "497px", "maxHeight": "100vh" }}

        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ minWidth: "67.6%" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              mt: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}



          >
            <Avatar sx={{ m: 1, bgcolor: 'black', color:"#FF8000" }}>
              <AssuredWorkload />
            </Avatar>
            <Typography component="h1" variant="h5">
              Donation Request
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>


              <TextField
              onChange={handleTitleChange}
                margin="normal"
                required
                fullWidth
                name="title"
                label="Title"
                type="title"
                id="title"
                value={title}
              />
              <TextField
              onChange={handleDetailChange}
                margin="normal"
                required
                fullWidth
                id="detail"
                label="Details"
                name="detail"
                autoFocus
                value={detail}
              />
              <TextField
              onChange={handleSummaryChange}
                margin="normal"
                fullWidth
                value={summary}
                name="summary"
                label="Summary"
                type="summary"
                id="summary"
              />




              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}><TextField
                onChange={handleGoalFundChange}
                  margin="normal"
                  required
                  fullWidth
                  value={goalFund}
                  name="goalFund"
                  label="Goal Fund"
                  id="goalFund"
                /></Grid>
                <Grid item xs={12} sm={6}><TextField
                  onChange={handleLabelChange}
                  margin="normal"
                  required
                  fullWidth
                  value={label}
                  name="label"
                  label="Labels"
                  id="label"
                /></Grid>
</Grid>

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <Avatar sx={{ m: 1, bgcolor: 'black', color: "#FF8000" }}> <Person /> </Avatar>
</div>
<Typography component="h1" variant="h5" style={{textAlign:"center"}}>
              Fundraiser Info
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}><TextField
                onChange={handleNameChange}
                  margin="normal"
                  required
                  value={name}
                  fullWidth
                  name="name"
                  label="Name"
                  id="name"
                /></Grid>
                <Grid item xs={12} sm={6}><TextField
                onChange={handlePhoneChange}
                  margin="normal"
                  fullWidth
                  required
                  value={phone}
                  name="phone"
                  label="Phone"
                  id="phone"
                /></Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  onChange={handleLocationChange}
                    required
                    fullWidth
                    value={location}
                    name="location"
                    label="City"
                    id="location"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  onChange={handleImageChange}
                    required
                    fullWidth
                    value={image}
                    name="image"
                    label="Image Link"
                    id="image"
                  />
                </Grid>
              </Grid>
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;