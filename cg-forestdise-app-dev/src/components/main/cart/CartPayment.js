import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CartPayment = () => {
    const navigate = useNavigate();
    const {products} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.user);
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        let total = 0;
        products.map((item) => {
            total += item.variantDto?.salePrice * item?.quantity;
            return setTotalPrice(total.toFixed(2));
        });
    }, [products]);
    // const handlePayment = () => {
    //     if (userInfo && products.length > 0) {
    //         navigate("/payment");
    //     }
    //     if (!userInfo) {
    //         navigate("/signin");
    //     }
    // };

    const processPayment = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Thanh toán thành công!");
            }, 1000);
        });
    };
    const handlePayment = async () => {
        let allItemsValid = true;
        let errorMessages = [];
        for (const item of products) {
            if (item.quantity > item.variantDto.stockQuantity) {
                allItemsValid = false;
                errorMessages.push(
                    `Quantity '${item.variantDto.name} exceeds inventory. Quantity is having: ${item.variantDto.stockQuantity}`
                );
            }
        }
        if (!allItemsValid) {
            alert("Có lỗi xảy ra: \n" + errorMessages.join("\n"));
            return;
        }

        // Tiến hành thanh toán nếu mọi thứ hợp lệ
        try {
            const paymentResult = await processPayment();
            alert(paymentResult); // Thông báo thanh toán thành công
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            alert("Lỗi thanh toán. Vui lòng thử lại sau.");
        }
        if (userInfo && products.length > 0) {
            navigate("/payment");
        }
        if (!userInfo) {
            navigate("/signin");
        }
    };

    return (
        <>
            <div className="bg-red-500">
                <div className="w-auto h-auto bg-white col-span-1 flex flex-col justify-center items-center p-4">
                    <div>
                        <p className="flex gap-1 items-start sm:text-xs lg:text-sm">
                            <span>
                                <CheckCircleIcon
                                    className="bg-white text-green-500 rounded-full"
                                    fontSize="small"
                                />
                            </span>{" "}
                            you order quantifies for Free Shopping Choose this
                            option at checkout, See details...
                        </p>
                    </div>
                    <div>
                        <p className="sm:text-xs md:text-md lg:text-lg font-semibold sm:px-1 lg:px-10 py-1 flex items-center gap-2 justify-between">
                            Total:{" "}
                            <span className="sm:text-xs md:text-md lg:text-lg font-bold ">
                                ${products.length > 0 ? totalPrice : 0}
                            </span>
                        </p>
                    </div>
                    <button
                        className="w-full font-titleFont font-medium 
                        sm:text-xs text-white md:text-md lg:text-lg bg-gradient-to-tr
                         from-indigo-600 to-indigo-500 border hover:from-indigo-500 
                         hover:to-yellow border-indigo-500 hover:border-indigo-700 active:bg-gradient-to-bl active:from-indigo-500 active:to-indigo-600
                          duration-200 py-1.5 rounded-md mt-3"
                        onClick={() => handlePayment()}
                    >
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartPayment;
