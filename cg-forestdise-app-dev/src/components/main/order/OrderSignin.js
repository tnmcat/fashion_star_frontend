import React from "react";
import {Link} from "react-router-dom";

const OrderSignin = () => {
    return (
        <div className="w-64 mx-auto text-center flex flex-col gap-1">
            <p className="text-sm">Your Order is there!!!</p>
            <Link to="/signin">
                <button
                    className="w-full text-white bg-indigo-600 rounded-md py-1
font-semibold cursor-pointer hover:bg-indigo-500 active:bg-indigo-700"
                >
                    Sign in
                </button>
            </Link>
            <p className="text-xs mt-1">
                New Customer?
                <Link to="/register">
                    <span className="text-indigo-600 ml-1 cursor-pointer">
                        {" "}
                        Start here.
                    </span>
                </Link>
            </p>
        </div>
    );
};

export default OrderSignin;
