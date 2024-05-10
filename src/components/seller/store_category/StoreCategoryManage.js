import CloseIcon from '@mui/icons-material/Close';
import { Box, Breadcrumbs, Button, CssBaseline, Dialog, DialogContent, DialogTitle, IconButton, Link, Paper, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../features/seller_feature/category/categorySlice';
import { addStoreCategory, getStoreCategoriesByStoreId } from '../../../features/seller_feature/store_category/storeCategorySlice';
import StoreCategoryForm from './StoreCategoryForm';
import StoreCategoryList from './StoreCategoryList';
function StoreCategoryManage(props) {
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.seller.sellerInfo);
    const store = useSelector((state) => state.sellerStore.storeBySeller);
    const [storeCategoryList, setStoreCategoryList] = useState(null);
    const [categoryList, setCategoryList] = useState(null);

    const fetchStoreCategories = async () => {
        if (store && store.id) {
            try {
                const store_cate_result = await dispatch(getStoreCategoriesByStoreId(store.id));
                const store_categories = unwrapResult(store_cate_result);
                setStoreCategoryList(store_categories);
                const cate_result = await dispatch(getAllCategories());
                const categories = unwrapResult(cate_result);
                setCategoryList(categories);
            } catch (error) {
                console.error("Failed to fetch store categories:", error);
            }
        }
    };
    const fetchCategories = async () => {
        if (store && store.id) {
            try {
                const cate_result = await dispatch(getAllCategories());
                const categories = unwrapResult(cate_result);
                setCategoryList(categories);
            } catch (error) {
                console.error("Failed to fetch store categories:", error);
            }
        }
    };
    useEffect(() => {
        fetchCategories();
        if (store) {
            fetchStoreCategories();
        }
    }, [dispatch, store]); // Added dispatch and store to the dependency array

    const handleStoreFormSubmit = async (value) => {
        console.log(value)
        console.log(store.id)
        try {
            const resultAction = await dispatch(addStoreCategory({ data: value, storeId: store.id }));
            unwrapResult(resultAction);
            // Refetch store categories after successfully adding a new category
            fetchStoreCategories();
            setOpenModal(false);
        } catch (err) {
            console.error('Failed to add store category:', err);
        }
    };
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    console.log(categoryList)
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
                            Category
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
                        <Typography variant="h5" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>Store Category Manage</Typography> {/* Thêm margin-top và margin-bottom */}
                        <Button variant="contained" color="primary" onClick={handleOpenModal}>Add Store Category</Button>
                    </Box>
                    <StoreCategoryList storeCategoryList={storeCategoryList}
                        onSubmit={handleStoreFormSubmit} categoryList={categoryList}
                    />
                </Paper>
            </Box>
            {/* Modal */}

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Store Category
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {/* Thêm form ở đây */}
                    <StoreCategoryForm onSubmit={handleStoreFormSubmit} categoryList={categoryList} />
                </DialogContent>
            </Dialog>

        </>
    );
}

export default StoreCategoryManage;
