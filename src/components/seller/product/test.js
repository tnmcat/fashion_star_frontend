import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseStorage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";
import { Box, Button, FormControl, InputLabel, Modal, NativeSelect, Paper, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

ProductForm.propTypes = {
    onSubmitAdd: PropTypes.func,
    onSubmitEdit: PropTypes.func,
    product: PropTypes.object
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

function ProductForm(props) {
    const { onSubmitAdd, onSubmitEdit, product } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const storeCategoryList = useSelector((state) => state.storeCategory.storeCategoryByStoreId);
    const [firebaseFile, setFirebaseFile] = useState('');
    const [firebaseFiles, setFirebaseFiles] = useState([]); // State to hold uploaded image URLs
    const [progressPercent, setProgressPercent] = useState(0);
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

    const handleFiles = (e) => {
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
                        }
                    });
                }
            );
        }
    };

    const schema = yup.object().shape({
        title: yup.string().required('Please enter product name')
            .min(3, 'Product name must be at least 3 characters')
            .max(30, 'Product name must be at most 30 characters'),
        storeCategoryId: yup.string().required('Please select a category'),
        description: yup.string().required('Please enter product description').min(30, 'Product name must be at least 30 characters')
            .max(500, 'Product name must be at most 500 characters'),
        file: yup.mixed().required('Please upload an image'),
        files: yup.mixed().required('Please upload an image'),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: product || {}
    });

    useEffect(() => {
        setIsEditMode(!!product);
        if (product) {
            Object.entries(product).forEach(([key, value]) => {
                setValue(key, value);
            });
            setFirebaseFile(product.mainPicture);
        }
    }, [product, setValue]);

    const onSubmitHandler = (data) => {
        if (isEditMode) {
            if (onSubmitEdit) {
                const formDataWithFile = { ...data, mainPicture: firebaseFile, imageList: firebaseFiles };
                onSubmitEdit(formDataWithFile);
            }
        } else {
            if (onSubmitAdd) {
                const formDataWithFile = { ...data, mainPicture: firebaseFile, imageList: firebaseFiles };
                console.log(formDataWithFile)
                onSubmitAdd(formDataWithFile);
            }
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <br />
                        <TextField style={{ width: '100%' }} {...register("title")} required variant='filled' id="outlined-required" label="Title" error={!!errors.title} helperText={errors.title?.message} defaultValue="" />
                        <br />
                        <TextField id="outlined-multiline-static" multiline style={{ width: '100%' }} rows={4} defaultValue=" " {...register("description")} label="Product Description" variant="standard" />
                        <br />
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Store Category</InputLabel>
                            <NativeSelect {...register("storeCategoryId")} defaultValue="" inputProps={{ name: 'storeCategoryId', id: 'uncontrolled-native' }}>
                                {storeCategoryList.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                        <div className='text-titleFont mt-5'>
                            <label htmlFor="file" className='mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-5'>Main Picture</label>
                            <br></br>
                            <input  {...register("file")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " type="file" name="file" {...register("file")} onChange={handleFile} />
                            <small className='text-red-700 text-titleFont'>
                                {errors?.file && errors.file.message}
                            </small>
                            {firebaseFile && <img alt='product_image' src={firebaseFile} className="rounded-3xl w-30 h-30 mt-10" />}
                            {!firebaseFile && <div className='outerbar'><div className='innerbar text-titleFont'>{progresspercent}%</div></div>}
                        </div>
                        <div className='text-titleFont mt-5'>
                            <label htmlFor="files" className='mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-5'>Product Pictures</label>
                            <br />
                            <input  {...register("files")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " type="file" name="files" {...register("files")} onChange={handleFiles} multiple />
                            <small className='text-red-700 text-titleFont'>{errors?.files && errors.files.message}</small>
                            {firebaseFiles.map((url, index) => (
                                <img key={index} alt={`product_image_${index}`} src={url} className="rounded-3xl w-30 h-30 mt-10" />
                            ))}
                            {!firebaseFiles.length && <div className='outerbar'><div className='innerbar text-titleFont'>{progressPercent}%</div></div>}
                        </div>
                        <Box marginTop={2}>
                            <Button variant="contained" type="submit">Save</Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
            {/* <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Success!</Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>Save Product Successfully</Typography>
                </Box>
            </Modal> */}
        </>
    );
}

export default ProductForm;
