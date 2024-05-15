import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StoreIcon from '@mui/icons-material/Store';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';
StoreDetail.propTypes = {
    store: PropTypes.object
};

function StoreDetail({ store }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <StoreIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Store Name" secondary={store.name} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FormatListBulletedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Store Description" secondary={store.description} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Store Logo" />
            </ListItem>
            <ListItem>
                <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={store.logo} alt={store.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </ListItem>

        </List>
    );
}

export default StoreDetail;