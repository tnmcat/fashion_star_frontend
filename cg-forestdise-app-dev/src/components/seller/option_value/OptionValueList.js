import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, IconButton, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
function OptionValueList(props) {
    const { optionValueList, onSubmit } = props;
    const [editingOptionValueId, setEditingOptionValueId] = useState(null);
    const [editedOptionValue, setEditedOptionValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (editingOptionValueId !== null) {
            const optionValueToEdit = optionValueList.find(optionValue => optionValue.id === editingOptionValueId);
            if (optionValueToEdit) {
                setEditedOptionValue(optionValueToEdit.value);
            }
        }
    }, [editingOptionValueId, optionValueList]);

    const handleEditOptionValue = (optionValueId, optionValue) => {
        setEditingOptionValueId(optionValueId);
    };

    const handleCancelEdit = () => {
        setEditingOptionValueId(null);
        setEditedOptionValue('');
        setErrorMessage('');
    };

    const handleSaveEdit = (optionValueId, editedOptionValue) => {
        if (!editedOptionValue) {
            setErrorMessage('Please enter an option value');
            return;
        }
        if (onSubmit) {
            onSubmit({ optionValueId, value: editedOptionValue });
        }
        setEditingOptionValueId(null);
        setEditedOptionValue('');
        setErrorMessage('');
    };

    return (
        <>
            {optionValueList && optionValueList.length ? (
                <List>
                    {optionValueList.map((optionValue) => (
                        <ListItem key={optionValue.id} >
                            {editingOptionValueId === optionValue.id ? (
                                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="Value"
                                            variant="standard"
                                            value={editedOptionValue}
                                            onChange={(e) => setEditedOptionValue(e.target.value)}
                                        />
                                        {errorMessage && <p>{errorMessage}</p>}
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" onClick={() => handleSaveEdit(optionValue.id, editedOptionValue)}><DoneIcon /></Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color="error" onClick={handleCancelEdit}><CloseIcon /></Button>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography>{optionValue.value}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => handleEditOptionValue(optionValue.id, optionValue.value)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )}
                        </ListItem>
                    ))}
                </List>
            ) : (
                <p>No values found.</p>
            )}
        </>
    );
}

OptionValueList.propTypes = {
    optionValueList: PropTypes.array,
    onSubmit: PropTypes.func,
};

export default OptionValueList;
