import {
    Button,
    Card,
    Input,
    Rating,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addReview} from "../../../features/coment_review/reviewSlide";
import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";
const OrderReview = ({variandId, toggleVisibility, setOrderId}) => {
    const {userInfo} = useSelector((state) => state.user);
    const [star, setStar] = React.useState(4);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [rated, setRated] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const canSubmit =
        title.length > 0 &&
        title.length <= 30 &&
        content.length > 0 &&
        content.length <= 150;

    const submit = () => {
        setOrderId(variandId.id);
        if (canSubmit) {
            const review = {
                star: rated,
                title: title,
                content: content,
            };
            dispatch(
                addReview({
                    review: review,
                    userId: userInfo.id,
                    variantId: variandId.id,
                })
            );
            toast.success("Thank you for your review!"); // Show success toast
        }
        toggleVisibility(); // Optionally close the modal
    };

    return (
        <div className="fixed top-1/2 left-2/4 z-10 bg-opacity-95 bg-slate-50 border-solid p-20 w-3/4 h-3/4 -translate-y-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                {rated}.0
                <Rating value={4} onChange={(value) => setRated(value)} />
                <img
                    className="w-[8rem] h-[8rem] object-contain object-top"
                    src={variandId.img}
                    alt=""
                />{" "}
                <div className="ml-5 space-y-3">
                    <p className="opacity-50 text-xs font-semibold">
                        Name: {variandId.name}{" "}
                    </p>
                    <p className="opacity-50 text-xs font-semibold">
                        Price: {variandId.price}
                    </p>
                </div>
                <Typography
                    color="blue-gray"
                    className="font-medium text-blue-gray-500"
                ></Typography>
            </div>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Review
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to review.
                </Typography>
                <form className="mt-8 mb-2 w-full max-w-screen-lg">
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
                            onChange={(e) =>
                                setTitle(e.target.value.slice(0, 30))
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
                            className=" !border-t-blue-indigo-200 focus:!border-t-indigo-900"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value.slice(0, 150))
                            }
                        />
                    </div>
                    <div className="flex justify-between py-5">
                        <Button
                            className="w-1/2 bg-indigo-700 text-white border-solid mr-3"
                            onClick={toggleVisibility}
                        >
                            Back
                        </Button>
                        <Button
                            className=" text-indigo-700 w-1/2 border-double"
                            onClick={submit}
                            disabled={!canSubmit} // Disable the button if conditions aren't met
                        >
                            Done !
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default OrderReview;
