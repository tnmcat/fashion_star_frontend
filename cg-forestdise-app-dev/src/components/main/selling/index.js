import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashBoard from './dashboard/DashBoard';
import SellerHome from './home/SellerHome';
import SellerHeader from './common/SellerHeader';
import SellerSideBar from './common/SellerSideBar';

function Selling1() {
    const navigate = useNavigate();
    const seller = useSelector((state) => state.seller.sellerInfo);

    useEffect(() => {
        // Check if the user is not logged in and redirect to login page
        if (!seller) {
            navigate('/seller/signin');
        }
    }, [navigate, seller]);

    if (seller) {

        return <>
            <SellerHeader />
            <SellerSideBar />
            <SellerHome seller={seller} />;

        </>// Or a loading component/message if you prefer
    }
}

export default Selling1;
