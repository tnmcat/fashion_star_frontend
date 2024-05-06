import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddressList from './AddressList';
import { useSelector, useDispatch } from 'react-redux';
import { createSellerAddress, fetchAddressesBySellerId } from '../../../features/seller_feature/address/addressSlice'; // Import the fetchAddressesByUserId action
import { unwrapResult } from '@reduxjs/toolkit';
import AddressForm from './AddressForm'; // Import the AddressForm component

ShippingManage.propTypes = {
    // Define any props if needed
};

function ShippingManage(props) {
    const dispatch = useDispatch();
    const [addressList, setAddressList] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const seller = useSelector((state) => state.seller.sellerInfo);

    const fetchAddresses = async () => {
        try {
            const result = await dispatch(fetchAddressesBySellerId(seller.id));
            const addresses = unwrapResult(result);
            setAddressList(addresses);
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
            // Handle error here, e.g., display an error message to the user
        }
    };

    useEffect(() => {
        if (seller) {
            fetchAddresses();
        }
    }, [seller]);

    const handleCreateAddressFormSubmit = async (value) => {
        // Fetch addresses again after submitting the form
        console.log(value)
        const result = await dispatch(createSellerAddress({ sellerId: seller.id, addressData: value }));
        await fetchAddresses();
        setShowModal(false); // Close the modal after form submission
    };

    const handleCreateAddressClick = () => {
        setShowModal(true); // Show the modal when creating a new address
    };

    return (
        <div>
            <h2>Addresses:</h2>
            <button onClick={handleCreateAddressClick}>Create new</button>
            {/* Pass addresses and handleAddressFormSubmit as props to AddressList */}
            <AddressList addresses={addressList} reloadAddressList={fetchAddresses} />
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <AddressForm onSubmit={handleCreateAddressFormSubmit} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShippingManage;
