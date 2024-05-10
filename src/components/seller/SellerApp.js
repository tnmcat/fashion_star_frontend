import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellerHeader from './layouts/SellerHeader';
// import SideBar from './layouts/SideBar';
import OrderDetailsManage from './order/OrderDetailsManage';
import OrderManage from './order/OrderManage';
import ProductAdd from './product/ProductAdd';
import ProductDetail from './product/ProductDetail';
import ProductEdit from './product/ProductEdit';
import ProductManage from './product/ProductManage';
import ProfileManage from './profile/ProfileManage';
import ShippingManage from './shipping/ShippingManage';
import StoreManage from './store/StoreManage';
import StoreCategoryManage from './store_category/StoreCategoryManage';
import VariantManage from './variant/VariantManage';
function SellerApp() {

    return (
        <div>

            <SellerHeader />
            <Routes>
                <Route path="/store" element={<StoreManage />} />
                <Route path="/category" element={<StoreCategoryManage />} />
                <Route path="/product" element={<ProductManage />} />
                <Route path="/product/add" element={<ProductAdd />} />
                <Route path="/product/:productId/edit" element={<ProductEdit />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/product/:productId/variants" element={<VariantManage />} />
                <Route path="/order" element={<OrderManage />} />
                <Route path="/order/:orderId/details" element={<OrderDetailsManage />} />
                <Route path="/profile" element={<ProfileManage />} />
                <Route path="/shipping" element={<ShippingManage />} />
            </Routes>
        </div>
    );

}

export default SellerApp;
