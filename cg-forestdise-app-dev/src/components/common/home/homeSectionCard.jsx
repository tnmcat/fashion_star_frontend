import React from "react";
const HomeSectionCard = ({product}) => {
    return (
        <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-auto">
            <div className="h-[13rem] w-[10rem]">
                <img
                    className="object-cover object-top w-full h-full"
                    src={product.mainPicture}
                    alt=""
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                    Brand: {product.store}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                    description: {product.title.substring(0, 40)}...
                </p>
            </div>
        </div>
    );
};
export default HomeSectionCard;
