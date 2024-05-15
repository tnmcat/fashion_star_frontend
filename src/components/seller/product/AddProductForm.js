import { yupResolver } from "@hookform/resolvers/yup";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Grid, List, ListItemButton, ListItemText, Modal, Paper, TextField, Typography } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from "uuid";
import * as yup from "yup";
import { getAllCategories, getAllMainCategories, getAllParentCategories } from '../../../features/seller_feature/category/categorySlice';
import { firebaseStorage } from '../../../firebase';
AddProductForm.propTypes = {
    onSubmitAdd: PropTypes.func,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, // Increase the width here
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function AddProductForm(props) {
    const { onSubmitAdd, product } = props;
    const [firebaseFile, setFirebaseFile] = useState('');
    const [progresspercent, setProgresspercent] = useState(0);
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(firebaseStorage, `files/${file.name} + ${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFirebaseFile(downloadURL);
                    });
                }
            );
        }
    }

    const schema = yup.object().shape({
        title: yup.string().required('Please enter product name')
            .min(3, 'Product name must be at least 3 characters')
            .max(30, 'Product name must be at most 30 characters'),
        categoryId: yup.string().required('Please select a category'),
        description: yup.string().required('Please enter product description').min(30, 'Product name must be at least 30 characters')
            .max(500, 'Product name must be at most 500 characters'),
        file: yup.mixed().required('Please upload an image'),

    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        dispatch(getAllMainCategories());
    }, [setValue]);

    const onSubmitHandler = (data) => {
        if (onSubmitAdd) {
            const formDataWithFile = {
                ...data,
                categoryId: selectedCategoryId,
                mainPicture: firebaseFile,
                attributes: defaultAttributes.map((attribute, index) => ({
                    name: data.attributes[index]?.name || attribute.name,
                    value: data.attributes[index]?.value || attribute.value
                }))
            };
            console.log("send form data", formDataWithFile);
            onSubmitAdd(formDataWithFile);
        }
    };

    const dispatch = useDispatch()
    const handleDeleteMainPicture = (productId) => () => {
        console.log(productId)
    }


    //subcate area
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const handleOpenCategoryDropdown = () => {
        setOpen(true);
    };

    // Define states to store selected categories
    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [selectedParentCategory, setSelectedParentCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryNames, setSelectedCategoryNames] = useState('');


    // Define functions to handle category selection
    const handleMainCategoryChange = (mainCategoryId) => {
        setSelectedMainCategory(mainCategoryId);
        setSelectedParentCategory(null);
        setSelectedCategory(null);
        setSelectedCategoryNames(''); // Reset selected category names
        dispatch(getAllParentCategories(mainCategoryId));
    };

    const handleParentCategoryChange = (parentCategoryId) => {
        setSelectedParentCategory(parentCategoryId);
        setSelectedCategory(null);
        setSelectedCategoryNames(''); // Reset selected category names
        dispatch(getAllCategories(parentCategoryId));
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedCategoryNames(''); // Reset selected category names
        // Find the selected category names from categoryList
        const mainCategoryName = mainCategoryList.find(category => category.id === selectedMainCategory)?.name;
        const parentCategoryName = parentCategoryList.find(category => category.id === selectedParentCategory)?.name;
        const categoryObj = categoryList.find(category => category.id === categoryId);
        if (mainCategoryName && parentCategoryName && categoryObj) {
            setSelectedCategoryNames(`${mainCategoryName} > ${parentCategoryName} > ${categoryObj.name}`);
        }
    };

    // Get category lists from Redux store
    const mainCategoryList = useSelector(state => state.category.mainCategories);
    const parentCategoryList = useSelector(state => state.category.parentCategories);
    const categoryList = useSelector(state => state.category.categories);

    // Function to handle modal open
    const [open, setOpen] = useState(false);


    // Function to handle modal close
    const handleClose = () => {
        setOpen(false);
        setSelectedCategoryNames('')
    };
    const handleConfirm = () => {
        console.log(selectedCategory);
        setSelectedCategoryId(selectedCategory)
        setDefaultAttributes(null)
        setOpen(false);
    };

    const [defaultAttributes, setDefaultAttributes] = useState();
    useEffect(() => {
        let newDefaultAttributes = [];

        switch (selectedCategoryId) {
            case 1: // Category ID 1
                newDefaultAttributes = [
                    { name: 'Manufacturer', value: '' },
                    { name: 'Processor Type', value: '' },
                    { name: 'Origin', value: '' },
                    { name: 'Screen Size', value: '' },
                    { name: 'Resolution', value: '' },
                    { name: 'Graphics Card ', value: '' },
                ];
                break;
            case 2: // Category ID 2
                newDefaultAttributes = [
                    { name: 'Manufacturer', value: '' },
                    { name: 'Origin', value: '' },
                    { name: 'Screen Size', value: '' },
                    { name: 'Resolution', value: '' },
                    { name: 'Graphics Card ', value: '' },
                ];
                break;
            case 3: // Category ID 3
                newDefaultAttributes = [
                    { name: 'CHECK', value: '' },
                    { name: 'CHECK', value: '' },
                    { name: 'CHECK', value: '' }
                ];
                break;
            // Add more cases for other category IDs if needed
            default:
                newDefaultAttributes = [];
                break;
        }

        setDefaultAttributes(newDefaultAttributes);
    }, [selectedCategoryId]);

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <br />
                        <TextField style={{ width: '100%' }} {...register("title")} required id="outlined-basic" variant="outlined" label="Title" error={!!errors.title} helperText={errors.title?.message} defaultValue="" />
                        <br />
                        <TextField id="outlined-multiline-static" multiline style={{ width: '100%' }} rows={4} defaultValue=" " {...register("description")} label="Product Description" variant="standard" />
                        <br />
                        {/* Render main category selection */}
                        <TextField
                            {...register("categoryId")}
                            style={{ width: '100%' }}
                            label="Select Category"
                            variant="outlined"
                            value={selectedCategoryNames}
                            onClick={handleOpenCategoryDropdown}
                            error={!!errors.storeCategoryId}
                            helperText={errors.storeCategoryId?.message}
                        />
                        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <Box sx={style}>
                                {/* Row 1: Categories */}
                                <Grid container >
                                    {/* Main Categories */}
                                    <Grid item xs={4}>
                                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            <List component="nav" aria-label="secondary mailbox folder">
                                                {mainCategoryList.map(mainCategory => (
                                                    <ListItemButton selected={mainCategory.id === selectedMainCategory} key={mainCategory.id} onClick={() => handleMainCategoryChange(mainCategory.id)}>
                                                        <ListItemText primary={mainCategory.name} />
                                                        <ArrowForwardIosIcon />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Box>
                                    </Grid>

                                    {/* Parent Categories */}
                                    {selectedMainCategory && (
                                        <Grid item xs={4}>
                                            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                <List component="nav" aria-label="secondary mailbox folder">
                                                    {parentCategoryList.map(parentCategory => (
                                                        <ListItemButton selected={parentCategory.id === selectedParentCategory} key={parentCategory.id} onClick={() => handleParentCategoryChange(parentCategory.id)}>
                                                            <ListItemText primary={parentCategory.name} />
                                                            <ArrowForwardIosIcon />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Box>
                                        </Grid>
                                    )}

                                    {/* Categories */}
                                    {selectedParentCategory && (
                                        <Grid item xs={4}>
                                            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                <List component="nav" aria-label="secondary mailbox folder">
                                                    {categoryList.map(category => (
                                                        <ListItemButton selected={category.id === selectedCategory} key={category.id} onClick={() => handleCategoryChange(category.id)}>
                                                            <ListItemText primary={category.name} />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>

                                {/* Row 2: Selected Categories */}
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" gutterBottom>Selected Categories: {selectedCategoryNames}</Typography>
                                    </Grid>
                                </Grid>
                                {/* Row 3: Buttons */}
                                <Grid container >
                                    <Grid item xs={6}>

                                    </Grid>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Button onClick={handleClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
                                            <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Modal>

                        <div className='text-titleFont mt-5'>
                            <label htmlFor="file" className='mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-5'>Main Picture</label>
                            <br></br>
                            <input  {...register("file")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " type="file" name="file" {...register("file")} onChange={handleFile} />
                            <small className='text-red-700 text-titleFont'>
                                {errors?.file && errors.file.message}
                            </small>
                            {firebaseFile && <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='product_image' src={firebaseFile} className="rounded-3xl w-30 h-30 mt-10" />
                                <ClearIcon onClick={() => handleDeleteMainPicture(product.id)} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                            </div>}

                            {!firebaseFile && <div className='outerbar'><div className='innerbar text-titleFont'>{progresspercent}%</div></div>}
                        </div>

                        <Typography sx={{ mt: 4, mb: 2 }} >
                            Product Feature
                        </Typography>
                        {defaultAttributes && defaultAttributes.length > 0 && (
                            defaultAttributes.map((attribute, index) => (
                                <div key={index}>
                                    <Grid container direction="row" justifyContent="space-around">
                                        <Grid item>
                                            <TextField variant="standard"
                                                {...register(`attributes[${index}].name`)}
                                                disabled

                                                fullWidth
                                                margin="normal"
                                                defaultValue={attribute.name}
                                                error={!!errors?.attributes?.[index]?.name}
                                                helperText={errors?.attributes?.[index]?.name?.message}
                                            />
                                            <p>{errors.name?.message}</p>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                {...register(`attributes[${index}].value`)}
                                                label="Value"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                defaultValue={attribute.value}
                                                error={!!errors?.attributes?.[index]?.value}
                                                helperText={errors?.attributes?.[index]?.value?.message}
                                            />
                                            <p>{errors.value?.message}</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))
                        )}


                        <Box marginTop={2}>
                            <Button variant="contained" type="submit">Save</Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </>
    );
}

export default AddProductForm;
