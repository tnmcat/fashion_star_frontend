import {Grid} from "@mui/material";
import React, {useState} from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import OrderReview from "./OrderReview";
import {useEffect} from "react";

const cours = [
    {
        id: 1,
        name: "pending",
    },
    {
        id: 2,
        name: "completed",
    },
];

const OrderDetail = ({order}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible((prevIsVisible) => !prevIsVisible);
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
                            <Grid item xs={12} key={item.id}>
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
                                                <span>
                                                    {" "}
                                                    Your item has been Delivered
                                                </span>
                                            </p>
                                            <div className="flex-initial">
                                                <p className=" text-end text-lg mr-3 font-bold">
                                                    {order.order_status}
                                                </p>
                                            </div>
                                            {order.order_status ===
                                            "COMPLETED" ? (
                                                <button
                                                    className=" bg-amazon_yellow p-2 rounded-lg"
                                                    onClick={toggleVisibility}
                                                >
                                                    {isVisible
                                                        ? "Hide"
                                                        : "Review"}
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    )}
                                    {/* {false && (
                        <p>
                            <span>Excepted delivered On march 03</span>
                        </p>
                    )} */}
                                </Grid>
                                {isVisible ? (
                                    <OrderReview
                                        variandId={item.variantDTO}
                                        toggleVisibility={toggleVisibility}
                                    />
                                ) : (
                                    ""
                                )}
                            </Grid>
                        );
                    })}

                    {/* chỗ này đặt orderdetail.txt */}
                </Grid>
                <div className="flex items-center space-x-10 p-5 bg-slate-50 text-sm text-gray-600 border-t-2">
                    <div>
                        <p className="font-bold text-amazon_light">
                            {" "}
                            ORDER PLACED
                        </p>
                        <p></p>
                    </div>
                </div>
                <div className=" flex items-end space-x-2">
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
