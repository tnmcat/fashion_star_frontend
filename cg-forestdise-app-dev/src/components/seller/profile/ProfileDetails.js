import React from 'react';
import PropTypes from 'prop-types';
import convertTimestampToDate from '../../../utils/common'
import { Link } from 'react-router-dom';
ProfileDetails.propTypes = {
    sellerDetail: PropTypes.object
};

function ProfileDetails(props) {
    const { sellerDetail } = props;
    return (
        <div>
            <h1>Seller Profile</h1>
            {/* <p>Seller ID: {sellerDetail.id}</p> */}
            <p>Name: {sellerDetail.sellerName}</p>
            <p>Email: {sellerDetail.email}</p>
            <p>Phone: {sellerDetail.phone}</p>
            <p>BirthDay: {convertTimestampToDate(sellerDetail.birthDay)}</p>

        </div>
    );
}

export default ProfileDetails;