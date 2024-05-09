import React, {Fragment, useEffect, useState} from "react";
import {logoDearman} from "../../../assets";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeaderBottom from "./HeaderBottom";
import {allItems} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {logOutUser} from "../../../features/user/userSlice";
import {resetCart, resetSaveForLater} from "../../../features/cart/cartSlice";
import {useRef} from "react";

function Header() {
    const [showAll, setShowAll] = useState(false);
    const [showUserOption, setShowUserOption] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const {products} = useSelector((state) => state.cart);
    const [numberCart, setNumberCart] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        let quantity = 0;
        products.map((item) => {
            quantity += item.quantity;
            return setNumberCart(quantity);
        });
    }, [products]);

    const handleLogOut = async () => {
        dispatch(logOutUser());
        dispatch(resetCart());
        dispatch(resetSaveForLater());
        window.localStorage.removeItem("token");
        navigate("/signin");
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowUserOption(false);
        }, 1000);
    };
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowUserOption(true);
    };
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return (
        <div>
            <div className="w-full sticky top-0 z-[10]">
                <div className="w-full bg-indigo-600 text-white px-4 py-1 flex items-center gap-4">
                    {/* Logo start */}
                    <div onClick={() => navigate("/")} className="headerHover">
                        <img
                            className="w-[6rem] mt-0"
                            src={logoDearman}
                            alt="logo"
                        ></img>
                    </div>
                    {/* Logo end */}

                    {/* Searchbar start */}
                    <div className="h-10 rounded-md hidden lgl:flex flex-grow relative">
                        {/* <span
                            onClick={() => {
                                setShowAll(!showAll);
                            }}
                            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
                        >
                            All<span></span>
                            <ArrowDropDownIcon />
                        </span> */}
                        {showAll && (
                            <div>
                                <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50">
                                    <li className="text-sm tracking-wide font-titlefont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200">
                                        All Departments
                                    </li>
                                    {allItems.map((item) => (
                                        <li className="text-sm tracking-wide font-titlefont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200">
                                            {item.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <span className=" w-30 bg-white flex items-center justify-center">
                            <SearchIcon style={{color: "#243B67"}} />
                        </span>
                        <input
                            type="text"
                            className="h-full text-base text-amazon_blue flex-grow outline-none border-none"
                            placeholder="Search"
                        ></input>
                        <span
                            className="w-40 h-full flex items-center justify-center bg-white hover:bg-[#F5D7DB] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md"
                            style={{padding: "0 10px"}}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    height: "80%",
                                    margin: "10% 0",
                                    marginRight: "5px",
                                    borderRight: "0.5px solid black",
                                }}
                            ></span>
                            Search
                        </span>
                    </div>
                    {/* Searchbar end */}

                    {/* Signin start */}
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="flex flex-col items-start justify-center headerHover"
                    >
                        {userInfo ? (
                            <p className="text-xs text-lightText font-light">
                                Hello, {userInfo.clientName}
                            </p>
                        ) : (
                            <p
                                className="text-xs text-lightText font-light"
                                onClick={() => {
                                    navigate("/signin");
                                }}
                            >
                                Hello, sign in
                            </p>
                        )}

                        <p className="text-sm font-semibold -m1-1 text-whiteText hidden mdl:inline-flex">
                            Accounts & Lists
                            <span>
                                <ArrowDropDownIcon />
                            </span>
                        </p>

                        {showUserOption && (
                            <div
                                onMouseEnter={() => {
                                    setShowUserOption(true);
                                }}
                                onMouseLeave={() => {
                                    setShowUserOption(false);
                                }}
                                className=" z-20 lg:top-[50px] md:top-[42px] sm:top-[36px] lg:right-[180px] mdl:right-[320px] sm:right-[180px] px-1 font-bodyFont absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow mdl:w-[240px] sm:w-[180px] dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="font-bodyFont py-2 mdl:text-sm sm:text-xs text-gray-700 dark:text-gray-400"
                                    aria-labelledby="dropdownLargeButton"
                                >
                                    <li className="mx-auto text-center flex flex-col gap-1 justify-between p-2 border-b rounded-t dark:border-gray-600">
                                        {userInfo ? (
                                            <Fragment>
                                                <Link to="/userProfile">
                                                    <button
                                                        className="w-full py-1 text-sm font-semibold
              rounded-md bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border
              border-zinc-400 active:border-indigo-800 active:shadow-amazonInput"
                                                    >
                                                        Manage Profiles
                                                    </button>
                                                </Link>

                                                <p className="text-xs mt-1 text-black">
                                                    Who shopping? Select a
                                                    profile.
                                                </p>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <Link to="/signin">
                                                    <button
                                                        className="w-full text-white bg-indigo-600 rounded-md py-1
                font-semibold cursor-pointer hover:bg-indigo-500 active:bg-indigo-700"
                                                    >
                                                        Sign in
                                                    </button>
                                                </Link>
                                                <p className="text-xs mt-1">
                                                    New Customer?
                                                    <Link to="/register">
                                                        <span className="text-indigo-600 ml-1 cursor-pointer">
                                                            {" "}
                                                            Start here.
                                                        </span>
                                                    </Link>
                                                </p>
                                            </Fragment>
                                        )}
                                    </li>
                                    <li>
                                        <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <FavoriteBorderIcon />
                                            &nbsp; Your wishlist
                                        </p>
                                    </li>
                                    <li>
                                        <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <HistoryIcon />
                                            &nbsp; Browsing History
                                        </p>
                                    </li>
                                    <li>
                                        <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <LocalShippingIcon />
                                            &nbsp; Orders
                                        </p>
                                    </li>
                                    {userInfo && (
                                        <li>
                                            <p
                                                onClick={() => {
                                                    handleLogOut();
                                                }}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                <LogoutIcon />
                                                &nbsp; Sign out
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Signin end */}

                    {/* Orders start */}
                    <Link to="/order">
                        <div className="hidden lgl:flex flex-col items-start justify-center headerHover">
                            <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light">
                                Returns
                            </p>
                            <p className="text-sm font-semibold -mt-1 text-whiteText">
                                & Orders
                            </p>
                        </div>
                    </Link>

                    {/* Orders end */}

                    {/* Carts start */}
                    <Link to="/cart">
                        <div className="flex items-start justify-center headerHover relative">
                            <ShoppingCartIcon />
                            <p className="text-xs font-semibold mt-3 text-whiteText">
                                Cart{" "}
                                <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                                    {products.length > 0 ? numberCart : 0}
                                </span>
                            </p>
                        </div>
                    </Link>
                    {/* Carts end */}
                </div>
                <HeaderBottom />
            </div>
        </div>
    );
}

export default Header;
