import React, { Fragment } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";


// import SellingLayout from "./components/seller/SellerApp";
import SellerRegister from "./components/seller/auth/SellerRegister";
import SellerSignIn from "./components/seller/auth/SellerSignIn";
import StoreRegisterPage from "./components/seller/auth/StoreRegisterPage";
import Dashboard from "./components/seller/dashboard/Dashboard";
import SellingLayout from "./components/seller/layouts/SellingLayout";
import OrderDetailsManage from "./components/seller/order/OrderDetailsManage";
import OrderManage from "./components/seller/order/OrderManage";
import ProductAdd from "./components/seller/product/ProductAdd";
import ProductDetail from "./components/seller/product/ProductDetail";
import ProductManage from "./components/seller/product/ProductManage";
import ProfileManage from "./components/seller/profile/ProfileManage";
import ShippingManage from "./components/seller/shipping/ShippingManage";
import StoreCategoryForm from "./components/seller/store_category/StoreCategoryForm";
import StoreCategoryManage from "./components/seller/store_category/StoreCategoryManage";
import VariantManage from "./components/seller/variant/VariantManage";
import ProductEdit from "./components/seller/product/ProductEdit";
//import SellerApp from "./components/seller/SellerApp";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>

        <Route path="/" element={<SellerSignIn />}>
        </Route>
        <Route path="/register" element={<SellerRegister />}>
        </Route>
        <Route path="/store-register" element={<StoreRegisterPage />}>

        </Route>

        {/* seller routes */}
        <Route path="/selling" element={<SellingLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="category" element={<StoreCategoryManage />} />
          <Route path="category/add" element={<StoreCategoryForm />} />
          <Route path="product" element={<ProductManage />} />
          <Route path="product/add" element={<ProductAdd />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="product/:productId/edit" element={<ProductEdit />} />
          <Route path="product/:productId/variants" element={<VariantManage />} />
          <Route path="order" element={<OrderManage />} />
          <Route path="order/details/:orderId" element={<OrderDetailsManage />} />
          <Route path="profile" element={<ProfileManage />} />
          <Route path="shipping" element={<ShippingManage />} />
        </Route>
      </Fragment>
    )
  );
  return (
    <div className="font-bodyFont bg-gray-100 wrapper">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
