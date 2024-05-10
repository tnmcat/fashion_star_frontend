import { Box, Button, Grid, Link, Modal, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

VariantList.propTypes = {
    variantList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func // Add onDelete prop
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function VariantList({ variantList, onSubmit, onDelete }) {
    const [editedVariants, setEditedVariants] = useState({});
    const [open, setOpen] = useState(false);

    // Set initial state to match variantList data
    useEffect(() => {
        const initialEditedVariants = {};
        variantList.forEach(variant => {
            initialEditedVariants[variant.id] = {
                skuCode: variant.skuCode,
                stockQuantity: variant.stockQuantity,
                price: variant.price,
                salePrice: variant.salePrice,
                imageDTOList: variant.imageDTOList // Add imageDTOList field
            };
        });
        setEditedVariants(initialEditedVariants);
    }, [variantList]);

    const handleInputChange = (e, variantId, property) => {
        const { value } = e.target;
        setEditedVariants(prevState => ({
            ...prevState,
            [variantId]: {
                ...prevState[variantId],
                [property]: value,
            },
        }));
    };

    const handleUpdateVariant = (variantId) => {
        const updatedVariant = editedVariants[variantId];
        if (onSubmit) {
            onSubmit(variantId, updatedVariant);
            setOpen(true); // Show modal after form submission
        }
    };

    const handleDeleteVariant = (variantId) => {
        if (onDelete) {
            onDelete(variantId);
        }
    };

    const handleClose = () => setOpen(false);

    const columns = [
        {
            field: 'skuCode',
            headerName: 'Sku Code',
            width: 130,
            renderCell: (params) => (
                <TextField
                    hiddenLabel
                    id="filled-read-only-input"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    size="small"
                    margin="dense"
                    value={editedVariants[params.id]?.skuCode || ''}
                    onChange={(e) => handleInputChange(e, params.id, 'skuCode')}
                />
            ),
        },
        {
            field: 'optionValue',
            headerName: 'Option Values',
            width: 200,
            renderCell: (params) => (
                <span>{params.row.optionValueDTOList.map((i) => (i.value + " "))}</span>
            ),
        },
        {
            field: 'stockQuantity',
            headerName: 'Stock Quantity',
            width: 130,
            type: 'number',
            renderCell: (params) => (
                <TextField
                    hiddenLabel
                    variant="standard"
                    id="filled-hidden-label-small"
                    size="small"
                    margin="dense"
                    value={editedVariants[params.id]?.stockQuantity || ''}
                    onChange={(e) => handleInputChange(e, params.id, 'stockQuantity')}
                />
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 90,
            renderCell: (params) => (
                <TextField
                    hiddenLabel
                    variant="standard"
                    id="filled-hidden-label-small"
                    size="small"
                    margin="dense"
                    value={editedVariants[params.id]?.price || ''}
                    onChange={(e) => handleInputChange(e, params.id, 'price')}
                />
            ),
        },
        {
            field: 'salePrice',
            headerName: 'Sale Price',
            type: 'number',
            width: 90,
            renderCell: (params) => (
                <TextField
                    hiddenLabel
                    variant="standard"
                    id="filled-hidden-label-small"
                    size="small"
                    margin="dense"
                    value={editedVariants[params.id]?.salePrice || ''}
                    onChange={(e) => handleInputChange(e, params.id, 'salePrice')}
                />
            ),
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => (
                <div>
                    {params.row.imageDTOList?.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Variant Image ${index}`}
                            style={{ width: 50, height: 50, marginRight: 5 }}
                        />
                    ))}
                </div>
            ),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 90,
            sortable: false,
            description: 'This column has a value getter and is not sortable.',
            renderCell: (params) => (
                <button onClick={() => handleUpdateVariant(params.id)}><EditIcon /></button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 90,
            sortable: false,
            description: 'This column has a value getter and is not sortable.',
            renderCell: (params) => (
                <button variant="contained" onClick={() => handleDeleteVariant(params.id)}><DeleteIcon /></button>
            ),
        },
    ];

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={variantList}
                    columns={columns}
                    pageSize={5}
                />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <DoneIcon /> Save Variant Successfully
                    </Typography>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </>
    );
}

export default VariantList;
