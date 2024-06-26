import React from "react";
import {logoSeller} from "../../../assets";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Header() {
    const navigate = useNavigate();
    const sellerInfo = useSelector((state) => state.seller.sellerInfo);
    console.log(sellerInfo);

    return (
        <div className="w-full bg-white border-b-2 text-amazon_blue px-4 py-1 flex justify-between items-center gap-4 sticky top-0 z-50 h-20">
            {/* Logo start */}
            <div onClick={() => navigate("/selling")} className="">
                <img
                    className="w-[9rem] h-[6rem] mt-0"
                    src={logoSeller}
                    alt="logo-dasboard"
                ></img>
            </div>
            {/* Logo end */}

            {sellerInfo ? (
                <div className="flex flex-row items-center pl-20">
                    {/* <img className='h-8 w-8 rounded-full mr-1' src={sellerInfo.avatar} /> */}
                    <img
                        className="h-8 w-8 rounded-full mr-1"
                        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                    />
                    <p className="text-xs text-lightText font-light">
                        Hello, {sellerInfo.sellerName}
                    </p>
                </div>
            ) : (
                <div>
                    <div
                        onClick={() => navigate("/sellercentral/register")}
                        className="mt-0 mr-8"
                    >
                        <button className="pt-2 pb-2 pl-4 pr-4 bg-indigo-80000 font-bodyFont font-bold hover hover:border-1 rounded-full">
                            Sign up
                        </button>
                    </div>
                    <div
                        onClick={() => navigate("/sellercentral/signin")}
                        className="mt-0 mr-8"
                    >
                        <button className="pt-2 pb-2 pl-4 pr-4 bg-indigo-800 font-bodyFont font-bold hover hover:border-1 rounded-full">
                            Sign in
                        </button>
                    </div>
                </div>
            )}
            {/* Signin end */}
        </div>
    );
}

export default Header;
