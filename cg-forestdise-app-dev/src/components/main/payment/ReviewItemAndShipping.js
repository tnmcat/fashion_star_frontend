import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {decrementQuantity, editCartLine, getCartLines, incrementQuantity} from "../../../features/cart/cartSlice";
import {addShippingmethodId, getShippingMethod} from "../../../features/payment/paymentSlice";

function ReviewItemAndShipping() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const products = useSelector((state) => state.cart.products);
  const shippingMethod = useSelector((state) => state.payment.shippingMethod);

  useEffect(() => {
    dispatch(getShippingMethod());
    if (products.length <= 0) {
      dispatch(getCartLines(userInfo.id));
    }
  }, []);

  return (
      <div>
        <div className="px-20">
          <div>
            <div className="grid grid-cols-3">
              <div className="col-span-3">
                <h2 className="text-xl font-bold font-sans">
                  <span className="pr-4">3</span>Review items and shipping
                </h2>
              </div>
            </div>
            <div className="px-8">
              <div className="border border-gray-400 rounded-md p-4 mt-4">
                <div className="font-bold text-green-700">
                  Delivery: Nov. 21, 2023
                </div>
                <div className="text-sm">Items shipped from Amazon.com</div>
                <div className="grid grid-cols-7 gap-2 pt-4">
                  <div className="col-span-3">
                    {products.map((product) => (
                        <div key={product.id}>
                          <div className="flex items-center">
                            <img
                                src={product.variantDto.img}
                                alt=""
                                className="w-32 h-32 object-contain"
                            />
                            <div>
                              <div className="font-semibold">{product.variantDto.name}</div>
                              <div className="text-red-700 font-bold">${(product.variantDto.price*product.quantity).toFixed(2)}</div>
                              <div className="bg-[#F0F2F2] md:text-lg sm:text-xs lg:text-lg flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                                <p>Qty:</p>
                                <p
                                    onClick={() => {
                                      userInfo && product.quantity > 1
                                          ? dispatch(
                                              editCartLine({
                                                quantity: product.quantity - 1,
                                                id: product.id,
                                              })
                                          )
                                          : dispatch(
                                              decrementQuantity({
                                                id: "",
                                                quantity: 1,
                                                cartDto: {
                                                  id: "",
                                                  userId: "",
                                                },
                                                variantDto: {
                                                  id: product.variantDto.id,
                                                  name: product.variantDto.name,
                                                  skuCode: product.variantDto.skuCode,
                                                  stockQuantity:
                                                  product.variantDto.stockQuantity,
                                                  weight: product.variantDto.weight,
                                                  price: product.variantDto.price,
                                                  img: product.variantDto.img,
                                                },
                                              })
                                          );
                                    }}
                                    className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                                >
                                  -
                                </p>
                                <p>{product.quantity}</p>
                                <p
                                    onClick={() => {
                                      userInfo
                                          ? dispatch(
                                              editCartLine({
                                                quantity: product.quantity + 1,
                                                id: product.id,
                                              })
                                          )
                                          : dispatch(
                                              incrementQuantity({
                                                id: "",
                                                quantity: 1,
                                                cartDto: {
                                                  id: "",
                                                  userId: "",
                                                },
                                                variantDto: {
                                                  id: product.variantDto.id,
                                                  name: product.variantDto.name,
                                                  skuCode: product.variantDto.skuCode,
                                                  stockQuantity:
                                                  product.variantDto.stockQuantity,
                                                  weight: product.variantDto.weight,
                                                  price: product.variantDto.price,
                                                  img: product.variantDto.img,
                                                },
                                              })
                                          );
                                    }}
                                    className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                                >
                                  +
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                  <div className="col-span-3">
                    <div className="font-bold">Choose a delivery option:</div>
                    {shippingMethod.map((item) => (
                        <div className="mb-2" key={item.id}>
                          <input type="radio" name="shipping" onClick={()=> dispatch(addShippingmethodId({"shippingMethodId":item.id}))}/>
                          <span className="ml-3 text-green-700 font-semibold">
                        {item.name}
                      </span>
                          <div className="ml-6">${item.price} - Shipping</div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ReviewItemAndShipping;
