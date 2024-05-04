import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function AttributeList(props) {
    const { attributeList, onSubmit, onDelete } = props;
    const [editingAttributeId, setEditingAttributeId] = useState(null);
    const [editedAttributeName, setEditedAttributeName] = useState('');
    const [editedAttributeValue, setEditedAttributeValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [attributeToDelete, setAttributeToDelete] = useState(null);

    useEffect(() => {
        if (editingAttributeId !== null) {
            const attributeToEdit = attributeList.find(attribute => attribute.id === editingAttributeId);
            if (attributeToEdit) {
                setEditedAttributeName(attributeToEdit.name);
                setEditedAttributeValue(attributeToEdit.value);
            }
        }
    }, [editingAttributeId, attributeList]);

    const handleEditAttribute = (attributeId, attributeName, attributeValue) => {
        setEditingAttributeId(attributeId);
    };

    const handleCancelEdit = () => {
        setEditingAttributeId(null);
        setEditedAttributeName('');
        setEditedAttributeValue('');
        setErrorMessage('');
    };

    const handleSaveEdit = (attributeId, editedAttributeName, editedAttributeValue) => {
        if (!editedAttributeName || !editedAttributeValue) {
            setErrorMessage('Please enter both name and value for the attribute');
            return;
        }
        if (onSubmit) {
            onSubmit({ attributeId, name: editedAttributeName, value: editedAttributeValue });
        }
        setEditingAttributeId(null);
        setEditedAttributeName('');
        setEditedAttributeValue('');
        setErrorMessage('');
    };

    const handleDeleteAttribute = (attribute) => {
        setAttributeToDelete(attribute);
        setShowDeleteModal(true);
    };

    const confirmDeleteAttribute = () => {
        if (onDelete && attributeToDelete) {
            onDelete(attributeToDelete);
        }
        setShowDeleteModal(false);
        setAttributeToDelete(null);
    };

    const cancelDeleteAttribute = () => {
        setShowDeleteModal(false);
        setAttributeToDelete(null);
    };

    return (
        <>
            <Typography variant="h6" component="div" sx={{ mt: 4, mb: 2 }}>
                Attribute List
            </Typography>
            {attributeList && attributeList.length ? (
                <List >
                    {attributeList.map((attribute) => (
                        <ListItem key={attribute.id} sx={{ paddingX: 0 }}>
                            {editingAttributeId === attribute.id ? (
                                <Grid container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="Attribute name"
                                            variant="standard"
                                            value={editedAttributeName}
                                            onChange={(e) => setEditedAttributeName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="Attribute value"
                                            variant="standard"
                                            value={editedAttributeValue}
                                            onChange={(e) => setEditedAttributeValue(e.target.value)}
                                        />
                                        {errorMessage && <p>{errorMessage}</p>}
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" onClick={() => handleSaveEdit(attribute.id, editedAttributeName, editedAttributeValue)} variant="contained">Save</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color="error" onClick={handleCancelEdit} >Cancel</Button>
                                    </Grid>
                                </Grid>


                            ) : (
                                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                    <Grid item>  <Typography>{attribute.name}</Typography></Grid>
                                    <Grid item> <Typography>{attribute.value}</Typography></Grid>

                                    <Grid item>  <IconButton onClick={() => handleEditAttribute(attribute.id, attribute.name, attribute.value)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => handleDeleteAttribute(attribute)} edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                                    </Grid>
                                </Grid>
                            )}
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No attributes found.</Typography>
            )}

            <Dialog open={showDeleteModal} onClose={cancelDeleteAttribute}>
                <DialogTitle>Are you sure you want to delete this attribute?</DialogTitle>
                <DialogActions>
                    <Button onClick={confirmDeleteAttribute} variant="contained" size="medium" >Yes</Button>
                    <Button onClick={cancelDeleteAttribute} variant="contained" color="error" size="medium" >No</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

AttributeList.propTypes = {
    attributeList: PropTypes.array,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default AttributeList;
