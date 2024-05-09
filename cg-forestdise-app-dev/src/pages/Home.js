import React from "react";
import Banner from "../components/main/home/Banner";
import Product from "../components/main/product/product";
import HomePromo from "../components/common/home/HomePromo";
import "react-alice-carousel/lib/alice-carousel.css";
import CarouselCategory from "../components/main/category/CarouselCategory";

function Home() {
    return (
        <>
            <div className="font-bodyFont bg-gray-100">
                <Banner />
                <CarouselCategory />
                {/* <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                    <HomeSectionCarosel
                        data={dataHome}
                        sectionName={"New Product"}
                    />
                </div> */}
                <div className="relative w-full -mt-10 xl:-mt-36 py-10 z-0">
                    <Product />
                </div>

                <HomePromo />
            </div>
        </>
    );
}

export default Home;
