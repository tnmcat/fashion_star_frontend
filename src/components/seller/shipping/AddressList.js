import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateAddress, deleteAddress } from '../../../features/seller_feature/address/addressSlice'; // Import the deleteAddress action
import { unwrapResult } from '@reduxjs/toolkit';
import AddressForm from './AddressForm'; // Assuming you have an AddressForm component for editing addresses

AddressList.propTypes = {
    addresses: PropTypes.array,
    reloadAddressList: PropTypes.func.isRequired,
};

function AddressList({ addresses, reloadAddressList }) {
    const [editAddress, setEditAddress] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const dispatch = useDispatch();

    const handleEditAddressClick = (address) => {
        setEditAddress(address);
    };

    const handleDeleteAddressClick = (address) => {
        setDeleteConfirmation(address);
    };

    const handleCloseForm = () => {
        setEditAddress(null);
    };

    const handleEditAddressFormSubmit = async (addressData) => {
        try {
            const { id, ...data } = addressData; // Extract id from addressData
            console.log(addressData);
            const resultAction = await dispatch(updateAddress({ addressId: id, addressData: data })); // Pass addressId and addressData
            unwrapResult(resultAction);
            handleCloseForm(); // Close the modal after successful update
            reloadAddressList(); // Reload the address list
        } catch (err) {
            console.error('Failed to update address:', err);
            // Handle error here, e.g., display an error message to the user
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const resultAction = await dispatch(deleteAddress(deleteConfirmation.id)); // Delete the address
            unwrapResult(resultAction);
            reloadAddressList(); // Reload the address list after deletion
            setDeleteConfirmation(null); // Close the confirmation dialog
        } catch (err) {
            console.error('Failed to delete address:', err);
            // Handle error here, e.g., display an error message to the user
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmation(null); // Close the confirmation dialog
    };

    return (
        <div>
            <ul>
                {addresses.map(address => (
                    <li key={address.id}>
                        <p>Street: {address.street}</p>
                        <p>City: {address.city}</p>
                        <p>District: {address.district}</p>
                        <p>Ward: {address.ward}</p>
                        <button onClick={() => handleEditAddressClick(address)}>Edit</button>
                        <button onClick={() => handleDeleteAddressClick(address)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editAddress && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseForm}>&times;</span>
                        <AddressForm
                            initialData={editAddress}
                            onSubmit={handleEditAddressFormSubmit}
                        />
                    </div>
                </div>
            )}
            {deleteConfirmation && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to delete this address?</p>
                    <button onClick={handleConfirmDelete}>Yes</button>
                    <button onClick={handleCancelDelete}>No</button>
                </div>
            )}
        </div>
    );
}

export default AddressList;
