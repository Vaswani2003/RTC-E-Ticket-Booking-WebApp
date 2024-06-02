const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const qrcode = require('qrcode');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;

// -----------------------------------------------------------------------------------------------//

let Routes;

try {
    const fileContent = fs.readFileSync('bus_routes.json', 'utf-8');
    Routes = JSON.parse(fileContent).routes;
}
catch (error) {
    console.error('Error reading or parsing file', error);
}

// -----------------------------------------------------------------------------------------------//


function addUser(name, email, password) {
    let users;
    try {
        users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    } catch (error) {
        console.error('Error reading or parsing users.json', error);
        users = [];
    }

    users.push({ name, email, password });
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}


// -----------------------------------------------------------------------------------------------//

function checkUser(email, password) {
    let users;
    try {
        users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    } catch (error) {
        console.error('Error reading or parsing users.json', error);
        return false;
    }

    const user = users.find(user => user.email === email);
    
    if (!user) {
        console.error('User not found');
        return false;
    }

    const match =  users.find(user => user.password === password);
    if (!match) {
        console.error('Incorrect password');
        return false;
    }

    return true;
}

// -----------------------------------------------------------------------------------------------//


async function issueTicket(routeID, farePrice, ticketID) {
    let tickets;

    try {
        tickets = JSON.parse(fs.readFileSync('tickets.json', 'utf-8'));
    }
    catch (error) {
        console.error('Error reading or parsing tickets.json', error);
        tickets = [];
    }
    const ticketDataString = [routeID, farePrice.toString(), ticketID].join(',');
    const qrCodeDataUrl = await qrcode.toDataURL(ticketDataString);
    const timestamp = new Date().toISOString();

    tickets.push({ routeID, farePrice, ticketID, qrCodeDataUrl, timestamp });

    fs.writeFileSync('tickets.json', JSON.stringify(tickets, null, 2));
}


// -----------------------------------------------------------------------------------------------//


function calculateFarePrice(fromIndex, toIndex) {
    const distance = Math.abs(toIndex - fromIndex)/ 2; 

    if (distance >= 25) {
        return 35;
    } else if (distance >= 20) {
        return 30;
    } else if (distance >= 15) {
        return 25;
    } else if (distance >= 10) {
        return 20;
    } else {
        return 15;
    }
}


// -----------------------------------------------------------------------------------------------//


app.get('/ticketslist', (req, res) => {
    fs.readFile(path.join(__dirname, 'tickets.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while reading the tickets file.');
        } else {
            res.send(JSON.parse(data));
        }
    });
});


// -----------------------------------------------------------------------------------------------//



app.post('/bus-routes', (req, res) => {
    try{
    const { from, to } = req.body;

    console.log(`Received request with from: ${from} and to: ${to}`);

    if (!from || !to) {
        return res.status(400).json({ message: 'Both "from" and "to" fields are required.' });
    }

    const matchingRouteIds = [];

    Routes.forEach(route => {
        console.log(`Checking route: ${route.route_id}`);

        const fromStop = route.stops.find(stop => stop.stop_name === from);
        const toStop = route.stops.find(stop => stop.stop_name === to);

        if (fromStop && toStop) {
            console.log(`Found stops: fromStop - ${fromStop.stop_name}, toStop - ${toStop.stop_name}`);
            const farePrice = calculateFarePrice(fromStop.stop_no, toStop.stop_no);
            const ticket_id = uuidv4();  
            matchingRouteIds.push({ route_id: route.route_id, fare_price: farePrice, ticket_id });

            issueTicket(route.route_id, farePrice, ticket_id);
            
        } else {
            console.log(`Stops not found for route ${route.route_id}: fromStop - ${fromStop}, toStop - ${toStop}`);
        }
    });

    if (matchingRouteIds.length === 0) {
        return res.status(404).json({ message: 'No matching routes found.' });
    }

    res.json(matchingRouteIds);
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
}
);


// -----------------------------------------------------------------------------------------------//

app.post('/login', (req,res)=>{
    const {username, password} = req.body;
    console.log(`Login request received for ${username}`);
    if (checkUser(username, password)) {
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
});


// -----------------------------------------------------------------------------------------------//


app.post('/signup', (req,res)=>{
    const {name, email, password} = req.body;
    console.log(`Signup request received for ${name}, ${email}`);
    addUser(name, email, password);
    res.send(`Signup successful, added user ${name}, ${email}`);
});


// -----------------------------------------------------------------------------------------------//


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});


// -----------------------------------------------------------------------------------------------//