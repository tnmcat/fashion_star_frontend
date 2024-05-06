import { Box, Breadcrumbs, Button, CssBaseline, Link, Paper, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProductsByStoreId } from '../../../features/seller_feature/product/productSlice';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

function ProductManage(props) {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.sellerStore.storeBySeller);
    const [productList, setProductList] = useState(null);
    const store_categories = useSelector((state) => state.storeCategory.storeCategoryByStoreId);
    const [editProduct, setEditProduct] = useState(null);
    // Hàm xử lý khi click vào nút "Edit"
    const handleEdit = (product) => {
        setEditProduct(product);
    };
    const fetchProducts = async () => {
        if (store && store.id) {
            try {
                const products_result = await dispatch(getProductsByStoreId(store.id));
                const products = unwrapResult(products_result);
                setProductList(products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        }
    };

    useEffect(() => {
        if (store) {
            fetchProducts();
        }
    }, [store]); // Run the effect whenever 'store' changes

    const handleAddProductFormSubmit = async (value) => {
        console.log(value);
        console.log(store.id);
        try {
            const resultAction = await dispatch(addProduct({ data: value, storeId: store.id }));
            unwrapResult(resultAction);
            // Refetch products after successfully adding a new product
            fetchProducts();
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };

    const handleEditProductFormSubmit = async (editProduct) => {
        console.log("at manage", editProduct);

        try {
            // const resultAction = await dispatch(addProduct({ data: value, storeId: store.id }));
            // unwrapResult(resultAction);
            // Refetch products after successfully adding a new product
            fetchProducts();
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate("add")
    };
    return (
        <>

            <CssBaseline />
            <Box>
                <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="/material-ui/react-breadcrumbs/"
                            aria-current="page"
                        >
                            Product
                        </Link>
                    </Breadcrumbs>
                </div>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>
                            Product Manage
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleAddClick}>Add Product</Button>

                    </Box>
                    <ProductList productList={productList} />
                </Paper>
            </Box>



            {/* {store_categories && (
                <ProductForm onSubmitAdd={handleAddProductFormSubmit} onSubmitEdit={handleEditProductFormSubmit}
                    storeCategoryList={store_categories} product={editProduct} />
            )} */}
        </>

    );
}

export default ProductManage;
