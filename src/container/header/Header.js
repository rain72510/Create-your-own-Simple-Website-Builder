import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./Header.css"

const Header = () => {
    return (
        <AppBar position="static" style={{width: "auto", background: 'rgb(43, 62, 99)' }}>
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                Create Your Own
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;