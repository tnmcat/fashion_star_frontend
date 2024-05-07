import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import OrderSignin from "./OrderSignin";
import OrderDetail from "./OrderDetail";
import {getHistoryOrder} from "../../../features/order/orderSlice";
import Footer from "../payment/Footer";

const UserOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.user);
    const orders = useSelector((state) => state.order.order);
    useEffect(() => {
        if (userInfo) {
            dispatch(getHistoryOrder(userInfo.id));
        }
    }, [navigate, dispatch, userInfo]);

    return (
        <div>
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl text-amazon_light border-b mb-2 pb-1 border-indigo-600">
                    Your Orders
                </h1>
                {userInfo ? (
                    <>
                        <h2>Orders</h2>
                        <div className="mt-5 space-y-4">
                            {orders &&
                                orders.map((item) => (
                                    <>
                                        <React.Fragment key={item.id}>
                                            <OrderDetail order={item} />
                                        </React.Fragment>
                                    </>
                                ))}
                        </div>
                    </>
                ) : (
                    <OrderSignin />
                )}
            </main>
        </div>
    );
};

export default UserOrder;
