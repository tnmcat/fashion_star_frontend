import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, IconButton, List, ListItem, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
function OptionList(props) {
    const { optionList, onSubmit } = props;
    const [editingOptionId, setEditingOptionId] = useState(null);
    const [editedOptionName, setEditedOptionName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (editingOptionId !== null) {
            const optionToEdit = optionList.find(option => option.id === editingOptionId);
            if (optionToEdit) {
                setEditedOptionName(optionToEdit.name);
            }
        }
    }, [editingOptionId, optionList]);

    const handleEditOption = (optionId, optionName) => {
        setEditingOptionId(optionId);
    };

    const handleCancelEdit = () => {
        setEditingOptionId(null);
        setEditedOptionName('');
        setErrorMessage('');
    };

    const handleSaveEdit = (optionId, editedOptionName) => {
        if (!editedOptionName) {
            setErrorMessage('Please enter an option name');
            return;
        }
        if (onSubmit) {
            onSubmit({ optionId, optionName: editedOptionName });
        }
        setEditingOptionId(null);
        setEditedOptionName('');
        setErrorMessage('');
    };

    return (
        <>
            {optionList && optionList.length ? (
                <List>
                    {optionList.map((option) => (
                        <ListItem key={option.id} sx={{ paddingX: 0 }}>
                            {editingOptionId === option.id ? (
                                <Grid container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center">
                                    <Grid item>   <TextField
                                        id="standard-basic"
                                        label="Option name"
                                        variant="standard"
                                        value={editedOptionName}
                                        onChange={(e) => setEditedOptionName(e.target.value)}
                                    />
                                        {errorMessage && <p>{errorMessage}</p>}</Grid>
                                    <Grid item>  <Button size="small" variant="contained" onClick={() => handleSaveEdit(option.id, editedOptionName)}>Save</Button>
                                    </Grid>
                                    <Grid item> <Button size="small" variant="contained" color="error" onClick={handleCancelEdit}>Cancel</Button></Grid>

                                </Grid>
                            ) : (
                                <Grid container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center">
                                    <Grid item><Typography>{option.name}</Typography></Grid>
                                    <Grid item> <IconButton onClick={() => handleEditOption(option.id, option.name)}><EditIcon /></IconButton>
                                    </Grid>

                                </Grid>
                            )}
                        </ListItem>
                    ))}
                </List>
            ) : (
                <p>No options found.</p>
            )}
        </>
    );
}

OptionList.propTypes = {
    optionList: PropTypes.array,
    onSubmit: PropTypes.func,
};

export default OptionList;
