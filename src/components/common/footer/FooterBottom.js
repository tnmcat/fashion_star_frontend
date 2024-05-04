import React from "react";
import {footerBottomItem} from "../../../constants";
import CopyrightIcon from "@mui/icons-material/Copyright";
function FooterBottom() {
    return (
        <div className="w-full bg-indigo-800">
            <div className="max-w-5xl mx-auto px-4 py-4">
                {/* <div className="w-full grid grid-cols-3 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 gap-3 place-content-center text-gray-400">
                    {footerBottomItem.map((item) => (
                        <div className="group cursor-pointer" key={item.id}>
                            <h3 className="footerBottomTitle">{item.title}</h3>
                            <p className="footerBottomText">{item.des}</p>
                        </div>
                    ))}
                </div> */}
                <div className="group cursor-pointer">
                    <h3 className="flex flex-center text-white gap-2">
                        {" "}
                        <CopyrightIcon />
                        2024 FashionStar Group04 | All rights reserved.
                    </h3>
                    <p className="footerBottomText"></p>
                </div>
            </div>
        </div>
    );
}

export default FooterBottom;
