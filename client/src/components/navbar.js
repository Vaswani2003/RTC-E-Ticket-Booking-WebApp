import {AppBar, Typography, Box} from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';


export default function Navbar() {
    return(
        <AppBar position="static" sx={{ bgcolor: '#B7C8F4',height:'55px'}}>
        <Box display="flex" justifyContent="space-around" p={1}>
        <Box display="flex">
        <ContactPhoneIcon fontSize="large"sx={{ mr: 1 }}/>
        <Typography variant="h6" color="black" >Support Number : 996622143</Typography>
        </Box>
        <Box display="flex">
        <EmailIcon fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="h6" color="black" >Support email : support@email</Typography>
        </Box>
        </Box>
    </AppBar>
    );
}
