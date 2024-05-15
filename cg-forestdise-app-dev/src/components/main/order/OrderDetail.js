import {Grid} from "@mui/material";
import React, {useState} from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import OrderReview from "./OrderReview";
import {useEffect} from "react";

const OrderDetail = ({order}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);
    const [orderId, setOrderId] = useState(0);

    const toggleVisibility = () => {
        // if (!isReviewed) {
        //     setIsVisible((prevIsVisible) => !prevIsVisible);
        //     if (!isVisible) {
        //         setIsReviewed(true); // Đánh dấu đã review khi mở review lần đầu
        //     }
        // }
        setIsVisible((isVisible) => !isVisible);
    };

    return (
        <div className="flex justify-between relative">
            <div className="relative bg-slate-50 border rounded-sm w-full">
                <Grid
                    container
                    spacing={1}
                    sx={{justifyContent: "space-between"}}
                >
                    {order.orderItemListDTO.map((item) => {
                        return (
                            <Grid
                                item
                                xs={8}
                                key={item.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    width: "100%",
                                    maxWidth: "100%",
                                    flexBasis: "100%",
                                }}
                            >
                                <div className="flex cursor-pointer py-3">
                                    <img
                                        className="w-[6rem] h-[6rem] object-contain object-top"
                                        src={item.variantDTO.img}
                                        alt=""
                                    />
                                    <div className="ml-5 space-y-3">
                                        <p className="opacity-50 text-xs font-semibold">
                                            Name: {item.variantDTO.name}{" "}
                                        </p>
                                        <p className="opacity-50 text-xs font-semibold">
                                            Price: {item.variantDTO.price}
                                        </p>
                                        <p className="opacity-50 text-xs font-bold">
                                            Store: {order.storeDTO.name}{" "}
                                        </p>
                                        <p className="opacity-50 text-xs font-bold">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <div></div>
                                </div>
                                <Grid item xs={3}>
                                    {true && (
                                        <div>
                                            <p>
                                                <AdjustIcon
                                                    xs={{
                                                        width: "15px",
                                                        height: "15px",
                                                    }}
                                                    className="text-green-600 mr-3 text-sm"
                                                />
                                                <span> Status Order</span>
                                            </p>
                                            <p
                                                className={`text-end text-lg mr-3 font-bold ${
                                                    order.order_status ===
                                                    "PENDING"
                                                        ? "text-orange-500"
                                                        : order.order_status ===
                                                          "CANCEL"
                                                        ? "text-red-500"
                                                        : order.order_status ===
                                                          "COMPLETED"
                                                        ? "text-green-500"
                                                        : order.order_status ===
                                                          "ACCEPTED"
                                                        ? "text-blue-500"
                                                        : ""
                                                }`}
                                            >
                                                {order.order_status}
                                            </p>
                                        </div>
                                    )}
                                </Grid>
                                {isVisible ? (
                                    <OrderReview
                                        variandId={item.variantDTO}
                                        toggleVisibility={toggleVisibility}
                                        setOrderId={setOrderId}
                                    />
                                ) : (
                                    ""
                                )}
                            </Grid>
                        );
                    })}

                    {order.order_status === "COMPLETED" && !orderId ? (
                        <button
                            className="bg-amazon_yellow p-2 rounded-lg text-amazon_light"
                            style={{margin: "15px 15px 15px auto"}}
                            onClick={toggleVisibility}
                            disabled={isReviewed} // Vô hiệu hóa nút sau khi review
                        >
                            Review
                        </button>
                    ) : (
                        ""
                    )}

                    {/* chỗ này đặt orderdetail.txt */}
                </Grid>
                <div className="flex items-center space-x-10 p-5 bg-slate-50 text-sm text-gray-600 border-t-2">
                    <div>
                        <p className="font-bold text-amazon_light">
                            {" "}
                            ORDER PLACED
                        </p>
                        <p>
                            {new Date(order.order_date).toLocaleDateString(
                                "en-CA"
                            )}
                        </p>
                        <p className="text-red-700">
                            Your Order will be shipped after 5 -7 days
                        </p>
                    </div>
                </div>
                <div className=" flex items-end ">
                    <p
                        className="text-sm whitespace-nowrap sm:text-xl self-end
                        flex-1 text-right text-indigo-700 mr-3"
                    >
                        <a className="text-teal-700 text-lg ml-2" href="/order">
                            {" "}
                            Total Price:{" "}
                        </a>{" "}
                        {order.orderTotal.toLocaleString("de-DE")} $
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
