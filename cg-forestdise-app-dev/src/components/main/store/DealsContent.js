import React, {useEffect, useState} from "react";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function DealsContent() {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const storeInfo = useSelector((state) => state.sellerStore.storeInfo);
    const categories = useSelector((state) => state.sellerStore.categories);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        await axios
            .get(`http://localhost:5454/api/stores/${storeInfo.id}/products`)
            .then((res) => {
                setProductData(res.data);
            })
            .catch((err) => {
                throw err;
            });
    }

    return (
        <div className="font-shopFont">
            <div className="w-full h-full text-center pt-4 text-3xl font-light text-gray-600">
                Featured Deals
            </div>
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4 pt-10 z-0 pb-4">
                {productData.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white h-auto border-[1px] border-gray-200 py-8
            hover:border-transparent shadow-none hover:shadow-testShadow duration-200 flex
            flex-col gap-4 relative"
                    >
                        <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
                            {product.category}
                        </span>
                        <div
                            className="w-full h-auto flex items-center justify-center relative
            group"
                        >
                            <img
                                className="w-52 h-64 object-contain"
                                src={product.mainPicture}
                                alt="ProductImg"
                            ></img>
                            <ul
                                className="w-full h-36 bg-gray-100 absolute bottom-[-170px] flex flex-col items-end justify-center gap-2
            font-titleFont px-2 border-1 border-r group-hover:bottom-0 duration-700"
                            >
                                <li className="productLi">
                                    Compare
                                    <span>
                                        <ApiIcon />
                                    </span>
                                </li>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="productLi"
                                >
                                    View Details
                                    <span>
                                        <ArrowCircleRightIcon />
                                    </span>
                                </Link>
                                <li className="productLi">
                                    Add to Wish List
                                    <span>
                                        <FavoriteIcon />
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 z-0 bg-white">
                            <div className="flex items-center justify-between">
                                <h2
                                    className="font-titleFont tracking-wide text-lg text-amazon_blue
              font-medium"
                                >
                                    {product.title.substring(0, 40)}...
                                </h2>
                            </div>
                            <div>
                                <div>
                                    <p className="text-sm">
                                        {product.description.substring(0, 100)}
                                        ...
                                    </p>
                                </div>
                                <div className="text-yellow-500">
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    navigate(`/product/${product.id}`)
                                }
                                className="w-full font-titleFont font-medium text-base bg-gradient-to-tr
            from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400
            border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl
            active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white w-full h-[732px]">
                <div className="grid grid-cols-4 gap-2 relative px-4 py-4">
                    {categories
                        .filter(
                            (category) => category.parentStoreCategory === null
                        )
                        .map(
                            (category, index) =>
                                index <= 7 && (
                                    <div
                                        key={category.id}
                                        className="w-[356px] h-[356px] cursor-pointer border-[1px] border-gray-200 rounded-[12px]  bg-gray-200
             shadow-none hover:shadow-testShadow hover:rounded-[12px] duration-200"
                                    >
                                        <img
                                            className="mx-auto"
                                            src={category.squareImage}
                                        ></img>
                                    </div>
                                )
                        )}
                </div>
            </div>
        </div>
    );
}

export default DealsContent;
