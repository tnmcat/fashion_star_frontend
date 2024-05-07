import React from "react";

import UserOrder from "./UserOrder";
import FooterMiddle from "../../common/footer/FooterMiddle";
import {Expample} from "./Example";

function Order() {
    return (
        <>
            <div>
                <UserOrder />
                <FooterMiddle />
                <Expample />
            </div>
        </>
    );
}
export default Order;
