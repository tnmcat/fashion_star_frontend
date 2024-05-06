// import axios from "axios";
// import React, {useEffect, useRef, useState} from "react";
// import {setStore} from "../../../features/sellerStore/sellerStoreSlice";
// import {Link, useNavigate} from "react-router-dom";
// import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
// import {useDispatch} from "react-redux";
// import StarIcon from "@mui/icons-material/Star";
// const HeaderBelow = () => {
//     const dispatch = useDispatch();

//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);
//     const [filter, setFilter] = useState(data);
//     let componentMounted = useRef(true);
//     useEffect(() => {
//         const getProducts = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(
//                     "http://localhost:5454/api/products"
//                 );
//                 if (componentMounted) {
//                     setData(response.data);
//                     setFilter(response.data);
//                     setLoading(false);
//                     console.log(filter);
//                 }
//             } catch (error) {
//                 console.error("Error axios products", error);
//             }
//             return () => {
//                 componentMounted.current = false;
//             };
//         };
//         getProducts();
//     }, []);

//     // useEffect(() => {
//     //     const getProducts = async () => {
//     //         setLoading(true);

//     //         const response = await fetch(
//     //             "https://fakestoreapi.com/products?limit=20"
//     //         );
//     //         if (componentMounted) {
//     //             setData(response.clone().json());
//     //             setFilter(response.json());
//     //             setLoading(false);
//     //             console.log(filter);
//     //         }

//     //         return () => {
//     //             componentMounted.current = false;
//     //         };
//     //     };
//     //     getProducts();
//     // }, []);

//     const Loading = () => {
//         return <>Loading....</>;
//     };

//     const filterProduct = (cat) => {
//         const updatedList = data.filter((x) => x.category === cat);
//         setFilter(updatedList);
//     };
//     const ShowProducts = () => {
//         return (
//             <>
//                 <div className="buttons d-flex justify-center mb-5 my-5 z-0">
//                     <button
//                         className=" border border-red-900 btn btn-outline-dark mr-3"
//                         onClick={() => setFilter(data)}
//                     >
//                         All
//                     </button>
//                     <button
//                         className=" border border-indigo-900 btn btn-outline-dark me-2"
//                         onClick={() => filterProduct("Galaxy Z Series")}
//                     >
//                         Galaxy Z Series
//                     </button>
//                     <button
//                         className=" border border-indigo-900 btn btn-outline-dark me-2"
//                         onClick={() => filterProduct("smart phone")}
//                     >
//                         Smart Phone
//                     </button>
//                     <button
//                         className=" border border-indigo-900 btn btn-outline-dark me-2"
//                         onClick={() => filterProduct("electronic")}
//                     >
//                         Electronic
//                     </button>
//                     <button
//                         className=" border border-indigo-900 btn btn-outline-dark me-2"
//                         onClick={() => filterProduct("computers")}
//                     >
//                         Computers
//                     </button>
//                 </div>
//                 {/* Product grid */}
//                 <div className="lg:col-span-4 w-full">
//                     <div className="flex flex-wrap justify-center bg-white py-5">
//                         {Array.isArray(filter) &&
//                             filter.map((product) => (
//                                 <div
//                                     key={product.id}
//                                     className="productCard w-[15rem] m-3 transition-all cursor-pointer border-[1px]
//                                             border-gray-200 py-3 px-2 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 flex
//                                                  flex-col gap-4 relative"
//                                     // className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30
//                                     // hover:border-transparent shadow-none hover:shadow-testShadow duration-200 flex
//                                     // flex-col gap-4 relative"
//                                 >
//                                     <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
//                                         {product.category}
//                                     </span>
//                                     <div className=" w-full h=[20rem] overflow-hidden">
//                                         <img
//                                             className="w-52 h-64 object-contain"
//                                             src={product.mainPicture}
//                                             alt="ProductImg"
//                                         ></img>

//                                         <ul
//                                             className="w-full h-10 bg-gray-100 absolute bottom-[-170px] flex flex-col items-end justify-center gap-2
//             font-titleFont px-2 border-1 border-r group-hover:bottom-0 duration-700"
//                                         >
//                                             <Link
//                                                 to={`/product/${product.id}`}
//                                                 className="productLi"
//                                             >
//                                                 <span
//                                                     onClick={() => {
//                                                         dispatch(
//                                                             setStore(
//                                                                 product.store.id
//                                                             )
//                                                         );
//                                                     }}
//                                                 >
//                                                     View Details
//                                                     <ArrowCircleRightIcon />
//                                                 </span>
//                                             </Link>
//                                         </ul>
//                                     </div>
//                                     <div className=" border textPart bg-white p-3">
//                                         <div className="flex items-center justify-between">
//                                             <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
//                                                 {" "}
//                                                 {product.title.substring(0, 40)}
//                                                 ...
//                                             </h2>
//                                         </div>
//                                         <div>
//                                             <div>
//                                                 <p className="text-sm">
//                                                     {product.description.substring(
//                                                         0,
//                                                         100
//                                                     )}
//                                                     ...
//                                                 </p>
//                                             </div>
//                                             <div className="text-yellow-500">
//                                                 <StarIcon />
//                                                 <StarIcon />
//                                                 <StarIcon />
//                                                 <StarIcon />
//                                                 <StarIcon />
//                                             </div>
//                                         </div>
//                                         <button
//                                             onClick={() => {
//                                                 dispatch(
//                                                     setStore(product.store.id)
//                                                 );
//                                                 navigate(
//                                                     `/product/${product.id}`
//                                                 );
//                                             }}
//                                             className="w-full text-white font-titleFont font-medium text-base bg-gradient-to-tr
//             from-indigo-600 to-indigo-600 border hover:from-indigo-400 hover:to-indigo-600
//             border-indigo-500 hover:border-indigo-700 active:bg-gradient-to-bl
//             active:from-indigo-400 active:to-indigo-500 duration-200 py-1.5 rounded-md mt-3"
//                                         >
//                                             View Details
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                     </div>
//                 </div>
//             </>
//         );
//     };
//     return (
//         <div>
//             <div className="container my-5 p-5">
//                 <div className="row">
//                     <div className="col-12 mb-5">
//                         <h1 className="display-6 fw-border text-center">
//                             Choose you Supplier
//                         </h1>
//                         <hr />
//                     </div>
//                 </div>
//                 <div className="row justify-content-center">
//                     {loading ? <Loading /> : <ShowProducts />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeaderBelow;
