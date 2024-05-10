import React, { useState } from 'react';
import PropTypes from 'prop-types';

EditingStoreList.propTypes = {
    editingStores: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
};

function EditingStoreList({ editingStores, onSubmit }) {
    const [formData, setFormData] = useState({ status: '', reason: '' });

    const handleApprove = (storeId) => {
        const updatedFormData = { ...formData, status: 'APPROVE' };
        onSubmit(storeId, updatedFormData);
    };

    const handleReject = (storeId) => {
        const updatedFormData = { ...formData, status: 'REJECT' };
        onSubmit(storeId, updatedFormData);
    };

    const handleReasonChange = (e) => {
        const reason = e.target.value;
        setFormData({ ...formData, reason });
    };

    return (
        <div>
            <h2>Editing Stores</h2>
            <ul>
                {editingStores.map(store => (
                    <li key={store.id}>
                        <div>
                            <h3>{store.name}</h3>
                            <h3>{store.editingName}</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Reason"
                                    value={formData.reason}
                                    onChange={handleReasonChange}
                                />
                                <button onClick={() => handleApprove(store.id)}>Approve</button>
                                <button onClick={() => handleReject(store.id)}>Reject</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EditingStoreList;
