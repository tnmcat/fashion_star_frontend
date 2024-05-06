import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logOutSeller } from '../../../features/seller/sellerSlice';
import { logoSeller } from '../../../assets';

export default function SellerHeader() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const seller = useSelector((state) => state.seller.sellerInfo);
    const isLoggedIn = !!seller;
    const navigate = useNavigate();

    useEffect(() => {
        if (!seller) {
            navigate('/seller/signin');
        }
    }, [navigate, seller]);

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        dispatch(logOutSeller());
    };

    return (
        <div className="w-full bg-white border-b-2 text-amazon_blue px-4 py-1 flex justify-between items-center gap-4 sticky top-0 z-50 h-20">
            {/* Logo start */}
            <div onClick={() => navigate("/selling")} className="">
                <img className="w-[9rem] h-[6rem] mt-0" src={logoSeller} alt="logo-dasboard"></img>
            </div>
            {/* Logo end */}

            {seller ? (
                <div className='flex flex-row items-center pl-20'>
                    <img className='h-8 w-8 rounded-full mr-1' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' alt="user-avatar" />
                    <p className="text-xs text-lightText font-light">
                        Hello, {seller.sellerName}
                    </p>
                </div>
            ) : (
                <div>
                    <div onClick={() => navigate("/sellercentral/register")} className="mt-0 mr-8">
                        <button className="pt-2 pb-2 pl-4 pr-4 bg-amber-400 font-bodyFont font-bold hover hover:border-1 rounded-full">Sign up</button>
                    </div>
                    <div onClick={() => navigate("/sellercentral/signin")} className="mt-0 mr-8">
                        <button className="pt-2 pb-2 pl-4 pr-4 bg-amber-400 font-bodyFont font-bold hover hover:border-1 rounded-full">Sign in</button>
                    </div>
                </div>
            )}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
