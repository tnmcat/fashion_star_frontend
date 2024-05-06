import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../features/seller_feature/product/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ProductForm from './ProductForm';
import { Box, Breadcrumbs, CssBaseline, Link, Paper, Tab, Tabs } from '@mui/material';
import AttributeForm from '../attribute/AttributeForm';
import AttributeManage from '../attribute/AttributeManage';
import { set } from 'react-hook-form';
import OptionManage from '../option/OptionManage';
import VariantManage from '../variant/VariantManage';

ProductAddPage.propTypes = {

};

function ProductAddPage(props) {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.sellerStore.storeBySeller);
    const productAdded = useSelector((state) => state.product.productInfo);
    const handleAddProductFormSubmit = async (value) => {
        console.log(value);
        console.log(store.id);
        try {
            const resultAction = await dispatch(addProduct({ data: value, storeId: store.id }));
            const product = unwrapResult(resultAction);
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };
    console.log(productAdded);
    const [tabValue, setTabValue] = useState('1');
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
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
                            Add
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
                        <ProductForm onSubmitAdd={handleAddProductFormSubmit} />)}

                    {tabValue === '2' && (
                        <>
                            <AttributeManage productId={productAdded.id} />
                        </>
                    )}
                    {tabValue === '3' && (
                        <>
                            <OptionManage productId={productAdded.id} />
                        </>
                    )}
                    {tabValue === '4' && (
                        <>
                            <VariantManage productId={productAdded.id} />
                        </>
                    )}
                </Paper>
            </Box>
            <Box>


            </Box>
        </div>
    );
}

export default ProductAddPage;