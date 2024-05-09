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
import HomeContent from "./components/main/store/HomeContent";
import DealsContent from "./components/main/store/DealsContent";
import CategoryContent from "./components/main/store/CategoryContent";
import SearchContent from "./components/main/store/SearchContent";
import Error from "./pages/Error";
import Registration from "./pages/Registration";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import ProductDetail from "./components/main/variant/ProductDetail";
import SellingHeader from "./components/common/sellingheader/SellingHeader";
import Selling from "./components/main/selling/Selling";
import ShopCreat from "./components/main/selling/main/ShopCreate";
import Category from "./components/main/selling/main/Category";
import Payment from "./pages/Payment";
import StoreHeader from "./components/main/store/StoreHeader";
import StoreFooter from "./components/main/store/StoreFooter";
import StoreBanner from "./components/main/store/StoreBanner";
import Variants from "./components/main/selling/main/Variants";
import Product from "./components/main/selling/main/Product";
import Offers from "./components/main/selling/main/Offers";
import Dashboard from "./components/main/dashboard/Dashboard";
import DashBoardHeader from "./components/main/dashboard/DashBoardHeader";
import Categories from "./components/main/dashboard/element/Categories";
import HomeDasboard from "./components/main/dashboard/element/HomeDasboard";
import OrdersDashboard from "./components/main/dashboard/element/OrdersDashboard";
import Products from "./components/main/dashboard/element/Products";
import Profile from "./components/main/dashboard/element/Profile";
import Images from "./components/main/selling/main/Images";
import HomeSelling from "./components/main/selling/main/HomeSelling";
import SellerRegistration from "./pages/SellerRegistration";
import SellerSignin from "./pages/SellerSignin";
import SubCategoryContent from "./components/main/store/SubCategoryContent";
import Confirm from "./pages/Confirm";
import ShowProduct from "./components/main/product/product";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./components/main/profile/UserProfile";
import Success from "./pages/Success";
import UserOrder from "./components/main/order/UserOrder";
import Review from "./components/main/variant/Review";
import OrderReview from "./components/main/order/OrderReview";
import Order from "./components/main/order/Order";
import SellerRegister from "./components/seller/auth/SellerRegister";
import SellerSignIn from "./components/seller/auth/SellerSignIn";

import SellingLayout from "./components/seller/layouts/SellingLayout";
import OrderDetailsManage from "./components/seller/order/OrderDetailsManage";
import OrderManage from "./components/seller/order/OrderManage";
import ProductAddPage from "./components/seller/product/ProductAddPage";
import SellerProductDetail from "./components/seller/product/SellerProductDetail";
import ProductEditPage from "./components/seller/product/ProductEditPage";
import ProductManage from "./components/seller/product/ProductManage";
import ProfileManage from "./components/seller/profile/ProfileManage";
import ShippingManage from "./components/seller/shipping/ShippingManage";
import StoreManage from "./components/seller/store/StoreManage";
import StoreCategoryForm from "./components/seller/store_category/StoreCategoryForm";
import StoreCategoryManage from "./components/seller/store_category/StoreCategoryManage";
import VariantManage from "./components/seller/variant/VariantManage";
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
                <Route
                    path="/sellercentral/register"
                    element={<SellerRegistration />}
                />
                <Route
                    path="/sellercentral/signin"
                    element={<SellerSignin />}
                />

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
                    <Route path="/store/:id" element={<StoreLayout />}>
                        <Route index element={<HomeContent />} />
                        <Route
                            path="/store/:id/deals"
                            element={<DealsContent />}
                        ></Route>
                        <Route
                            path="/store/:id/search"
                            element={<SearchContent />}
                        ></Route>
                        <Route
                            path="/store/:id/:categoryName"
                            element={<CategoryContent />}
                        ></Route>
                        <Route
                            path="/store/:id/:categoryName/:subCategoryName"
                            element={<SubCategoryContent />}
                        ></Route>
                    </Route>
                </Route>
                <Route path="/payment" element={<Payment />} />
                <Route path="/success" element={<Success />} />
                <Route path="/order" element={<Order />} />

                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<HomeDasboard />} />
                    <Route
                        path="/dashboard/categories"
                        element={<Categories />}
                    />
                    <Route path="/dashboard/products" element={<Products />} />
                    <Route
                        path="/dashboard/orders"
                        element={<OrdersDashboard />}
                    />
                    <Route path="/dashboard/profile" element={<Profile />} />
                </Route>
                <Route
                    path="/test-product/:productId"
                    element={<SellerProductDetail />}
                />

                {/* seller routes */}
                <Route path="/seller/signin" element={<SellerSignIn />} />
                <Route path="/seller/register" element={<SellerRegister />} />
                <Route path="/selling" element={<SellingLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="store" element={<StoreManage />} />
                    <Route path="category" element={<StoreCategoryManage />} />
                    <Route
                        path="category/add"
                        element={<StoreCategoryForm />}
                    />
                    <Route path="product" element={<ProductManage />} />
                    <Route path="product/add" element={<ProductAddPage />} />
                    <Route
                        path="product/:productId"
                        element={<ProductEditPage />}
                    />
                    <Route
                        path="product/:productId/edit"
                        element={<SellerProductDetail />}
                    />
                    <Route
                        path="product/:productId/variants"
                        element={<VariantManage />}
                    />
                    <Route path="order" element={<OrderManage />} />
                    <Route
                        path="order/details/:orderId"
                        element={<OrderDetailsManage />}
                    />
                    <Route path="profile" element={<ProfileManage />} />
                    <Route path="shipping" element={<ShippingManage />} />
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
