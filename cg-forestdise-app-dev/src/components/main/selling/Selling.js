import React from 'react'
import NavBar from './NavBar'
import { useSelector } from 'react-redux';

function Selling({ children }) {
    const sellerInfo = useSelector((state) => state.seller.sellerInfo);

    return (
        <div>
            <div className="">
                {sellerInfo ? <NavBar />: <></>}
                <div className=" p-4 bg-gray-200">
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export default Selling
