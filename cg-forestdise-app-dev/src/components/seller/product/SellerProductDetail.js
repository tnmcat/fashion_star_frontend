import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {fetchOptionsByProductId} from "../../../features/seller_feature/option/optionSlice";
import {findVariantsByProductIdAndValueIds} from "../../../features/seller_feature/variant/variantSlice";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {getVariant} from "../../../features/variant/variantSlice";
function SellerProductDetail(props) {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const [optionList, setOptionList] = useState(null);
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [variantRender, setVariantRender] = useState(null);
    const [mainImage, setMainImage] = useState("");

    const getVariantDetail = async () => {
        if (selectedVariant?.id) {
            try {
                const variant_result = await dispatch(
                    getVariant(selectedVariant.id)
                );
                const variant = unwrapResult(variant_result);
                setVariantRender(variant);
                setMainImage(variant.img);
            } catch (error) {
                console.error("Failed to fetch variant details:", error);
            }
        }
    };

    useEffect(() => {
        getVariantDetail();
    }, [selectedVariant?.id]);

    console.log(variantRender);
    const fetchOptions = async () => {
        try {
            const options_result = await dispatch(
                fetchOptionsByProductId(productId)
            );
            const options = unwrapResult(options_result);
            setOptionList(options);
        } catch (error) {
            console.error("Failed to fetch options:", error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, [dispatch, productId]);

    const handleValueClick = (optionId, valueId) => {
        const isSelected = selectedValues.some(
            (value) => value.optionId === optionId
        );
        if (isSelected) {
            setSelectedValues((prevValues) =>
                prevValues.map((value) => ({
                    ...value,
                    valueId:
                        value.optionId === optionId ? valueId : value.valueId,
                }))
            );
        } else {
            setSelectedValues((prevValues) => [
                ...prevValues,
                {optionId, valueId},
            ]);
        }
    };

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };
    useEffect(() => {
        const findVariants = async () => {
            try {
                const request = {
                    productId: productId,
                    optionValueIds: selectedValues.map(
                        (value) => value.valueId
                    ),
                };
                const variant_result = await dispatch(
                    findVariantsByProductIdAndValueIds(request)
                );
                const variant = unwrapResult(variant_result);
                setSelectedVariant(variant);
            } catch (error) {
                console.error("Failed to fetch variants:", error);
            }
        };

        if (selectedValues.length > 0) {
            findVariants();
        }
    }, [dispatch, productId, selectedValues]);
    //cart area
    const schema = yup.object().shape({
        quantity: yup.string().required("Please input an order quantity"),
    });
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleAddToCart = (data) => {
        const {quantity} = data;
        if (selectedVariant && quantity > 0) {
            console.log(
                `Adding ${quantity} of variant ${selectedVariant.id} (SKU) ${selectedVariant.skuCode} sale price ${selectedVariant.salePrice} to the cart `
            );
            // Dispatch an action to add the selected variant and quantity to the cart
            // Example: dispatch(addToCart(selectedVariant, quantity));
        } else {
            console.error("Invalid quantity or selected variant");
        }
    };

    return (
        <>
            <h1>Product Details</h1>
            {selectedVariant && (
                <div>
                    <h2>Selected Variant</h2>
                    <p>Variant ID: {selectedVariant.id}</p>
                    <p>Price: {selectedVariant.salePrice}</p>
                    {/* Render other details of the selected variant */}
                </div>
            )}
            {optionList && optionList.length > 0 ? (
                <ul>
                    {optionList.map((option) => (
                        <ul key={option.id}>
                            {option.name}
                            {option.optionValueDTOList.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() =>
                                        handleValueClick(option.id, item.id)
                                    }
                                    className={
                                        selectedValues.some(
                                            (value) =>
                                                value.optionId === option.id &&
                                                value.valueId === item.id
                                        )
                                            ? "selected"
                                            : ""
                                    }
                                    style={{
                                        background: selectedValues.some(
                                            (value) =>
                                                value.optionId === option.id &&
                                                value.valueId === item.id
                                        )
                                            ? "#ccc"
                                            : "transparent",
                                        padding: "10px",
                                        margin: "5px 0",
                                    }}
                                >
                                    {item.value}
                                </li>
                            ))}
                        </ul>
                    ))}
                </ul>
            ) : (
                <div>No options found for this product.</div>
            )}

            <h3>Input quantity to add cart: </h3>
            <form onSubmit={handleSubmit(handleAddToCart)}>
                <label>
                    Quantity:
                    <input type="number" {...register("quantity")} />
                    {errors.quantity && <span>{errors.quantity.message}</span>}
                </label>
                <button type="submit">Add to Cart</button>
            </form>

            {/* new part */}

            <div className="font-bodyFont w-full bg-gray-100 p-1">
                <div className="container mx-auto h-auto grid grid-cols-5 gap-2">
                    <div className="w-full h-full bg-white px-4 col-span-2 flex flex-col py-10 border-gray-300 border-2 rounded-3xl">
                        <div className="w-full h-96 object-contain fluid__image-container ">
                            <img
                                className="w-full h-96 object-contain "
                                src={mainImage}
                                alt="ProductImg"
                            ></img>
                        </div>
                        <div className="font-titleFont px-8 mx-8 my-4 hover:border-spacing-x-5 text-center justify-center tracking-wide text-green-900 size text-sm ">
                            <span>Roll over the image to zoom in</span>
                        </div>
                        <div>
                            <div className="flex flex-wrap text-center justify-between object-contain hover:py-4 mx-21">
                                {variantRender &&
                                    variantRender.imageDTOList?.map(
                                        (item, index) => (
                                            <img
                                                key={index}
                                                className="w-8 h-8 object-contain basis-1/6 rounded-sm hover:outline outline-offset-1 outline-cyan-500 shadow-2xl duration-300"
                                                src={item?.imgPath}
                                                alt="ProductImg"
                                                onClick={() =>
                                                    handleThumbnailClick(
                                                        item?.imgPath
                                                    )
                                                }
                                            ></img>
                                        )
                                    )}
                                {variantRender &&
                                    variantRender.videoDtoList?.map(
                                        (item, i) => (
                                            <video
                                                key={i}
                                                controls
                                                className="w-8 h-8 object-contain basis-1/6 rounded-sm hover:outline outline-offset-1 outline-cyan-500 shadow-2xl duration-300 px-4"
                                            >
                                                <source
                                                    src={item?.videoPath}
                                                    type="video/mp4"
                                                />
                                            </video>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>

                    {/* Detail Product Start */}
                    <div className="w-full h-full bg-white px-4 col-span-2 border-gray-300 border-2 rounded-3xl">
                        <div className="w-full h-full bg-white px-4 col-span-2 flex flex-col py-10">
                            <div className="font-bodyFont tracking-wide text-lg text-amazon_blue size sm:text-xs  md:text-lg lg:text-xl xl:text-3xl">
                                {variantRender != null && (
                                    <h2>{variantRender.name}</h2>
                                )}
                            </div>
                            {/* <Link to={`/store/${storeInfo.id}`}>
                                <div className="font-titleFont tracking-wide text-green-900 size text-sm sm:text-xs hover:text-green-700 underline">
                                    <span
                                        onClick={() => {
                                            dispatch(
                                                setCategory(
                                                    storeInfo.storeCategoryList
                                                )
                                            );
                                            dispatch(changeCategory(""));
                                            dispatch(changeSubCategory(""));
                                        }}
                                    >
                                        Visit the {storeInfo.name}
                                    </span>
                                </div>
                            </Link> */}
                            {/* {reviewAnalyst != null && (
                                <div className="font-titleFont flex items-baseline text-center justify-between text-sm text-yellow-500 mb-2 mt-2">
                                    <div className="flex text-center justify-center ">
                                        <div className="text-sm font-bold mr-1">
                                            {reviewAnalyst.summaryDto.rating.toFixed(
                                                1
                                            )}
                                        </div>
                                        <StarRating
                                            rating={
                                                reviewAnalyst.summaryDto?.rating
                                            }
                                            fontSize={18}
                                        />
                                    </div>
                                    {/* 5 star */}
                            {/* <div className="">
                                {reviewAnalyst.summaryDto?.reviewsTotal} rating
                            </div> */}
                        </div>

                        <hr></hr>
                        {variantRender != null &&
                        variantRender.stockQuantity > 0 ? (
                            <div className="font-titleFont tracking-wide text-lg text-amazon_blue size sm:text-xs  md:text-lg lg:text-xl xl:text-3xl flex mb-6 mt-4 ">
                                <h2 className="line-through mr-4 text-red-700">
                                    ${variantRender.price}
                                </h2>
                                <h2>
                                    <span className="">
                                        ${variantRender.salePrice}
                                    </span>
                                </h2>
                                <span className="text-indigo-500 text-sm font-semibold leading-6 ml-3 ">
                                    {variantRender.stockQuantity} Available
                                </span>
                            </div>
                        ) : (
                            <div className=" text-green-900 mt-6 flex flex-col mb-6">
                                <h1>Currently unavailable.</h1>
                                <span className="text-xs text-black">
                                    We don't know when or if this item will be
                                    back in stock.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {/* Detail Product End */}
            </div>
        </>
    );
}

export default SellerProductDetail;
