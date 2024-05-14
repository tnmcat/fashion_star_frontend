import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Modal, TableCell, TableContainer, Table, TableHead, TableBody, TableRow, Typography, TextField, IconButton, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ImageUploadForm from './ImageUploadForm';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { firebaseStorage } from '../../../firebase';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { v4 } from "uuid";
import { useDispatch } from 'react-redux';
import { deleteImage } from '../../../features/seller_feature/image/imageSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ClearIcon from '@mui/icons-material/Clear';
VariantList.propTypes = {
    variantList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func
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
    const [openRowId, setOpenRowId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const initialEditedVariants = {};
        variantList.forEach(variant => {
            initialEditedVariants[variant.id] = {
                skuCode: variant.skuCode,
                stockQuantity: variant.stockQuantity,
                price: variant.price,
                salePrice: variant.salePrice,
                imageDTOList: variant.imageDTOList
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
        console.log(updatedVariant)
        if (onSubmit) {
            onSubmit(variantId, updatedVariant);
            // Reset firebaseFiles to empty array
            setFirebaseFiles([]);
        }
    };



    const handleDeleteVariant = (variantId) => {
        if (onDelete) {
            onDelete(variantId);
        }
    };

    const handleRowClick = (variantId) => {
        setOpenRowId(openRowId === variantId ? null : variantId);
    };


    //file handle
    const [firebaseFiles, setFirebaseFiles] = useState([]); // State to hold uploaded image URLs
    const [progressPercent, setProgressPercent] = useState(0);
    const handleFiles = (e, variantId) => {
        const files = e.target.files;
        const uploadTasks = [];
        const urls = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = ref(firebaseStorage, `files/${file.name} + ${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTasks.push(uploadTask);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        urls.push(downloadURL);
                        if (urls.length === files.length) {
                            setFirebaseFiles(urls);
                            setEditedVariants(prevState => ({
                                ...prevState,
                                [variantId]: {
                                    ...prevState[variantId],
                                    imageDTOList: urls,
                                },
                            }));
                        }
                    });
                }
            );
        }
    };


    const handleDeletePicture = async (imageId, variantId) => {
        try {
            console.log(imageId)
            const resultAction = await dispatch(deleteImage(imageId));
            unwrapResult(resultAction);
            setEditedVariants(prevState => {
                const updatedVariants = { ...prevState };
                updatedVariants[variantId].imageDTOList = updatedVariants[variantId].imageDTOList.filter(image => image.id !== imageId);
                return updatedVariants;
            });
        } catch (err) {
            console.error('Failed to delete Attribute:', err);
        }
    }

    return (
        <>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sku Code</TableCell>
                            <TableCell>Option Values</TableCell>
                            <TableCell>Stock Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Sale Price</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {variantList.map(variant => (
                            <React.Fragment key={variant.id}>
                                <TableRow onClick={() => handleRowClick(variant.id)}>
                                    <TableCell>
                                        <TextField
                                            hiddenLabel
                                            InputProps={{ readOnly: true }}
                                            variant="filled"
                                            size="small"
                                            margin="dense"
                                            value={editedVariants[variant.id]?.skuCode || ''}
                                            onChange={(e) => handleInputChange(e, variant.id, 'skuCode')}
                                        />
                                    </TableCell>
                                    <TableCell>{variant.optionValueDTOList.map(i => (i.value + " "))}</TableCell>
                                    <TableCell>
                                        <TextField
                                            hiddenLabel
                                            variant="standard"
                                            size="small"
                                            margin="dense"
                                            value={editedVariants[variant.id]?.stockQuantity || ''}
                                            onChange={(e) => handleInputChange(e, variant.id, 'stockQuantity')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            hiddenLabel
                                            variant="standard"
                                            size="small"
                                            margin="dense"
                                            value={editedVariants[variant.id]?.price || ''}
                                            onChange={(e) => handleInputChange(e, variant.id, 'price')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            hiddenLabel
                                            variant="standard"
                                            size="small"
                                            margin="dense"
                                            value={editedVariants[variant.id]?.salePrice || ''}
                                            onChange={(e) => handleInputChange(e, variant.id, 'salePrice')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                        >
                                            {openRowId === variant.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleUpdateVariant(variant.id)}><EditIcon /></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => handleDeleteVariant(variant.id)}><DeleteIcon /></Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                        <Collapse in={openRowId === variant.id} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Table size="small" aria-label="purchases">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                <div className='text-titleFont mt-5'>
                                                                    <label htmlFor="files" className='mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-5'>Variant Pictures</label>
                                                                    <br />
                                                                    <input type="file" name="files" onChange={(e) => handleFiles(e, variant.id)} multiple className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " />

                                                                    {firebaseFiles.map((url, index) => (
                                                                        <div>
                                                                            <ClearIcon style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                                                            <img key={index} alt={`product_image_${index}`} src={url} className="rounded-3xl w-30 h-30 mt-10" />

                                                                        </div>
                                                                    ))}
                                                                    {!firebaseFiles.length && <div className='outerbar'><div className='innerbar text-titleFont'>{progressPercent}%</div></div>}


                                                                </div>
                                                            </TableCell>

                                                        </TableRow>
                                                        {editedVariants[variant.id]?.imageDTOList?.length > 0 && (
                                                            <TableRow>
                                                                {editedVariants[variant.id].imageDTOList.map((image, index) => (
                                                                    <TableCell key={index}>
                                                                        <img
                                                                            key={index}
                                                                            src={image.imgPath}
                                                                            alt={`Variant Image ${index}`}
                                                                            style={{ width: 'auto', height: '50%' }} // Adjust the height as needed
                                                                        />
                                                                        <ClearIcon onClick={() => handleDeletePicture(image.id, variant.id)} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        )}

                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default VariantList;
