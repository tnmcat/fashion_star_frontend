import { Box, Breadcrumbs, CssBaseline, Link, Paper, Tab, Tabs } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../../features/seller_feature/product/productSlice';
import AttributeManage from '../attribute/AttributeManage';
import OptionManage from '../option/OptionManage';
import VariantManage from '../variant/VariantManage';
import ProductForm from './ProductForm';
function ProductEditPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchProduct = async () => {
        if (productId) {
            try {
                const product_result = await dispatch(getProductById(productId));
                const product = unwrapResult(product_result);
                setProduct(product);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        }
    };
    useEffect(() => {
        fetchProduct();
    }, [productId]);
    const [tabValue, setTabValue] = useState('1');
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    console.log(product)
    const handleEditProductFormSubmit = async (value) => {
        try {
            const resultAction = await dispatch(updateProduct({ productId: productId, data: value }));
            const product = unwrapResult(resultAction);
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };
    return (
        <div>
            <CssBaseline />
            <Box>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="/material-ui/react-breadcrumbs/"
                        >
                            Product
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="/material-ui/react-breadcrumbs/"
                            aria-current="page"
                        >
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
                        <Tab label="Option" value="3" />
                        <Tab label="Variant" value="4" />
                    </Tabs>

                    {tabValue === '1' && (
                        <ProductForm onSubmitEdit={handleEditProductFormSubmit} product={product} />)}

                    {tabValue === '2' && (
                        <>
                            <AttributeManage productId={productId} />
                        </>
                    )}
                    {tabValue === '3' && (
                        <>
                            <OptionManage productId={productId} />
                        </>
                    )}
                    {tabValue === '4' && (
                        <>
                            <VariantManage productId={productId} />
                        </>
                    )}
                </Paper>
            </Box>
            <Box>


            </Box>
        </div>
    );
}

export default ProductEditPage;
