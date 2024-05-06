import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {useNavigate, createSearchParams} from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import {
    category_0,
    category_1,
    category_2,
    category_3,
    category_4,
    category_5,
} from "../../../assets";

const CarouselCategory = () => {
    const navigate = useNavigate();
    const searchCategory = (category) => {
        navigate({
            pathname: "search",
            search: `${createSearchParams({
                category: `${category}`,
                searchTerm: ``,
            })}`,
        });
    };

    return (
        <div className="bg-white m-3">
            <div className="text-2xl font-semibold p-3">Shop by Category</div>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
            >
                <SwiperSlide
                    onClick={() => searchCategory("Deals")}
                    className="cursor-pointer"
                >
                    <img src={category_0} alt="Deal category" />
                </SwiperSlide>
                <SwiperSlide
                    onClick={() => searchCategory("Amazon")}
                    className="cursor-pointer"
                >
                    <img src={category_1} alt="Amazon category" />
                </SwiperSlide>
                <SwiperSlide
                    onClick={() => searchCategory("Fashion")}
                    className="cursor-pointer"
                >
                    <img src={category_2} alt="Fashion category" />
                </SwiperSlide>
                <SwiperSlide
                    onClick={() => searchCategory("Computers")}
                    className="cursor-pointer"
                >
                    <img src={category_3} alt="Computers category" />
                </SwiperSlide>
                <SwiperSlide
                    onClick={() => searchCategory("Home")}
                    className="cursor-pointer"
                >
                    <img src={category_4} alt="Home category" />
                </SwiperSlide>
                <SwiperSlide
                    onClick={() => searchCategory("Mobiles")}
                    className="cursor-pointer"
                >
                    <img src={category_5} alt="Mobiles category" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CarouselCategory;
