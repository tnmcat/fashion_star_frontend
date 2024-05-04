import React from "react";
import {Link} from "react-router-dom";

function FooterTop() {
    return (
        <div className="w-full bg-white py-6">
            <div className="w-full border-t-[1px] border-b-[1px] py-8">
                <div className="w-64 mx-auto text-center flex flex-col gap-1">
                    <p className="text-sm">See Personalised recommendations</p>
                    <Link to="/signin">
                        <button
                            className="w-full text-white bg-indigo-600 rounded-md py-1
                font-semibold cursor-pointer hover:bg-indigo-500 active:bg-indigo-700"
                        >
                            Sign in
                        </button>
                    </Link>
                    <p className="text-xs mt-1">
                        New Customer?
                        <Link to="/register">
                            <span className="text-indigo-600 ml-1 cursor-pointer">
                                {" "}
                                Start here.
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FooterTop;
