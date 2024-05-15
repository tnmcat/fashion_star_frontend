import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Breadcrumbs, CssBaseline, Link, Paper } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import { unwrapResult } from '@reduxjs/toolkit';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, sendNeedCheckProduct } from '../../../features/seller_feature/product/productSlice';
import OptionManage from '../option/OptionManage';
import VariantManage from '../variant/VariantManage';
import AddProductForm from './AddProductForm';

import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';

import Typography from '@mui/material/Typography';
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
                if (product) {
                    setOpen(true)
                }
            } catch (err) {
                console.error('Failed to send product for check:', err);
            }
        } else {
            console.error('No product to send for check.');
        }
    };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    // console.log('Current productAdded state:', productAdded);

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
                    {productAdded && (
                        <>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                                    Option
                                </AccordionSummary>
                                <AccordionDetails>
                                    <OptionManage product={productAdded} />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
                                    Product Variant
                                </AccordionSummary>
                                <AccordionDetails>
                                    <VariantManage product={productAdded} />
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button onClick={handleSendNeedCheck}>Complete and Wait for Admin confirm</Button>
                                </AccordionActions>
                            </Accordion>
                        </>
                    )}
                </Paper>
            </Box>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Product sent for check successfully
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Please wait for admin confirm.
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    );
}
