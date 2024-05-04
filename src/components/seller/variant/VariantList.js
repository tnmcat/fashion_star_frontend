import { Button, Link, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
VariantList.propTypes = {
    variantList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func // Add onDelete prop
};

function VariantList({ variantList, onSubmit, onDelete }) {
    const [editedVariants, setEditedVariants] = useState({});

    // Set initial state to match variantList data
    useEffect(() => {
        const initialEditedVariants = {};
        variantList.forEach(variant => {
            initialEditedVariants[variant.id] = {
                skuCode: variant.skuCode,
                stockQuantity: variant.stockQuantity,
                price: variant.price,
                salePrice: variant.salePrice,
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
        }
    };

    const handleDeleteVariant = (variantId) => {
        if (onDelete) {
            onDelete(variantId);
        }
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'skuCode', headerName: 'Sku Code', width: 130,
            renderCell: (params) => (
                <TextField hiddenLabel variant="standard"
                    id="filled-hidden-label-small"
                    size="small" margin="dense"
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
            field: 'stockQuantity', headerName: 'Stock Quantity', width: 130, type: 'number',
            renderCell: (params) => (
                <TextField hiddenLabel variant="standard"
                    id="filled-hidden-label-small"
                    size="small" margin="dense"
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
                <TextField hiddenLabel variant="standard"
                    id="filled-hidden-label-small"
                    size="small" margin="dense"
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
                <TextField hiddenLabel variant="standard"
                    id="filled-hidden-label-small"
                    size="small" margin="dense"
                    value={editedVariants[params.id]?.salePrice || ''}
                    onChange={(e) => handleInputChange(e, params.id, 'salePrice')}
                />
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
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                // checkboxSelection
                />
            </div>

        </>
    );
}

export default VariantList;
