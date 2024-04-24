import React, {useState} from "react";
import Slider from "react-slick";
import {
    bannerImgOne,
    bannerImgTwo,
    bannerImgThree,
    bannerImgFour,
    bannerImgFive,
} from "../../../assets";

function Banner() {
    const [bannerActive, setBannerActive] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: false, //mốt nhớ đổi thành true
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (prev, next) => {
            setBannerActive(next);
        },
        appendDots: (dots) => (
            <div
                style={{
                    position: "absolute",
                    top: "70%",
                    left: "0",
                    right: "0",
                    margin: "0 auto",
                    transform: "translate(-50% -50%)",
                    width: "210px",
                }}
            >
                <ul
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {" "}
                    {dots}{" "}
                </ul>
            </div>
        ),
        customPaging: (i) => (
            <div
                style={
                    i === bannerActive
                        ? {
                              width: "30px",
                              display: "inline-block",
                              margin: "0 5px",
                          }
                        : {
                              width: "30px",
                              display: "inline-block",
                              margin: "0 5px",
                          }
                }
            >
                <hr
                    style={
                        i === bannerActive
                            ? {
                                  border: "none",
                                  height: "5px",
                                  background: "#f3a847",
                              }
                            : {
                                  border: "none",
                                  height: "5px",
                                  background: "rgba(255, 255, 255, 0.5)",
                              }
                    }
                />
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full">
            <div className="w-full h-full relative">
                <Slider {...settings}>
                    <div>
                        <img src={bannerImgOne} alt="banner"></img>
                    </div>
                    <div>
                        <img src={bannerImgTwo} alt="banner"></img>
                    </div>
                    <div>
                        <img src={bannerImgThree} alt="banner"></img>
                    </div>
                    <div>
                        <img src={bannerImgFour} alt="banner"></img>
                    </div>
                    <div>
                        <img src={bannerImgFive} alt="banner"></img>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Banner;
