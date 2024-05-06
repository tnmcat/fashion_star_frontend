import React, {Fragment, useEffect, useRef, useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideNavContent from "./SideNavContent";
import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Transition} from "@headlessui/react";
import {Dialog, Popover, Tab} from "@headlessui/react";
import {navigation} from "./headerData";
import {XMarkIcon} from "@heroicons/react/24/outline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function HeaderBottom() {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [sideBar, setSidebar] = useState(false);
    const motionDivRef = useRef();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        function hideSideBar(e) {
            if (e.target.contains(motionDivRef.current)) {
                setSidebar(false);
            }
        }

        document.body.addEventListener("click", (e) => {
            hideSideBar(e);
        });

        return document.body.removeEventListener("click", (e) => {
            hideSideBar(e);
        });
    }, []);
    const handleCategoryClick = (category, section, item, close) => {
        navigate(`/${category.id}/${section.id}/${item.id}`);
        close();
    };
    return (
        <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setOpen}
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
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map(
                                                (category) => (
                                                    <Tab
                                                        key={category.name}
                                                        className={({
                                                            selected,
                                                        }) =>
                                                            classNames(
                                                                selected
                                                                    ? "border-indigo-600 text-indigo-600"
                                                                    : "border-transparent text-gray-900",
                                                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                                                            )
                                                        }
                                                    >
                                                        {category.name}
                                                    </Tab>
                                                )
                                            )}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map(
                                            (category) => (
                                                <Tab.Panel
                                                    key={category.name}
                                                    className="space-y-10 px-4 pb-8 pt-10"
                                                >
                                                    <div className="grid grid-cols-2 gap-x-4">
                                                        {category.featured.map(
                                                            (item) => (
                                                                <div
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    className="group relative text-sm"
                                                                >
                                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                        <img
                                                                            src={
                                                                                item.imageSrc
                                                                            }
                                                                            alt={
                                                                                item.imageAlt
                                                                            }
                                                                            className="object-cover object-center"
                                                                        />
                                                                    </div>
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="mt-6 block font-medium text-gray-900"
                                                                    >
                                                                        <span
                                                                            className="absolute inset-0 z-10"
                                                                            aria-hidden="true"
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                    <p
                                                                        aria-hidden="true"
                                                                        className="mt-1"
                                                                    >
                                                                        Shop now
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    {category.sections.map(
                                                        (section) => (
                                                            <div
                                                                key={
                                                                    section.name
                                                                }
                                                            >
                                                                <p
                                                                    id={`${category.id}-${section.id}-heading-mobile`}
                                                                    className="font-medium text-gray-900 cursor-pointer"
                                                                >
                                                                    {
                                                                        section.name
                                                                    }
                                                                </p>
                                                                <ul
                                                                    role="presentation"
                                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                    className="mt-6 flex flex-col space-y-6"
                                                                >
                                                                    {section.items.map(
                                                                        (
                                                                            item
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    item.name
                                                                                }
                                                                                className="flow-root"
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        item.href
                                                                                    }
                                                                                    className="-m-2 block p-2 text-gray-500"
                                                                                >
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )
                                                    )}
                                                </Tab.Panel>
                                            )
                                        )}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div
                                            key={page.name}
                                            className="flow-root"
                                        >
                                            <a
                                                href={page.href}
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* ListItem start */}
            <ul className="flex items-center gap-2 text-sm tracking-wide">
                <li
                    onClick={() => {
                        setSidebar(true);
                    }}
                    className="headerHover flex items-center gap-1"
                >
                    <MenuIcon />
                    All
                </li>

                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-0">
                    <div className="flex h-full space-x-8">
                        {navigation.categories.map((category) => (
                            <Popover key={category.name} className="flex">
                                {({open, close}) => (
                                    <>
                                        <div className="relative flex">
                                            <Popover.Button
                                                className={classNames(
                                                    open
                                                        ? "border-indigo-600 text-indigo-600"
                                                        : "border-transparent text-white-700 hover:text-white-800",
                                                    "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                                )}
                                            >
                                                <ArrowDropDownIcon />{" "}
                                                {category.name}
                                            </Popover.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                <div
                                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                                    aria-hidden="true"
                                                />

                                                <div className="relative bg-white">
                                                    <div className="mx-auto max-w-7xl px-8">
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                {category.featured.map(
                                                                    (item) => (
                                                                        <div
                                                                            key={
                                                                                item.name
                                                                            }
                                                                            className="group relative text-base sm:text-sm"
                                                                        >
                                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                <img
                                                                                    src={
                                                                                        item.imageSrc
                                                                                    }
                                                                                    alt={
                                                                                        item.imageAlt
                                                                                    }
                                                                                    className="object-cover object-center"
                                                                                />
                                                                            </div>
                                                                            <a
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                className="mt-6 block font-medium text-gray-900"
                                                                            >
                                                                                <span
                                                                                    className="absolute inset-0 z-10"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </a>
                                                                            <p
                                                                                aria-hidden="true"
                                                                                className="mt-1"
                                                                            >
                                                                                Shop
                                                                                now
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                {category.sections.map(
                                                                    (
                                                                        section
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                section.name
                                                                            }
                                                                        >
                                                                            <p
                                                                                id={`${section.name}-heading`}
                                                                                className="font-medium text-gray-900 cursor-pointer"
                                                                            >
                                                                                {
                                                                                    section.name
                                                                                }
                                                                            </p>
                                                                            <ul
                                                                                role="presentation"
                                                                                aria-labelledby={`${section.name}-heading`}
                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4 cursor-pointer"
                                                                            >
                                                                                {section.items.map(
                                                                                    (
                                                                                        item
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                item.name
                                                                                            }
                                                                                            className="flex"
                                                                                        >
                                                                                            <p
                                                                                                onClick={() =>
                                                                                                    handleCategoryClick(
                                                                                                        category,
                                                                                                        section,
                                                                                                        item,
                                                                                                        close
                                                                                                    )
                                                                                                }
                                                                                                className="hover:text-gray-800"
                                                                                            >
                                                                                                {
                                                                                                    item.name
                                                                                                }
                                                                                            </p>
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        ))}

                        {/* {navigation.pages.map((page) => (
                            <a
                                key={page.name}
                                href={page.href}
                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                            >
                                {page.name}
                            </a>
                        ))} */}
                    </div>
                </Popover.Group>

                <Link to="/selling">
                    <li className="headerHover hidden md:inline-flex">
                        I want to sell something!
                    </li>
                </Link>
                <li className="headerHover hidden md:inline-flex">
                    Today's Deal
                </li>

                {/* Deliver start */}
                <div
                    className="headerHover hidden mdl:inline-flex"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                    }}
                >
                    <LocationOnIcon />
                    <p className="text-sm text-lightText font-light">
                        Deliver to&nbsp;
                        <span className="text-sm font-semibold text-whiteText">
                            Vietnam
                        </span>
                    </p>
                </div>
                {/* Deliver end */}
            </ul>
            {/* ListItem end */}

            {/* SideNav start */}
            {sideBar && (
                <div
                    className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue
            bg-opacity-50"
                >
                    <div className="w-full h-full relative z-50">
                        <motion.div
                            ref={motionDivRef}
                            initial={{x: -500, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                            className="w-[80%] md:w-[350px] h-full bg-white border border-black overflow-y-auto"
                        >
                            <div
                                className="w-full bg-amazon_light text-white py-2 px-6 flex items-center
              gap-4"
                            >
                                <AccountCircleIcon />
                                {userInfo ? (
                                    <h3 className="font-titleFont font-bold text-lg tracking-wide hover:text-blue-300 hover:underline underline-offset-1">
                                        Hello, {userInfo.clientName}
                                    </h3>
                                ) : (
                                    <Link to="/signin">
                                        <h3 className="font-titleFont font-bold text-lg tracking-wide hover:text-blue-300 hover:underline underline-offset-1">
                                            Hello, Sign In
                                        </h3>
                                    </Link>
                                )}
                            </div>
                            <SideNavContent
                                title="Digital Content & Devices"
                                one="Amazon Music"
                                two="Kindle E-readders & Books"
                                three="Amazon Appstore"
                            />
                            <SideNavContent
                                title="Shop By Department"
                                one="Electronics"
                                two="Computers"
                                three="Smart Home"
                            />
                            <SideNavContent
                                title="Programs & Features"
                                one="Gift Cards"
                                two="Amazon live"
                                three="International Shopping"
                            />
                            <SideNavContent
                                title="Help & Settings"
                                one="Your Account"
                                two="Customer Service"
                                three="Contact Us"
                            />
                            <span
                                onClick={() => {
                                    setSidebar(false);
                                }}
                                className="cursor-pointer absolute top-0 left-[82%] md:left-[360px]
            w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500
            hover:text-white duration-300"
                            >
                                <CloseIcon />
                            </span>
                        </motion.div>
                    </div>
                </div>
            )}
            {/* SideNav end */}
        </div>
    );
}

export default HeaderBottom;
