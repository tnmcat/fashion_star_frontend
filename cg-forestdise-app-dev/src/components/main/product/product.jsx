import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {filters, singleFilter} from "./filterData";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {useDispatch, useSelector} from "react-redux";

import {getProducts} from "../../../features/home/homeSlice";
import {setStore} from "../../../features/sellerStore/sellerStoreSlice";
import StarIcon from "@mui/icons-material/Star";
// import {findProduct} from "State/Product/Action";
import "../product/productCard.css";
export const sortOptions = [
    {name: "Price: Low to High", href: "#", current: false},
    {name: "Price: High to Low", href: "#", current: false},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ShowProduct() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.home);
    const {userInfo} = useSelector((state) => state.user);
    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);
    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const priceValue = searchParams.get("price");
    const discount = searchParams.get("discount");
    const sortValue = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");
    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);

        let filterValue = searchParams.getAll(sectionId);
        if (
            filterValue.length > 0 &&
            filterValue[0].split(",").includes(value)
            //54:52p clip 11
        ) {
            filterValue = filterValue[0]
                .split(",")
                .filter((item) => item !== value);

            if (filterValue.length === 0) {
                searchParams.delete(sectionId);
            }
        } else {
            filterValue.push(value);
        }
        if (filterValue.length > 0) {
            searchParams.set(sectionId, filterValue.join(","));
        }
        const query = searchParams.toString();
        navigate({search: `?${query}`});
    };
    const handleRadioFilterChange = (e, sectionId) => {
        const searchParams = new URLSearchParams(location.search);

        searchParams.set(sectionId, e.target.value);
        const query = searchParams.toString();
        navigate({search: `?${query}`});
    };
    useEffect(() => {
        const [minPrice, maxPrice] =
            priceValue === null
                ? [0, 10000]
                : priceValue.split("-").map(Number);
        const data = {
            category: param.lavelThree,
            colors: colorValue || [],
            sizes: sizeValue || [],
            minPrice,
            maxPrice,
            minDiscount: discount || 0,
            sort: sortValue || "price_low",
            pageNumber: pageNumber - 1,
            pageSize: 5,
            stock: stock,
        };
        // dispatch(findProduct(data));
    }, [
        param.lavelThree,
        colorValue,
        sizeValue,
        priceValue,
        discount,
        sortValue,
        pageNumber,
        stock,
        dispatch,
    ]);
    const handlePaginationChange = (event, value) => {
        //event là sự kiện để pagination là tham số đầu tiên truyền vào
        // còn value là tham số thứ 2 coi là giá trị trang
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", value);
        const query = searchParams.toString();
        navigate({search: `${query}`});
    };
    useEffect(() => {
        if (products.length < 1) {
            dispatch(getProducts());
        }
    }, [dispatch, products, userInfo]);
    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() =>
                                                setMobileFiltersOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({open}) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        section.name
                                                                    }
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map(
                                                                    (
                                                                        option,
                                                                        optionIdx
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                option.value
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                onChange={() =>
                                                                                    handleFilter(
                                                                                        option.value,
                                                                                        section.id
                                                                                    )
                                                                                }
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={
                                                                                    option.value
                                                                                }
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    option.checked
                                                                                }
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                <main className="mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            New Arrivals
                        </h1>

                        <div className="flex items-center">
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({active}) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current
                                                                    ? "font-medium text-gray-900"
                                                                    : "text-gray-500",
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm"
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                            >
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                    <section
                        aria-labelledby="products-heading"
                        className="pb-24 pt-6"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                            <form className="hidden lg:block">
                                <div>
                                    <div className="py-10 flex justify-between items-center">
                                        <h1 className="text-lg opacity-50 font-bold">
                                            Filters
                                        </h1>
                                        <FilterListIcon />
                                        {/* //icon cái phiễu */}
                                    </div>
                                </div>
                                <form className="mt-4 border-t border-gray-200">
                                    {filters.map((section) => (
                                        <Disclosure
                                            as="div"
                                            key={section.id}
                                            className="border-b border-gray-200 py-6"
                                        >
                                            {({open}) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">
                                                                {section.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map(
                                                                (
                                                                    option,
                                                                    optionIdx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            option.value
                                                                        }
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            onChange={() =>
                                                                                handleFilter(
                                                                                    option.value,
                                                                                    section.id
                                                                                )
                                                                            }
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={
                                                                                option.value
                                                                            }
                                                                            type="checkbox"
                                                                            defaultChecked={
                                                                                option.checked
                                                                            }
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-600"
                                                                        >
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                                {singleFilter?.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({open}) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        {/* <span className="font-medium"> </span> */}
                                                        <FormLabel
                                                            sx={{
                                                                color: "black",
                                                            }}
                                                            className="text-gray-900"
                                                            id="demo-radio-buttons-group-label"
                                                        >
                                                            {section.name}
                                                        </FormLabel>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                defaultValue="female"
                                                                name="radio-buttons-group"
                                                            >
                                                                {section.option.map(
                                                                    (
                                                                        option,
                                                                        optionIdx
                                                                    ) => (
                                                                        <>
                                                                            <FormControlLabel
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleRadioFilterChange(
                                                                                        e,
                                                                                        section.id
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    option.value
                                                                                }
                                                                                control={
                                                                                    <Radio />
                                                                                }
                                                                                label={
                                                                                    option.value
                                                                                }
                                                                            />
                                                                        </>
                                                                    )
                                                                )}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                                {/* <Autocomplete
                                    multiple
                                    id="category"
                                    options={Category}
                                    getOptionLabel={(option) => option?.value}
                                    defaultValue={[Category[13]]}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Category"
                                            placeholder="Categories"
                                        />
                                    )}
                                /> */}
                            </form>
                            {/* Product grid */}
                            <div className="lg:col-span-4 w-full z-0">
                                <div className="flex flex-wrap justify-center bg-white py-5">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="productCard w-[15rem] m-3 transition-all cursor-pointer border-[1px]
                                            border-gray-200 py-3 px-2 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 flex
                                                 flex-col gap-4 relative boxbox"
                                            // className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30
                                            // hover:border-transparent shadow-none hover:shadow-testShadow duration-200 flex
                                            // flex-col gap-4 relative"
                                        >
                                            <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
                                                {product.category}
                                            </span>
                                            <div className=" w-full h=[20rem] overflow-hidden relative">
                                                <img
                                                    className="w-52 h-64 object-contain cursor-pointer"
                                                    src={product.mainPicture}
                                                    alt="ProductImg"
                                                    onClick={() =>
                                                        navigate(
                                                            `/product/${product.id}`
                                                        )
                                                    }
                                                ></img>
                                                <ul
                                                    className="w-full h-10 bg-gray-100 absolute bottom-[-170px] flex flex-col items-end justify-center gap-2
            font-titleFont px-2 border-1 border-r group-hover:bottom-0 duration-700"
                                                >
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                        className="productLi"
                                                    >
                                                        <span
                                                            onClick={() => {
                                                                dispatch(
                                                                    setStore(
                                                                        product
                                                                            .store
                                                                            .id
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            View Details
                                                            <ArrowCircleRightIcon />
                                                        </span>
                                                    </Link>
                                                </ul>
                                            </div>
                                            <div className=" border textPart bg-white p-3">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                                                        {" "}
                                                        {product.title.substring(
                                                            0,
                                                            20
                                                        )}
                                                        ...
                                                    </h2>
                                                </div>
                                                <div>
                                                    <div>
                                                        <p className="text-sm">
                                                            {product.description.substring(
                                                                0,
                                                                50
                                                            )}
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
                                                    onClick={() => {
                                                        dispatch(
                                                            setStore(
                                                                product.store.id
                                                            )
                                                        );
                                                        navigate(
                                                            `/product/${product.id}`
                                                        );
                                                    }}
                                                    className="w-full text-white font-titleFont font-medium text-base bg-gradient-to-tr
            from-indigo-600 to-indigo-600 border hover:from-indigo-400 hover:to-indigo-600
            border-indigo-500 hover:border-indigo-700 active:bg-gradient-to-bl
            active:from-indigo-400 active:to-indigo-500 duration-200 py-1.5 rounded-md mt-3"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30
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
                                className="w-full h-10 bg-gray-100 absolute bottom-[-170px] flex flex-col items-end justify-center gap-2
            font-titleFont px-2 border-1 border-r group-hover:bottom-0 duration-700"
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    className="productLi"
                                >
                                    <span
                                        onClick={() => {
                                            dispatch(
                                                setStore(product.store.id)
                                            );
                                        }}
                                    >
                                        View Details
                                        <ArrowCircleRightIcon />
                                    </span>
                                </Link>
                            </ul>
                        </div>
                        <div className="px-4 z-10 bg-white">
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
                                onClick={() => {
                                    dispatch(setStore(product.store.id));
                                    navigate(`/product/${product.id}`);
                                }}
                                className="w-full text-white font-titleFont font-medium text-base bg-gradient-to-tr
            from-indigo-600 to-indigo-600 border hover:from-indigo-400 hover:to-indigo-600
            border-indigo-500 hover:border-indigo-700 active:bg-gradient-to-bl
            active:from-indigo-400 active:to-indigo-500 duration-200 py-1.5 rounded-md mt-3"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
