import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEditingStores, sendEditStoreReply } from '../../../features/seller_feature/store/storeProcessSlice';
import EditingStoreList from './EditingStoreList';

function StoreProcess() {
    const dispatch = useDispatch();


    const [editingStores, setEditingStores] = useState([]);


    const fetchStores = async () => {
        try {
            // Fetch stores by seller ID
            const storesResult = await dispatch(getEditingStores());
            const stores = unwrapResult(storesResult);
            // Set the first store in the array as the currently edited store
            setEditingStores(stores);
            console.log(editingStores);
        } catch (error) {
            console.error("Failed to fetch stores:", error);
        }
    };

    const handleRequest = async (storeId, reply) => {
        try {
            console.log(storeId, reply, "parenr")
            await dispatch(sendEditStoreReply({ storeId, reply }));
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchStores();
    }, [dispatch]);

    return (
        <div>

            {editingStores && <EditingStoreList editingStores={editingStores} onSubmit={handleRequest} />}
        </div>
    );
}

export default StoreProcess;
