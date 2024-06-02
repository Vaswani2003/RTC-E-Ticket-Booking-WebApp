import './styles.css';
import {useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Typography,Link, Container, TextField, Button, Paper,  Checkbox, FormControlLabel,} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../components/navbar';


// -----------------------------------------------------------------------------------------------//


export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }   

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    // -----------------------------------------------------------------------------------------------//

    const handleLogin = async () => {
        const response = await fetch('http://localhost:5000/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username: username,
                password: password
            
            })
        });

        const data = await response.json();

        if (data.success) {
            navigate('/dashboard');
        }
        else{
            alert('Login failed!');
        }
    }

    // -----------------------------------------------------------------------------------------------//


    return (
        <div>
        <Navbar />

        <div className="content-with-background-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 55px)' }}>

        <Container maxWidth="sm">
            
            <Paper elevation={3} sx={{ padding: 2, bgcolor:"rgb(227, 227, 227)" }}>
            
            <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
                
                <AccountCircleIcon color="secondary" style={{fontSize:"50px", alignSelf: 'center'}}/>

                <Typography variant='h6' style={{color: 'black', alignSelf: 'center', marginLeft: 8}}>Log-In</Typography>

                <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Email ID</Typography>
                <TextField label="Email" value={username} onChange={handleUsernameChange} required variant="outlined" fullWidth margin="normal" />

                <Typography variant='body1' align='left' style={{color: 'black',marginLeft: 8}}>Password</Typography>
                <TextField label="Password" value={password} onChange={handlePasswordChange} required variant="outlined" fullWidth margin="normal" type="password" />

                <FormControlLabel control={<Checkbox />} label="Remember me?" />

                <Button variant="contained" onClick={handleLogin} color="primary"  sx={{ width: '50%', margin:2, alignSelf: 'center' }} type="button"> Log-In </Button>

                <Link component="button" variant="body2" onClick={() => { navigate('/signup');}}> Don't have an account? Click here ! </Link>
                
            </form>
            </Paper>
        </Container>

        </div>
        </div>
    );
}
