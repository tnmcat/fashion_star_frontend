import {
    Button,
    Card,
    Checkbox,
    Input,
    Rating,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import {addReview} from "../../../features/coment_review/reviewSlide";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const OrderReview = ({variandId, toggleVisibility}) => {
    console.log(variandId);
    const {userInfo} = useSelector((state) => state.user);
    const [star, setStar] = React.useState(4);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [rated, setRated] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submit = () => {
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
    };
    return (
        <div className="fixed top-1/2 left-2/4 z-10 bg-opacity-95 bg-slate-50 border-solid p-20 w-full h-full -translate-y-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                {rated}
                <Rating value={4} onChange={(value) => setRated(value)} />
                <Typography
                    color="blue-gray"
                    className="font-medium text-blue-gray-500"
                >
                    Your comment is the best of the best, Sir!!!!
                </Typography>
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
                            onChange={(event) => setTitle(event.target.value)}
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
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="w-1/2 bg-slate-500"
                            onClick={toggleVisibility}
                        >
                            Back
                        </button>
                        <Button
                            className="mt-6 text-indigo-700 w-1/2"
                            onClick={submit}
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
