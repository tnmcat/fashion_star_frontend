import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
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

        </List>
    );
}

export default StoreDetail;