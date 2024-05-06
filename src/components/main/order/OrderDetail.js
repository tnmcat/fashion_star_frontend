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

    console.log("books===>", isVisible);
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
                                <div className="flex-initial">
                                    <p className=" text-end text-lg mr-3 font-bold">
                                        {order.order_status}
                                    </p>

                                    {/* <Modal
                                    isOpen={isModalOpen}
                                    onRequestClose={() => setIsModalOpen(false)}
                                    contentLabel="Review Product"
                                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-3/6 rounded-lg border border-gray-400"
                                >
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute right-2 my-5  text-gray-600 hover:text-lime-400-500 rounded-md border-4 border-sky-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                    <div className="">
                                        <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                                            {rated}.0
                                            <Rating
                                                value={4}
                                                onChange={(value) =>
                                                    setRated(value)
                                                }
                                            />
                                            <Typography
                                                color="blue-gray"
                                                className="font-medium text-blue-gray-500"
                                            >
                                                Your comment is the best of the
                                                best, Sir!!!!
                                            </Typography>
                                        </div>
                                        <Card
                                            color="transparent"
                                            shadow={false}
                                        >
                                            <Typography
                                                variant="h4"
                                                color="blue-gray"
                                            >
                                                Review
                                            </Typography>
                                            <Typography
                                                color="gray"
                                                className="mt-1 font-normal"
                                            >
                                                Nice to meet you! Enter your
                                                details to review.
                                            </Typography>
                                            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                                                <div className="mb-1 flex flex-col gap-6">
                                                    <Typography
                                                        variant="h6"
                                                        color="blue-gray"
                                                        className="-mb-3"
                                                    >
                                                        Title
                                                    </Typography>
                                                    <Input
                                                        size="lg"
                                                        placeholder="Enter the hot title"
                                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                        labelProps={{
                                                            className:
                                                                "before:content-none after:content-none",
                                                        }}
                                                        value={title}
                                                        onChange={(event) =>
                                                            setTitle(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <Typography
                                                        variant="h6"
                                                        color="blue-gray"
                                                        className="-mb-3"
                                                    >
                                                        Content
                                                    </Typography>
                                                    <Input
                                                        size="lg"
                                                        placeholder="Your review is very important for us to improve our service"
                                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                        labelProps={{
                                                            className:
                                                                "before:content-none after:content-none",
                                                        }}
                                                        value={content}
                                                        onChange={(event) =>
                                                            setContent(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />

                                                    <Input
                                                        type="password"
                                                        size="lg"
                                                        placeholder="********"
                                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                        labelProps={{
                                                            className:
                                                                "before:content-none after:content-none",
                                                        }}
                                                    />
                                                </div>
                                                <Checkbox
                                                    label={
                                                        <Typography
                                                            variant="small"
                                                            color="gray"
                                                            className="flex items-center font-normal"
                                                        >
                                                            I agree the
                                                            <a
                                                                href="/#"
                                                                className="font-medium transition-colors hover:text-gray-900"
                                                            >
                                                                &nbsp;Terms and
                                                                Conditions
                                                            </a>
                                                        </Typography>
                                                    }
                                                    containerProps={{
                                                        className: "-ml-2.5",
                                                    }}
                                                />
                                                <Button
                                                    className="mt-6 text-indigo-700"
                                                    fullWidth
                                                    onClick={submit}
                                                >
                                                    Done !
                                                </Button>
                                            </form>
                                        </Card>
                                    </div>
                                </Modal> */}
                                </div>
                                {order.order_status === "COMPLETED" ? (
                                    <button
                                        className=" bg-amazon_yellow p-2 rounded-lg"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? "Hide" : "Show"}
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
                        {order.orderTotal}
                    </p>
                </div>
            </div>
            {isVisible ? (
                <OrderReview toggleVisibility={toggleVisibility} />
            ) : (
                ""
            )}
        </div>
    );
};

export default OrderDetail;
