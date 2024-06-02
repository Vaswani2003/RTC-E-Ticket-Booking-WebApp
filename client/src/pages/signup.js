import React, { useState } from 'react';
import Navbar from '../components/navbar';
import {Typography, Container, TextField, Button, Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './styles.css';

// -----------------------------------------------------------------------------------------------//

export default function Signup() {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleNameChange = (event) => {
        setname(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setpassword(event.target.value);
    }

    const handleMailchange = (event) => { 
        setemail(event.target.value);
    }  

    // -----------------------------------------------------------------------------------------------//

    const handleSignin = async () => {
        const response = await fetch('http://localhost:5000/signup', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
        });

        if (response.ok) {
            navigate('/');
        }
        else{
            alert('Signup failed!');
        }
    };

    // -----------------------------------------------------------------------------------------------//

    return (
        <div>
        <Navbar />

        <div className="content-with-background-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 55px)' }}>
        
        <Container maxWidth="sm">
            
            <Paper elevation={3} sx={{ padding: 2, bgcolor:"rgb(227, 227, 227)" }}>
            
            <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
                
                <AccountCircleIcon color="secondary" style={{fontSize:"50px", alignSelf: 'center'}}/>

                <Typography variant='h6' style={{color: 'black', alignSelf: 'center', marginLeft: 8}}>Sign-Up</Typography>
                
                <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Full Name</Typography>
                <TextField label="Name" value={name} onChange={handleNameChange} required variant="outlined" fullWidth margin="normal" />

                <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Email ID</Typography>
                <TextField label="Email" value={email} onChange={handleMailchange} required variant="outlined" fullWidth margin="normal" />

                <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Password</Typography>
                <TextField label="Password" value={password} onChange={handlePasswordChange} required variant="outlined" fullWidth margin="normal" type="password" />

                <Button variant="contained" color="primary" onClick={handleSignin} sx={{ width: '50%', margin:2, alignSelf: 'center' }} type="button"> Sign - Up </Button>
            
            </form>
            </Paper>
        </Container>
        </div>

        </div>
    );
}