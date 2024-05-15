import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clear} from "../../../features/payment/paymentSlice";
import {clearCartLine} from "../../../features/cart/cartSlice";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createOrder,
    createOrderPayment,
} from "../../../features/order/orderSlice";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";

const PayMentTotal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.user);
    const {products} = useSelector((state) => state.cart);
    const {addressId, paymentMethodId, shippingMethodId} = useSelector(
        (state) => state.payment
    );
    const {order} = useSelector((state) => state.order);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const handleOrder = () => {
        const orderDate = new Date().toISOString().slice(0, 10); // Định dạng yyyy-MM-dd
        const orderItems = products.map((item) => ({
            variant_id: item.variantDto.id,
            quantity: item.quantity,
            price: item.variantDto.salePrice,
        }));

        const orderData = {
            userId: userInfo.id,
            orderDate: orderDate,
            addressId: addressId,
            paymentMethodId: paymentMethodId,
            shippingMethodId: shippingMethodId,
            orderItemRequestList: orderItems,
            orderTotal: orderItems
                .reduce(
                    (total, item) => total + item.quantity * item.salePrice,
                    0
                )
                .toFixed(2),
        };

        if (addressId && paymentMethodId && shippingMethodId) {
            dispatch(createOrder(orderData));
            dispatch(clear());
            dispatch(clearCartLine(userInfo.id));
            navigate("/success");
            console.log("Payment total", orderData);
            console.log("User trong payment", userInfo.id);
            console.log(" biến orderItems trong payment total", orderItems);
        } else {
            notifyError();
        }
    };
    const handleOrderPayment = () => {
        const orderDate = new Date().toISOString().slice(0, 10); // Định dạng yyyy-MM-dd
        const orderItems = products.map((item) => ({
            variant_id: item.variantDto.id,
            quantity: item.quantity,
            price: item.variantDto.salePrice,
        }));

        const orderData = {
            userId: userInfo.id,
            orderDate: orderDate,
            addressId: addressId,
            shippingMethodId: shippingMethodId,
            orderItemRequestList: orderItems,
            orderTotal: orderItems
                .reduce(
                    (total, item) => total + item.quantity * item.salePrice,
                    0
                )
                .toFixed(2),
        };

        if (addressId && shippingMethodId) {
            dispatch(createOrderPayment(orderData));
            dispatch(clear());
            dispatch(clearCartLine(userInfo.id));

            console.log("Payment total", orderData);
            console.log("User trong payment", userInfo.id);
            console.log(" biến orderItems trong payment total", orderItems);
        } else {
            notifyError();
        }
    };

    const notifyError = () => {
        toast.error("Request complete information !");
    };

    useEffect(() => {
        let totalPrice = 0;
        let totalItem = 0;
        products.forEach((item) => {
            totalPrice += item.variantDto?.salePrice * item.quantity;
            totalItem += item.quantity;
        });
        setTotalItem(totalItem);
        setTotalPrice(totalPrice);
    }, [products]);

    const [exchangeRate, setExchangeRate] = useState(null); // Khởi tạo không có giá trị mặc định

    const fetchExchangeRate = useCallback(async () => {
        dispatch({type: "SET_LOADING", payload: true});
        try {
            const response = await axios.get(
                "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10"
            );
            const xmlData = response.data;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "text/xml");
            const usdToVndRateNode = xmlDoc.querySelector(
                'Exrate[CurrencyCode="USD"]'
            );
            if (!usdToVndRateNode) {
                throw new Error("USD exchange rate not found");
            }
            const rate = parseFloat(
                usdToVndRateNode.getAttribute("Transfer").replace(/,/g, "")
            );
            setExchangeRate(rate); // Cập nhật state
            document.getElementById(
                "exchangeRate"
            ).textContent = `1 USD = ${rate.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })} VND`;
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    }, []);

    useEffect(() => {
        fetchExchangeRate();
    }, [fetchExchangeRate]);

    useEffect(() => {
        fetchExchangeRate();
    }, [fetchExchangeRate]);
    return (
        <>
            <div className="border border-gray-400 rounded-md">
                <div className="w-auto h-auto col-span-1 flex flex-col p-4">
                    <div>
                        <ToastContainer position="top-right" />
                    </div>
                    {/* <button
                        className="w-full font-titleFont sm:text-xs md:text-md lg:text-lg bg-gradient-to-tr text-white bg-indigo-700 hover:bg-indigo-500 duration-200 py-1.5 rounded-xl mt-3"
                        onClick={() => handleOrder()}
                    >
                        Place your order
                    </button> */}
                    <button
                        className="w-full font-titleFont sm:text-xs md:text-md lg:text-lg bg-gradient-to-tr text-white bg-black hover:bg-slate-900 duration-200 py-1.5 rounded-xl mt-3"
                        onClick={() => handleOrderPayment()}
                    >
                        <FontAwesomeIcon icon={faCreditCard} /> Payment Stripe
                    </button>
                    <div class="text-center">
                        <p className="flex gap-1 items-start sm:text-xs lg:text-sm pt-4">
                            By placing your order, you agree to Fashion Star's
                            privacy notice and conditions of use.
                        </p>
                        <p className="flex gap-1 items-start sm:text-xs lg:text-sm pt-2">
                            You also agree to FashionStar Global's terms and
                            conditions.
                        </p>
                    </div>
                    <div class="font-semibold border-t border-gray-500 my-3">
                        Order Summary
                    </div>
                    <div class="grid grid-cols-4 gap-1 text-sm font-sans">
                        <div class="col-span-2">Items ({totalItem}):</div>
                        <div class="col-span-2 text-end">
                            $ {totalPrice.toFixed(2)}
                        </div>
                        <div class="col-span-2">Shipping & handling:</div>
                        <div class="col-span-2 text-end">$ {8}</div>
                        <div class="col-span-2"></div>
                        <div class="col-span-2 text-end">
                            <div class="border border-gray-300"></div>
                        </div>
                        <div class="col-span-2">Total before tax:</div>
                        <div class="col-span-2 text-end">
                            $ {(totalPrice + 8).toFixed(2)}
                        </div>
                        {/* <div class="col-span-2 text-end">
                            {((totalPrice * 10) / 100).toFixed(2)}
                        </div> */}
                        <div class="col-span-2 text-red-600 font-bold text-lg">
                            Order total:
                        </div>
                        <div class="col-span-2 text-end text-red-600 font-bold text-lg">
                            {" "}
                            $ {(totalPrice + 8).toFixed(2)}
                        </div>
                        <div class="border border-gray-300 col-span-4"></div>
                    </div>
                    <div></div>
                    <div id="exchangeRate"> USD = </div>
                    <div>
                        Total: $
                        {(totalPrice + 8 + (totalPrice * 10) / 100).toFixed(2)}{" "}
                        USD =
                        {exchangeRate
                            ? (
                                  (totalPrice + 8 + (totalPrice * 10) / 100) *
                                  exchangeRate
                              ).toLocaleString("en-US")
                            : "Loading..."}{" "}
                        VND
                    </div>
                </div>
                <div class="bg-gray-200 text-sm p-4 font-sans border-t border-gray-400 rounded-b-lg ">
                    <div class="text-blue-600 text-sm hover:text-orange-500 hover:underline">
                        What is the Fashion Star Currency Converter?
                    </div>{" "}
                    You can track your shipment and view any applicable import
                    fees deposit before placing your order.{" "}
                    <span class="text-blue-600 text-sm hover:text-orange-500 hover:underline">
                        Learn more
                    </span>{" "}
                    <div class="text-blue-600 text-sm hover:text-orange-500 hover:underline">
                        How are shipping costs calculated?
                    </div>{" "}
                    <div class="text-blue-600 text-sm hover:text-orange-500 hover:underline">
                        Why didn't I qualify for free shipping?
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayMentTotal;
