import React from 'react';
import PropTypes from 'prop-types';

StoreDetail.propTypes = {
    store: PropTypes.object
};

function StoreDetail({ store }) {
    return (
        <div>
            <h1>Store name: {store.name}</h1>
        </div>
    );
}

export default StoreDetail;