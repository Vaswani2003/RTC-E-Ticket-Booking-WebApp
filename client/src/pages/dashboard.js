import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import {Button, Typography,Container, Paper, MenuItem, Select} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Slider from "react-slick";
import './dashboard.css';

//images
import city from '../media/city.jpg';
import bridge from '../media/bridge.jpg'; 
import night from '../media/night.jpg';


// -----------------------------------------------------------------------------------------------//


export default function Dashboard() {

    const Navigate = useNavigate();

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

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleFromChange = (event) => {
        setFrom(event.target.value);
    }

    const handleToChange = (event) => {
        setTo(event.target.value);
    }

    // -----------------------------------------------------------------------------------------------//

    const handlePayment = async () => {
        try {
            const response = await fetch('http://localhost:5000/bus-routes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: from,
                    to: to,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.length > 0) {
                const farePrice = data[0].fare_price;
                const routeId = data[0].route_id;
                alert(`Bus Found : ${routeId}   Bus Fare : ${farePrice}\nProceed to payment?`);
                paymentDone();
            }
            else {
                alert('No matching routes found!');
            }
        }
        catch (error) {
            alert('Booking failed! ' + error.message);
        }
    };

    // -----------------------------------------------------------------------------------------------//

    const paymentDone = async () => {
        setTimeout(() => {
            Navigate('/tickets');
        }, 2000);
    }
    
    // -----------------------------------------------------------------------------------------------//

    return (
        <div className='ticket-booking-page-dashboard'>

            <Container sx={{width:"100%", height:"100vh", marginTop:"10px", bgcolor:"white", borderRadius:'15px'}}>
            <Container sx={{display:"flex", justifyContent:"space-between"}}>
                <Typography variant="h6" align="center" style={{marginTop: '20px', marginBottom: '20px'}}>RTC Hyderabad</Typography>
                <div style={{display:"flex", justifyContent:"space-beyween", marginTop: '20px', marginBottom: '20px'}}>
                    <Button onClick={()=> Navigate('/tickets')} style={{ margin: '0 30px', fontSize: '15px', color: 'black' }}>Tickets</Button>
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
                    <Typography variant="h5" align="center" color='white'
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        fontWeight:'bold', }}>Book your tickets online and go cashless!!
                    </Typography>

                    <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
                    <Typography variant="h6" align="center" color='white'
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',marginTop:'10px'}}>
                        Select Boarding Point
                    </Typography>

                    <Select id="demo-simple-select" onChange={handleFromChange} label="Age"style={{ color: 'white', width: '200px', border: '1px solid white' }}>
                        <MenuItem value={"Patancheru Bus Station"}>Patancheru Bus Station</MenuItem>
                        <MenuItem value={"Secunderabad Bus Station 2"}>Secunderabad Bus Station 2</MenuItem>
                        <MenuItem value={"Miyapur X Road"}>Miyapur X Road</MenuItem>
                    </Select>
                    </div>
    
                    <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
                    <Typography variant="h6"
                        align="center"
                        color='white'
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',marginTop:'10px'}}>
                        Select Offboard Point
                    </Typography>

                    <Select id="demo-simple-select" onChange={handleToChange} label="Age"style={{ color: 'white', width: '200px', border: '1px solid white' }}>
                        <MenuItem value={"Patancheru Bus Station"}>Patancheru Bus Station</MenuItem>
                        <MenuItem value={"Secunderabad Bus Station 2"}>Secunderabad Bus Station 2</MenuItem>
                        <MenuItem value={"Miyapur X Road"}>Miyapur X Road</MenuItem>
                    </Select>
                    </div>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                    <Button onClick={handlePayment} variant="contained" style={{width: '40%', backgroundColor:'white', color:'rgb(11,48,93)',margin:'15px', fontWeight:'bold'}}>Book Ticket</Button>
                </div>
                </Paper>
            </Container >
           
            </div>

            </Container>
            </Container>
            </div>
        
        
    );
}