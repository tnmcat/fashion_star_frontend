import React from "react";
import Header from "../../common/header/Header";

import UserOrder from "./UserOrder";
import FooterMiddle from "../../common/footer/FooterMiddle";
import FooterBottom from "../../common/footer/FooterBottom";
import OrderReview from "./OrderReview";
function Order() {
    return (
        <>
            <div>
                <Header />
                <UserOrder />
                <FooterMiddle />
                <FooterBottom />
            </div>
        </>
    );
}
export default Order;
