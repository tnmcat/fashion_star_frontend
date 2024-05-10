import {yupResolver} from "@hookform/resolvers/yup";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import {unwrapResult} from "@reduxjs/toolkit";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as yup from "yup";
import {addNewCartLine, addToCart} from "../../../features/cart/cartSlice";
import {
    getReviewByProductId,
    getReviewsByVariantId,
    selectReviewListByProductId,
} from "../../../features/coment_review/reviewSlide";
import {
    changeCategory,
    changeSubCategory,
    setCategory,
} from "../../../features/sellerStore/sellerStoreSlice";
import {fetchOptionsByProductId} from "../../../features/variant/optionSlide";
import {
    findVariantsByProductIdAndValueIds,
    getVariant,
    selectVariantDetail,
} from "../../../features/variant/variantSlice";
import StarRating from "../../common/icon/StarRating";
import FormatDate from "../../common/format/FormatDate";
function ProductDetail2(props) {
    const {id} = useParams();
    const [productId] = useState(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reviewAnalyst = useSelector(selectReviewListByProductId);
    const [showRecommend, setShowRecommend] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const storeInfo = useSelector((state) => state.sellerStore.storeInfo);
    const {userInfo} = useSelector((state) => state.user);
    const [optionList, setOptionList] = useState(null);
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    //const [variantRender, setVariantRender] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [attributeList, setAttributeList] = useState([]);
    const variantDetail = useSelector(selectVariantDetail);
    const reviewVariantList = useSelector((state) => state.review.reviews);
    const [reviewDTOList, setReviewDTOList] = useState();
    const fetchOptions = async () => {
        try {
            const options_result = await dispatch(
                fetchOptionsByProductId(productId)
            );
            const options = unwrapResult(options_result);
            setOptionList(options);

            // Thiết lập giá trị mặc định cho mỗi option
            const defaultValues = options.map((option) => ({
                optionId: option.id,
                valueId:
                    option.optionValueDTOList.length > 0
                        ? option.optionValueDTOList[0].id
                        : null, // Giả sử chọn giá trị đầu tiên
            }));
            setSelectedValues(defaultValues);
        } catch (error) {
            console.error("Failed to fetch options:", error);
        }
    };

    useEffect(() => {
        fetchOptions();
        getReviewAnalyst();
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

    console.log(attributeList);
    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const findVariants = async () => {
        try {
            const request = {
                productId: productId,
                optionValueIds: selectedValues.map((value) => value.valueId),
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
    // Trong useEffect thứ hai
    useEffect(() => {
        if (selectedValues.length > 0) {
            findVariants();
        }
    }, [dispatch, productId, selectedValues]);

    const getReviewAnalyst = () => {
        if (productId != null) {
            dispatch(getReviewByProductId(productId));
        }
    };

    const getVariantDetail = async () => {
        if (selectedVariant?.id) {
            try {
                const variant_result = await dispatch(
                    getVariant(selectedVariant.id)
                );
                const variant = unwrapResult(variant_result);
                //  setVariantRender(variant);
                const reviewDTOListResult = await dispatch(
                    getReviewsByVariantId(selectedVariant.id)
                );
                const reviewDTOList = unwrapResult(reviewDTOListResult);

                setReviewDTOList(reviewDTOList.reviewDTOList);
                setMainImage(variant.img);
                setAttributeList(variant.attributeDTOList);
            } catch (error) {
                console.error("Failed to fetch variant details:", error);
            }
        }
    };

    useEffect(() => {
        getVariantDetail();
        getReviewAnalyst();
    }, [selectedVariant?.id]);
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

    const variantRender = useSelector((state) => state.variant.variantDetail);

    console.log(variantRender);
    return (
        <>
            {selectedVariant && (
                <div>
                    {/* Thumnail start */}
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
                    {/* Thumnail end */}
                    {/* Detail Product Start */}
                    <div className="w-full h-full bg-white px-4 col-span-2 border-gray-300 border-2 rounded-3xl">
                        <div className="w-full h-full bg-white px-4 col-span-2 flex flex-col py-10">
                            <div className="font-bodyFont tracking-wide text-lg text-amazon_blue size sm:text-xs  md:text-lg lg:text-xl xl:text-3xl">
                                {selectedVariant != null && (
                                    <h2>{selectedVariant.name}</h2>
                                )}
                            </div>
                            <Link to={`/store/${storeInfo.id}`}>
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
                            </Link>
                            {reviewAnalyst != null && (
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
                                    <div className="">
                                        {reviewAnalyst.summaryDto?.reviewsTotal}{" "}
                                        rating
                                    </div>
                                </div>
                            )}
                            <hr></hr>
                            {selectedVariant != null &&
                            selectedVariant.stockQuantity > 0 ? (
                                <div className="font-titleFont tracking-wide text-lg text-amazon_blue size sm:text-xs  md:text-lg lg:text-xl xl:text-3xl flex mb-6 mt-4 ">
                                    <h2 className="line-through mr-4 text-red-700">
                                        ${selectedVariant.price}
                                    </h2>
                                    <h2>
                                        <span className="">
                                            ${selectedVariant.salePrice}
                                        </span>
                                    </h2>
                                    <span className="text-indigo-500 text-sm font-semibold leading-6 ml-3 ">
                                        {selectedVariant.stockQuantity}{" "}
                                        Available
                                    </span>
                                </div>
                            ) : (
                                <div className=" text-green-900 mt-6 flex flex-col mb-6">
                                    <h1>Currently unavailable.</h1>
                                    <span className="text-xs text-black">
                                        We don't know when or if this item will
                                        be back in stock.
                                    </span>
                                </div>
                            )}
                            {optionList && optionList.length > 0 ? (
                                <ul>
                                    {optionList.map((option) => (
                                        <ul key={option.id}>
                                            {option.name}
                                            {option.optionValueDTOList.map(
                                                (item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() =>
                                                            handleValueClick(
                                                                option.id,
                                                                item.id
                                                            )
                                                        }
                                                        className={
                                                            selectedValues.some(
                                                                (value) =>
                                                                    value.optionId ===
                                                                        option.id &&
                                                                    value.valueId ===
                                                                        item.id
                                                            )
                                                                ? "selected"
                                                                : ""
                                                        }
                                                        style={{
                                                            background:
                                                                selectedValues.some(
                                                                    (value) =>
                                                                        value.optionId ===
                                                                            option.id &&
                                                                        value.valueId ===
                                                                            item.id
                                                                )
                                                                    ? "#ccc"
                                                                    : "transparent",
                                                            padding: "10px",
                                                            margin: "5px 0",
                                                        }}
                                                    >
                                                        {item.value}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ))}
                                </ul>
                            ) : (
                                <div>No options found for this product.</div>
                            )}
                            {attributeList?.map((attr, bindex) => (
                                <div
                                    key={bindex}
                                    className="w-full mx-auto h-auto grid grid-cols-5 gap-2 left-0"
                                >
                                    <div className=" w-full h-full bg-white col-span-2 font-titleFont tracking-wide text-l text-amazon_blue text-left font-bold">
                                        {attr.name}
                                    </div>
                                    <div className="w-full h-full bg-white col-span-3 text-left font-titleFont tracking-wide text-l text-amazon_blue">
                                        {attr.value}
                                    </div>
                                </div>
                            ))}

                            <div>
                                <h2 className="font-bold mt-2">
                                    About this item{" "}
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/* Detail Product End */}
                    {/* Cart Start */}
                    <div className="w-full h-full bg-white col-span-1 border-indigo-700 border-2 rounded-3xl text-sm">
                        <div className="flex flex-col p-4">
                            <div className="font-titleFont tracking-wide text-lg text-amazon_blue size sm:text-xs  md:text-lg lg:text-xl xl:text-3xl">
                                <h2>
                                    <span className="">$</span>
                                    {selectedVariant.salePrice}
                                </h2>
                            </div>
                            <div>
                                <h5>
                                    Delivery{" "}
                                    <span className="font-bold">
                                        Day / Month / Year
                                    </span>
                                </h5>
                            </div>
                            <div className="flex flex-row">
                                <FmdGoodIcon sx={{fontSize: 20}} />
                                <Link to={`/deliver`}>
                                    <span className=" text-green-900 hover:text-stone-400 underline text-xs">
                                        Deliver To Viet Nam
                                    </span>
                                </Link>
                            </div>

                            {selectedVariant != null &&
                            selectedVariant.stockQuantity > 0 ? (
                                <>
                                    <h1 className="my-4 text-2xl text-green-900">
                                        In Stock
                                    </h1>
                                    {/* viet them add to cart */}

                                    <button
                                        onClick={() => {
                                            userInfo
                                                ? dispatch(
                                                      addNewCartLine({
                                                          id: "",
                                                          quantity: 1,
                                                          cartId: userInfo.id,
                                                          variantId:
                                                              variantRender.id,
                                                      })
                                                  )
                                                : dispatch(
                                                      addToCart({
                                                          id: "",
                                                          quantity: 1,
                                                          cartDto: {
                                                              id: "",
                                                              userId: "",
                                                          },
                                                          variantDto: {
                                                              id: selectedVariant.id,
                                                              name: selectedVariant.name,
                                                              skuCode:
                                                                  selectedVariant.skuCode,
                                                              stockQuantity:
                                                                  selectedVariant.stockQuantity,
                                                              weight: selectedVariant.weight,
                                                              price: selectedVariant.price,
                                                              img: selectedVariant?.img,
                                                              salePrice:
                                                                  selectedVariant.salePrice,
                                                              optionValueDtoList:
                                                                  selectedVariant.optionValueDtoList,
                                                              imageDtoList:
                                                                  selectedVariant.imageDtoList,
                                                              videoDtoList:
                                                                  selectedVariant.videoDtoList,
                                                          },
                                                      })
                                                  );
                                        }}
                                        className="rounded-lg text-white bg-indigo-600 py-3 my-2 hover:bg-indigo-600 duration-100 cursor-pointer"
                                    >
                                        Add To Cart
                                    </button>
                                    <button
                                        onClick={() => {
                                            userInfo
                                                ? dispatch(
                                                      addNewCartLine({
                                                          id: "",
                                                          quantity: 1,
                                                          cartId: userInfo.id,
                                                          variantId:
                                                              variantRender.id,
                                                      }),
                                                      navigate("/cart")
                                                  )
                                                : dispatch(
                                                      addToCart({
                                                          id: "",
                                                          quantity: 1,
                                                          cartDto: {
                                                              id: "",
                                                              userId: "",
                                                          },
                                                          variantDto: {
                                                              id: selectedVariant.id,
                                                              name: selectedVariant.name,
                                                              skuCode:
                                                                  selectedVariant.skuCode,
                                                              stockQuantity:
                                                                  selectedVariant.stockQuantity,
                                                              //   weight: variantRender.weight,
                                                              price: selectedVariant.price,
                                                              img: selectedVariant?.img,
                                                              salePrice:
                                                                  selectedVariant.salePrice,
                                                              optionValueDtoList:
                                                                  selectedVariant.optionValueDtoList,
                                                              imageDtoList:
                                                                  selectedVariant.imageDtoList,
                                                              videoDtoList:
                                                                  selectedVariant.videoDtoList,
                                                              //   reviewDtoList:
                                                              //   selectedVariant.reviewDtoList,
                                                          },
                                                      }),
                                                      navigate(`/cart`)
                                                  );
                                        }}
                                        className="rounded-lg py-3 my-2 bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border
                    border-zinc-400 active:border-yellow-800 active:shadow-amazonInput duration-100 cursor-pointer"
                                    >
                                        Buy Now
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h1 className="my-4 text-2xl text-green-900">
                                        Out of Stock
                                    </h1>

                                    <button
                                        className="rounded-lg bg-yellow-400 py-3 my-2 hover:bg-yellow-300 duration-100 cursor-pointer opacity-25"
                                        disabled
                                    >
                                        Add To Cart
                                    </button>
                                </>
                            )}

                            <div className="w-full mx-auto h-auto grid grid-cols-6 gap-2 left-0 ">
                                <div className=" w-full h-full bg-white  col-span-2 font-titleFont tracking-wide text-sm text-amazon_blue text-left">
                                    Ship from
                                </div>
                                <div className="w-full h-full bg-white col-span-4 border-1">
                                    Fashion Star
                                </div>
                                <div className=" w-full h-full bg-white  col-span-2 font-titleFont tracking-wide text-sm text-amazon_blue text-left">
                                    Sold by
                                </div>
                                <div className="w-full h-full bg-white col-span-4 border-1">
                                    Fashion Star
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cart End */}
                    {/* Search comment start */}
                    <div className="container mx-auto h-auto py-4 text-bodyFont flex flex-col">
                        <h1 className="text-3xl font-bold pb-2">
                            Looking for specific info?
                        </h1>
                        <div className=" container h-10 w-2/3 rounded-md hidden lgl:flex flex-grow">
                            <span className="w-12 h-full flex items-center justify-center bg-gray-300 hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tl-md rounded-bl-md">
                                <SearchIcon />
                            </span>
                            <input
                                type="text"
                                className="h-full text-xs text-amazon_blue flex-grow outline-none border px-2 rounded-tr-md rounded-br-md"
                                placeholder="Search in reviews, Q&A..."
                            ></input>
                        </div>
                    </div>
                    <hr></hr>
                    {/* Search comment end */}
                    <div className="container mx-auto h-auto grid grid-cols-7 gap-2 text-bodyFont">
                        {/* Star Index start */}
                        {reviewAnalyst && (
                            <div className="w-full h-full col-span-2 flex flex-col py-4 border-gray-300 text-bodyFont">
                                <h1 className="text-titleFont text-2xl font-bold ">
                                    Customer reviews
                                </h1>
                                <div className="flex flex-row items-center text-center text-sm mb-2 ">
                                    <div className="text-yellow-500 items-center mr-4">
                                        <StarRating
                                            rating={
                                                reviewAnalyst.summaryDto.rating
                                            }
                                            fontSize={15}
                                        />
                                    </div>
                                    <div>
                                        {reviewAnalyst.summaryDto.rating.toFixed(
                                            0
                                        )}{" "}
                                        out of 5
                                    </div>
                                </div>
                                <span className="text-gray-400 text-xs mb-4">
                                    {reviewAnalyst.summaryDto.reviewsTotal}{" "}
                                    global ratings
                                </span>
                                <table className="text-xs border-spacing-2 border-collapse">
                                    <tbody className="text-amazon_ember">
                                        <tr className="">
                                            <td className="w-2/12	">
                                                <p
                                                    href="#"
                                                    className="decoration-0   text-left justify-between"
                                                >
                                                    {" "}
                                                    5 star
                                                </p>
                                            </td>
                                            <td className="w-8/12">
                                                <p
                                                    href="#"
                                                    className=""
                                                    title="5 star represent ...% of rating"
                                                >
                                                    <div className="overflow-hidden hover:shadow-testShadow bg-gray-200 h-5 rounded-sm">
                                                        <div
                                                            className="w-full h-full rounded-sm bg-yellow-400 transition-width ease	duration-200"
                                                            style={{
                                                                width: `${reviewAnalyst.summaryDto?.ratingBreakdown?.fiveStar.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </p>
                                            </td>
                                            <td className="w-2/12 pl-1 text-left	">
                                                {reviewAnalyst.summaryDto.ratingBreakdown?.fiveStar.percentage.toFixed(
                                                    0
                                                )}
                                                % (
                                                {
                                                    reviewAnalyst.summaryDto
                                                        .ratingBreakdown
                                                        ?.fiveStar.count
                                                }
                                                )
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td>
                                                <p className="decoration-0 text-left">
                                                    {" "}
                                                    4 star
                                                </p>
                                            </td>
                                            <td className="w-8/12	">
                                                <p
                                                    href="#"
                                                    className=""
                                                    title="5 star represent ...% of rating"
                                                >
                                                    <div className="overflow-hidden hover:shadow-testShadow bg-gray-200 h-5 rounded-sm">
                                                        <div
                                                            className="w-full h-full rounded-sm bg-yellow-400 transition-width ease	duration-200"
                                                            style={{
                                                                width: `${reviewAnalyst.summaryDto.ratingBreakdown?.fourStar.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </p>
                                            </td>
                                            <td className="w-2/12 pl-1 text-left	">
                                                {reviewAnalyst.summaryDto.ratingBreakdown?.fourStar.percentage.toFixed(
                                                    0
                                                )}
                                                % (
                                                {
                                                    reviewAnalyst.summaryDto
                                                        .ratingBreakdown
                                                        ?.fourStar.count
                                                }
                                                )
                                            </td>
                                        </tr>
                                        <tr className="mb-4">
                                            <td>
                                                <p className="decoration-0 text-left">
                                                    {" "}
                                                    3 star
                                                </p>
                                            </td>
                                            <td className="w-8/12	">
                                                <p
                                                    href="#"
                                                    className=""
                                                    title="5 star represent ...% of rating"
                                                >
                                                    <div className="overflow-hidden hover:shadow-testShadow bg-gray-200 h-5 rounded-sm">
                                                        <div
                                                            className="w-full h-full rounded-sm bg-yellow-400 transition-width ease	duration-200"
                                                            style={{
                                                                width: `${reviewAnalyst.summaryDto.ratingBreakdown?.threeStar.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </p>
                                            </td>
                                            <td className="w-2/12 pl-1 text-left">
                                                {reviewAnalyst.summaryDto.ratingBreakdown?.threeStar.percentage.toFixed(
                                                    0
                                                )}
                                                % (
                                                {
                                                    reviewAnalyst.summaryDto
                                                        .ratingBreakdown
                                                        ?.threeStar.count
                                                }
                                                )
                                            </td>
                                        </tr>
                                        <tr className="mb-4">
                                            <td>
                                                <p className="decoration-0 text-left">
                                                    {" "}
                                                    2 star
                                                </p>
                                            </td>
                                            <td className="w-8/12	">
                                                <p
                                                    href="#"
                                                    className=""
                                                    title="5 star represent ...% of rating"
                                                >
                                                    <div className="overflow-hidden hover:shadow-testShadow bg-gray-200 h-5 rounded-sm">
                                                        <div
                                                            className="w-full h-full rounded-sm bg-yellow-400 transition-width ease	duration-200"
                                                            style={{
                                                                width: `${reviewAnalyst.summaryDto.ratingBreakdown?.twoStar.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </p>
                                            </td>
                                            <td className="w-2/12 pl-1 text-left	">
                                                {reviewAnalyst.summaryDto.ratingBreakdown?.twoStar.percentage.toFixed(
                                                    0
                                                )}
                                                % (
                                                {
                                                    reviewAnalyst.summaryDto
                                                        .ratingBreakdown
                                                        ?.twoStar.count
                                                }
                                                )
                                            </td>
                                        </tr>
                                        <tr className="mt-4">
                                            <td>
                                                <p className="decoration-0   text-left">
                                                    {" "}
                                                    1 star
                                                </p>
                                            </td>
                                            <td className="w-8/12	">
                                                <p
                                                    href="#"
                                                    className=""
                                                    title="5 star represent ...% of rating"
                                                >
                                                    <div className="overflow-hidden hover:shadow-testShadow bg-gray-200 h-5 rounded-sm">
                                                        <div
                                                            className="w-full h-full rounded-sm bg-yellow-400 transition-width ease	duration-200"
                                                            style={{
                                                                width: `${reviewAnalyst.summaryDto.ratingBreakdown?.oneStar.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </p>
                                            </td>
                                            <td className="w-2/12 pl-1 text-left	">
                                                {reviewAnalyst.summaryDto.ratingBreakdown?.oneStar.percentage.toFixed(
                                                    0
                                                )}
                                                % (
                                                {
                                                    reviewAnalyst.summaryDto
                                                        .ratingBreakdown
                                                        ?.oneStar.count
                                                }
                                                )
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex flex-row h-full item-center justify-start mt-4 mb-4">
                                    {showRecommend && <ArrowDropUpIcon />}
                                    {!showRecommend && <ArrowDropDownIcon />}
                                    <span
                                        onClick={() => {
                                            setShowRecommend(!showRecommend);
                                        }}
                                        className="hover:text-yellow-600 hover:underline text-bodyFont text-xs text-amazon_ember"
                                    >
                                        How customer reviews and ratings work?
                                    </span>
                                </div>
                                {showRecommend && (
                                    <div className="flex flex-col w-10/12 text-start pl-3 font-titleFont text-sm pb-4">
                                        <span>
                                            Customer Reviews, including Product
                                            Star Ratings help customers to learn
                                            more about the product and decide
                                            whether it is the right product for
                                            them.
                                        </span>
                                        <br></br>
                                        <span>
                                            To calculate the overall star rating
                                            and percentage breakdown by star, we
                                            don’t use a simple average. Instead,
                                            our system considers things like how
                                            recent a review is and if the
                                            reviewer bought the item on Fashion
                                            star. It also analyzed reviews to
                                            verify trustworthiness.
                                        </span>
                                    </div>
                                )}
                                {/* Star Index end */}
                                <hr></hr>
                                <h1 className="text-titleFont text-2xl font-bold">
                                    Review this product
                                </h1>
                                <span className="text-bodyFont text-xs mb-4">
                                    Share your thoughts with other customers
                                </span>
                                <button className=" p-1 bg-gray-300 rounded-md text-bodyFont text-xs mb-4">
                                    Write a customer review
                                </button>
                                <hr></hr>
                            </div>
                        )}

                        <div className="w-full h-full col-span-5 flex flex-col py-4 border-gray-300 text-titleFont  ">
                            <div className="flex flex-row text-center justify-between ">
                                <h1 className="text-2xl font-bold ">
                                    Reviews product
                                </h1>
                                <div>
                                    <p className="hover:underline text-amazon_ember">
                                        See all photo
                                    </p>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                            {/* Carosel Review Image Start */}
                            <div></div>
                            <hr></hr>
                            {/* Carosel Review Image End */}
                            {/* List Review Of Customer Start */}
                            <h1 className="text-2xl font-bold mb-6">
                                Top reviews from the Viet Nam
                            </h1>
                            {reviewDTOList != null &&
                                reviewDTOList?.map((item, index) => (
                                    <div key={index} className="m-4">
                                        <div className="flex mb-2">
                                            <img
                                                src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/116429521_1655876004585921_941667011043408186_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=84a396&_nc_ohc=jX_SP-XeWGUAX8gd9Dl&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfB8K54ttI7F3njd8xLWtnInOErSx2FkaIhUXEuNjobBRw&oe=654A001A"
                                                className="rounded-full w-5 h-5"
                                                alt="Description of the image"
                                            />

                                            <div className="ml-4 text-titleFont">
                                                {item.userDto.clientName}
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="text-amazon_yellow text-sm items-center ">
                                                <StarRating
                                                    rating={item.star}
                                                    fontSize={15}
                                                />
                                            </div>
                                            <p className="text-bodyFont text-sm ml-4 font-medium hover:underline hover:text-amber-600">
                                                {" "}
                                                {item.title}
                                            </p>
                                        </div>
                                        <div className="text-bodyFont text-xs text-gray-500">
                                            Reviewed in the Viet Nam on{" "}
                                            {FormatDate(item.update_at)}.
                                        </div>
                                        <div className="text-bodyFont text-xs text-gray-500 mb-2">
                                            Variant:
                                            {variantRender.optionValueDTOList.map(
                                                (option, index) => (
                                                    <span key={index}>
                                                        {option.value} |
                                                    </span>
                                                )
                                            )}
                                            {item.verified_admin === true ? (
                                                <span className="text-amber-700 ml-2 font-bold">
                                                    Verified Purchase
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className="text-bodyFont text-xs text-black">
                                            {item.content}
                                        </div>
                                        {showComment && <ArrowDropUpIcon />}
                                        {!showComment && <ArrowDropDownIcon />}
                                        <span
                                            onClick={() => {
                                                setShowComment(!showComment);
                                            }}
                                            className="hover:text-yellow-600 underline text-bodyFont text-xs text-amazon_ember"
                                        >
                                            Comments
                                        </span>
                                        {showComment && (
                                            <div className="flex flex-col w-10/12 text-start pl-6 text-bodyFont text-xs">
                                                <div className="flex mb-1">
                                                    <imgUrl
                                                        src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/116429521_1655876004585921_941667011043408186_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=84a396&_nc_ohc=jX_SP-XeWGUAX8gd9Dl&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfB8K54ttI7F3njd8xLWtnInOErSx2FkaIhUXEuNjobBRw&oe=654A001A"
                                                        className="rounded-full w-5 h-5"
                                                    />
                                                    <div className="ml-2 text-titleFont">
                                                        {
                                                            item.userDto
                                                                .clientName
                                                        }
                                                    </div>
                                                </div>
                                                <span>
                                                    Instead, our system
                                                    considers things like how
                                                    recent a review is and if
                                                    the reviewer bought the item
                                                    on FashionStar. It also
                                                    analyzed reviews to verify
                                                    trustworthiness.
                                                </span>
                                            </div>
                                        )}
                                        <hr></hr>
                                    </div>
                                ))}
                            <hr></hr>
                            List Review Of Customer End
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetail2;
