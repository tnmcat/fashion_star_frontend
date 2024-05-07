import React from "react";
import Header from "../components/main/payment/Header";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-200 h-screen">
            <Header />
            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5">
                        <CheckCircleIcon className="text-green-500 h-10" />
                        <h1 className=" text-2xl text-amazon_blue">
                            Thank you, your order has been confirmed
                        </h1>
                    </div>
                    <p className="text-amazon_blue text-sm">
                        Thank you for shopping with us. We' ll send a
                        confirmation once your item has shipped, if you would
                        like to check the status of your order(s) please press
                        the link below
                    </p>
                    <button
                        onClick={() => navigate("/order")}
                        className="w-full  text-white sm:text-xs md:text-md lg:text-lg bg-gradient-to-tr bg-indigo-700 hover:bg-indigo-500 duration-200 py-1.5 rounded-xl mt-3"
                    >
                        {/* <FontAwesomeIcon
                            icon={faWheelchairMove}
                            size="3x"
                            style={{marginRight: "10px"}}
                        /> */}
                        Return your Orders
                        {/* <FontAwesomeIcon
                            icon={faWheelchairMove}
                            size="3x"
                            style={{marginLeft: "10px"}}
                        /> */}
                    </button>
                    <div className="flex text-center pt-3">
                        {/* <FontAwesomeIcon
                            icon={faPersonPraying}
                            size="3x"
                            style={{marginRight: "10px"}}
                        />
                        <h2 className=" text-red-700 border-l">
                            {" "}
                            Cầu cho con đậu môn Project
                        </h2> */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Success;
