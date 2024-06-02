import React, {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import {Button,Box, Typography,Container, Paper, List, ListItem} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Slider from "react-slick";
import './dashboard.css';

//images
import city from '../media/city.jpg';
import bridge from '../media/bridge.jpg'; 
import night from '../media/night.jpg';


// -----------------------------------------------------------------------------------------------//


export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/ticketslist')
            .then(response => response.json())
            .then(data => setTickets(data));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };


    // -----------------------------------------------------------------------------------------------//
    

    return (
        <div className='tickets-page'>

        <Container sx={{width:"100%", height:"100vh", marginTop:"10px", bgcolor:"white", borderRadius:'15px'}}>

            <Container sx={{display:"flex", justifyContent:"space-between"}}>

                <Typography variant="h6" align="center" style={{marginTop: '20px', marginBottom: '20px'}}>RTC Hyderabad</Typography>

                <div style={{display:"flex", justifyContent:"space-beyween", marginTop: '20px', marginBottom: '20px'}}>

                    <Button onClick={()=> Navigate('/dashboard')} style={{ margin: '0 30px', fontSize: '15px', color: 'black' }}>Book Ticket</Button>
                    <Button style={{ margin: '0 30px', fontSize: '15px', color: 'black' }}>Where am I ?</Button>
                    <Button style={{ margin: '0 30px', fontSize: '15px', color: 'black' }}>FaQ</Button>

                </div>

                <AccountCircleIcon style={{fontSize: 40 ,marginTop: '17px' }}></AccountCircleIcon>

            </Container>

            <Container sx={{position:'relative', width:"100%", height:"85vh", marginTop:"10px", bgcolor:"white", borderRadius:'15px', border: 'none'}} >
            
            <Slider {...settings}>

                <div>
                    <img src={city} alt="city" style={{ width: '100%', height: '85vh', borderRadius:'10px' }} ></img>
                </div>
                <div>
                    <img src={night} alt="city" style={{ width: '100%', height: '85vh', borderRadius:'10px' }} ></img>
                </div>
                <div>
                    <img src={bridge} alt="city" style={{ width: '100%', height: '85vh', borderRadius:'10px' }} ></img>
                </div>

            </Slider>

            <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, color: '#fff', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            
            <Container maxWidth='sm'>
            
                <Paper elevation={3} sx={{ padding: 2, bgcolor:"rgb(11,48,93)" }}>

                <Typography variant="h4" align="center" style={{color: 'white'}}>Tickets</Typography>

                    <List>
                    {tickets.map((ticket, index) => (
                        <ListItem key={index}>
                            <Box bgcolor="white" p={2} borderRadius={2} style={{display:"flex", width: '700px', justifyContent:"space-between"}}>
                                <img src={ticket.qrCodeDataUrl} style={{ width: '100px', height: '100px' }} alt={`QR Code for ticket ${ticket.ticketID}`} />
                                <div>
                                    <div style={{display:"flex", justifyContent:"space-around"}}>
                                    <Typography>Route ID: {ticket.routeID}</Typography>
                                    <Typography>Fare Price: {ticket.farePrice}</Typography>
                                    </div>
                                    <div style={{ position: 'relative', right: '-30px', marginTop: '10px'}}>
                                    <Typography>Ticket ID: {ticket.ticketID}</Typography>
                                    <Typography>Timestamp: {ticket.timestamp}</Typography>
                                    
                                    </div>
                                </div>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                
                </Paper>
            </Container >
           
            </div>

            </Container>
            </Container>
        </div>
    );
}