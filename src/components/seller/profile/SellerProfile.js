import React from 'react';
import PropTypes from 'prop-types';
import convertTimestampToDate from '../../../utils/common'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
SellerProfile.propTypes = {
    sellerDetail: PropTypes.object
};

function SellerProfile(props) {
    const { sellerDetail } = props;
    return (


        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Seller Name" secondary={sellerDetail.sellerName} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <EmailIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={sellerDetail.email} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LocalPhoneIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone" secondary={sellerDetail.phone} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <CalendarMonthIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Birthday" secondary={convertTimestampToDate(sellerDetail.birthDay)} />
            </ListItem>
        </List>
    );
}

export default SellerProfile;