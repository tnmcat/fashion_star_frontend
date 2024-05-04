import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logOutSeller } from '../../../../features/seller/sellerSlice';

export default function SellerHeader() {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const seller = useSelector((state) => state.seller.sellerInfo);
    const isLoggedIn = !!seller;


    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogoutClick = () => {
        const action = logOutSeller();
        dispatch(action)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" >Seller</Link>
                        <Link to="/selling/products" >Products</Link>
                    </Typography>
                    <NavLink to="/selling/products">Products </NavLink>
                    <NavLink>Category </NavLink>
                    <NavLink>Orders </NavLink>
                    <NavLink to="/">   <Button color="inherit">Hello, {seller && seller.sellerName}</Button></NavLink>
                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClick}>
                            <AccountCircle />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}
