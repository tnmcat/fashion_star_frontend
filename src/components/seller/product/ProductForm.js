import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firebaseStorage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";
import { Box, Breadcrumbs, Button, CssBaseline, Divider, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { addProduct } from '../../../features/product/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';

ProductForm.propTypes = {
    onSubmitAdd: PropTypes.func, // Hàm xử lý khi thêm sản phẩm
    onSubmitEdit: PropTypes.func, // Hàm xử lý khi chỉnh sửa sản phẩm
    //  storeCategoryList: PropTypes.array,
    product: PropTypes.object // Dữ liệu sản phẩm cần chỉnh sửa (nếu có)
};

function ProductForm(props) {
    const { onSubmitAdd, onSubmitEdit, product } = props;
    const [isEditMode, setIsEditMode] = useState(false); // Biến để xác định chế độ chỉnh sửa
    const storeCategoryList = useSelector((state) => state.storeCategory.storeCategoryByStoreId);
    const [firebaseFile, setFirebaseFile] = useState('');
    const [progresspercent, setProgresspercent] = useState(0);
    const store = useSelector((state) => state.sellerStore.storeBySeller);
    const handleFile = (e) => {

        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(firebaseStorage, `files/${file.name} + ${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL);
                        setFirebaseFile(downloadURL);
                    });
                }
            );
        }

    }


    // Define schema for validation
    const schema = yup.object().shape({
        title: yup.string().required('Please enter product name'),
        storeCategoryId: yup.string().required('Please select a category'),
        description: yup.string().required('Please enter product description'),
        file: yup.mixed().required('Please upload an image'),
    });

    // Initialize useForm hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: product // Sử dụng dữ liệu sản phẩm nếu có để điền vào các trường mặc định
    });

    // Xác định xem có phải là chế độ chỉnh sửa hay không
    useEffect(() => {
        setIsEditMode(!!product); // Nếu có dữ liệu sản phẩm, đang ở chế độ chỉnh sửa
    }, [product]);

    // Xử lý sự kiện gửi biểu mẫu
    const onSubmitHandler = (data) => {
        console.log('form submitted', data);
        if (isEditMode) {
            if (onSubmitEdit) {
                onSubmitEdit(data);
            }
        } else {
            if (onSubmitAdd) {
                const formDataWithFile = { ...data, mainPicture: firebaseFile };
                console.log(formDataWithFile);
                console.log(firebaseFile);
                // Submit the form data with the firebaseFile URL
                onSubmitAdd(formDataWithFile);
            }
        }
    };

    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>


                    <form onSubmit={handleSubmit(onSubmitHandler)}>

                        <br />
                        <TextField style={{ width: '100%' }} {...register("title")} id="standard-basic" label="Product Title" variant="standard" />
                        <p>{errors.title?.message}</p>
                        <br />

                        <TextField id="outlined-multiline-static"
                            multiline style={{ width: '100%' }}
                            rows={4}
                            defaultValue="Default Value" {...register("description")} label="Product Description" variant="standard" />
                        <p>{errors.description?.message}</p>
                        <br />
                        {storeCategoryList && storeCategoryList.length ? (
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Store Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Store Category"
                                    {...register("storeCategoryId")}
                                    defaultValue="" // Set default value as empty string
                                >
                                    {storeCategoryList.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <p>No store category found.</p>
                        )}
                        <p>{errors.storeCategoryId?.message}</p>


                        <br />
                        <div className='text-titleFont mt-5'>
                            <label htmlFor="file" className='mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-5'>Image</label>
                            <br></br>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                type="file" name="file"
                                {...register("file")}
                                onChange={handleFile}
                            />
                            <small className='text-red-700 text-titleFont'>
                                {errors?.file && errors.file.message}
                            </small>
                            {firebaseFile && <img alt='product_image' src={firebaseFile} className="rounded-3xl w-30 h-30 mt-10" />}
                            {
                                !firebaseFile &&
                                <div className='outerbar'>
                                    <div className='innerbar text-titleFont'>{progresspercent}%</div>
                                </div>
                            }
                        </div>
                        {/* <button type="submit">{isEditMode ? 'Save Changes' : 'Add Product'}</button> */}

                        <Box marginTop={2}>
                            <Button variant="contained" type="submit">Save</Button>
                        </Box>

                    </form>
                </Paper>
            </Box>

        </>
    );
}

export default ProductForm;
