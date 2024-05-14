import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Box, Breadcrumbs, CssBaseline, Link, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import AddProductForm from './AddProductForm';
import AttributeManage from '../attribute/AttributeManage';
import OptionManage from '../option/OptionManage';
import VariantManage from '../variant/VariantManage';
import { addProduct, sendNeedCheckProduct } from '../../../features/seller_feature/product/productSlice';

export default function ProductAdd() {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.sellerStore.storeBySeller);
    const productAdded = useSelector((state) => state.product.productAdded);

    const handleAddProductFormSubmit = async (value) => {
        console.log('Adding product with value:', value);
        console.log('Store ID:', store.id);
        try {
            const resultAction = await dispatch(addProduct({ data: value, storeId: store.id }));
            const product = unwrapResult(resultAction);
            console.log('Product added successfully:', product);
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };

    const handleSendNeedCheck = async () => {
        if (productAdded && productAdded.id) {
            console.log('Sending product for check with ID:', productAdded.id);
            try {
                const resultAction = await dispatch(sendNeedCheckProduct(productAdded.id));
                const product = unwrapResult(resultAction);
                console.log('Product sent for check successfully:', product);
            } catch (err) {
                console.error('Failed to send product for check:', err);
            }
        } else {
            console.error('No product to send for check.');
        }
    };

    console.log('Current productAdded state:', productAdded);

    return (
        <>
            <CssBaseline />
            <Box>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link underline="hover" color="text.primary" href="/material-ui/react-breadcrumbs/">
                            Product
                        </Link>
                        <Link underline="hover" color="text.primary" href="/material-ui/react-breadcrumbs/" aria-current="page">
                            Add
                        </Link>
                    </Breadcrumbs>
                </div>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                            Basic Information
                        </AccordionSummary>
                        <AccordionDetails>
                            <AddProductForm onSubmitAdd={handleAddProductFormSubmit} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                            Detail Information
                        </AccordionSummary>
                        <AccordionDetails>
                            {productAdded && <AttributeManage productId={productAdded.id} />}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                            Option
                        </AccordionSummary>
                        <AccordionDetails>
                            {productAdded && <OptionManage productId={productAdded.id} />}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
                            Product Variant
                        </AccordionSummary>
                        <AccordionDetails>
                            {productAdded && <VariantManage productId={productAdded.id} />}
                        </AccordionDetails>
                        <AccordionActions>
                            <Button onClick={handleSendNeedCheck}>Complete and Wait for Admin confirm</Button>
                        </AccordionActions>
                    </Accordion>
                </Paper>
            </Box>
        </>
    );
}
