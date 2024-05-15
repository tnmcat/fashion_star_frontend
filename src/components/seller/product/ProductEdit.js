import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Breadcrumbs, CssBaseline, Link, Paper, Tab, Tabs } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { getProductById, updateProduct } from '../../../features/seller_feature/product/productSlice';
import AttributeManage from '../attribute/AttributeManage';
import OptionManage from '../option/OptionManage';
import VariantManage from '../variant/VariantManage';
import EditProductForm from './EditProductForm';
import AttributeList from '../attribute/AttributeList';

function ProductEdit() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState('1');

    const fetchProduct = async () => {
        if (productId) {
            try {
                console.log(productId);
                const product_result = await dispatch(getProductById(productId));
                const product = unwrapResult(product_result);
                setProduct(product);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        }
    };

    console.log(product);
    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleEditProductFormSubmit = async (value) => {
        try {
            const resultAction = await dispatch(updateProduct({ productId: productId, data: value }));
            const product = unwrapResult(resultAction);
            setProduct(product); // Update product state after successful update
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CssBaseline />
            <Box>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link underline="hover" color="text.primary" href="#">
                            Product
                        </Link>
                        <Link underline="hover" color="text.primary" href="#" aria-current="page">
                            Edit
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
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Basic Information" value="1" />
                        <Tab label="Attribute" value="2" />
                        <Tab label="Variant" value="3" />
                    </Tabs>

                    {tabValue === '1' && (
                        <EditProductForm onSubmitEdit={handleEditProductFormSubmit} product={product} />
                    )}
                    {tabValue === '2' && (
                        <AttributeList product={product} />
                    )}
                    {tabValue === '3' && (
                        <VariantManage product={product} />
                    )}
                </Paper>
            </Box>
        </div>
    );
}

export default ProductEdit;
