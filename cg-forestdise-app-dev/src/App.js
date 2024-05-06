import React, {Fragment} from "react";
import {
    Outlet,
    Route,
    RouterProvider,
    ScrollRestoration,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./components/main/cart/Cart";
import Signin from "./pages/Signin";
import Error from "./pages/Error";
import Registration from "./pages/Registration";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Payment from "./pages/Payment";
import StoreHeader from "./components/main/store/StoreHeader";
import StoreFooter from "./components/main/store/StoreFooter";
import StoreBanner from "./components/main/store/StoreBanner";
import DashBoardHeader from "./components/main/dashboard/DashBoardHeader";
import Confirm from "./pages/Confirm";
import ShowProduct from "./components/main/product/product";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./components/main/profile/UserProfile";
import Success from "./pages/Success";
import OrderReview from "./components/main/order/OrderReview";
import Order from "./components/main/order/Order";
import {Dashboard} from "@mui/icons-material";
import ProductDetail from "./components/main/variant/ProductDetail";

const Layout = () => {
    return (
        <div>
            <Header />
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </div>
    );
};

const DashboardLayout = () => {
    return (
        <div>
            <DashBoardHeader />
            <Dashboard>
                <Outlet />
            </Dashboard>
        </div>
    );
};

const StoreLayout = () => {
    return (
        <div>
            <StoreBanner />
            <StoreHeader />
            <Outlet />
            <StoreFooter />
        </div>
    );
};
function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Fragment>
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/error" element={<Error />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/changepass" element={<ForgotPassword />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/userProfile" element={<UserProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route // add to link
                        path="/:lavelOne/:lavelTwo/:lavelThree"
                        element={<ShowProduct />}
                    ></Route>
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/review/:id" element={<OrderReview />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/order" element={<Order />} />
                </Route>
            </Fragment>
        )
    );
    return (
        <div className="font-bodyFont bg-gray-100">
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;
