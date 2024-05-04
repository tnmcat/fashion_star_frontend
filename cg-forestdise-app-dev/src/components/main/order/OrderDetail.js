import {Button, Grid} from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";

const OrderDetail = ({order}) => {
    return (
        <div className="relative bg-slate-50 border rounded-sm">
            <Grid container spacing={1} sx={{justifyContent: "space-between"}}>
                {order.orderItemListDTO.map((item) => {
                    return (
                        <Grid item xs={8} key={item.id}>
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
                        </Grid>
                    );
                })}
                {/* <Grid item xs={2}>
                    <p>Item quantity: </p>
                    <p> {order.quantity}</p>
                </Grid> */}
                <Grid item xs={4}>
                    {true && (
                        <div>
                            <p>
                                <AdjustIcon
                                    xs={{width: "15px", height: "15px"}}
                                    className="text-green-600 mr-3 text-sm"
                                />
                                <span> Your item has been Delivered</span>
                            </p>
                            <p className=" text-end text-lg mr-3 font-bold">
                                {order.order_status}
                            </p>

                            <Button color="secondary">Secondary</Button>
                        </div>
                    )}
                    {/* {false && (
                        <p>
                            <span>Excepted delivered On march 03</span>
                        </p>
                    )} */}
                </Grid>
            </Grid>
            <div className="flex items-center space-x-10 p-5 bg-slate-50 text-sm text-gray-600 border-t-2">
                <div>
                    <p className="font-bold text-amazon_light"> ORDER PLACED</p>
                    <p></p>
                </div>
            </div>
            <div className=" flex items-end space-x-2">
                <p
                    className="text-sm whitespace-nowrap sm:text-xl self-end
                        flex-1 text-right text-indigo-700 mr-3"
                >
                    <a className="text-teal-700 text-lg ml-2"> Total Price: </a>{" "}
                    {order.orderTotal}
                </p>
            </div>
        </div>
    );
};

export default OrderDetail;
