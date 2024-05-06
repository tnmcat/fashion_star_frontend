import PropTypes from 'prop-types';
import React from 'react';
import OptionValueDetail from './OptionValueManage';
import OptionValueManage from './OptionValueManage';
import { Divider, List, ListItem, Paper } from '@mui/material';

OptionValue.propTypes = {
    optionList: PropTypes.array,
    onCreateRawVariants: PropTypes.func,
};

function OptionValue({ optionList }) {
    console.log(optionList);

    return (
        <>
            {optionList && optionList.length ? (
                <List>
                    {optionList.map((option) => (
                        <Paper sx={{ marginY: 2 }} key={option.id}>
                            <ListItem >
                                <OptionValueManage option={option} />
                            </ListItem>
                        </Paper>
                    ))}
                </List >

            ) : (
                <p>No values found.</p>
            )}
        </>

    );
}

export default OptionValue;
