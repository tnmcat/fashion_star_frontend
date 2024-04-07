import React from 'react'
import { logoSeller } from "../../../assets";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SellingHeader() {
    const navigate = useNavigate();
    const sellerInfo = useSelector((state) => state.seller.sellerInfo);
    console.log(sellerInfo);


    return (
        <div className="w-full sticky top-0 z-50">
            <div className="w-full bg-white border-b-2 text-amazon_blue px-4 py-1 flex justify-between items-center gap-4 h-20 ">
                {/* Logo start */}
                <div onClick={() => navigate("/selling")} className="">
                    <img className="w-[9rem] h-[6rem] mt-0" src={logoSeller} alt="logo-dasboard"></img>
                </div>
                {/* Logo end */}
                {/* Signup start */}
                {sellerInfo ? (
                    <div className='flex flex-row items-center pl-20'>
                        {/* <img className='h-8 w-8 rounded-full mr-1' src={sellerInfo.avatar} /> */}
                        <img className='h-8 w-8 rounded-full mr-1' src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png' />
                        <p className="text-xs text-lightText font-light">
                            Hello, {sellerInfo.sellerName}
                        </p>
                    </div>

                ) : (
                    <div onClick={() => navigate("/sellercentral/signin")} className="mt-0 mr-8">
                        <button className="pt-2 pb-2 pl-4 pr-4 bg-amber-400 font-bodyFont font-bold hover hover:border-1 rounded-full">Sign in</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SellingHeader;
