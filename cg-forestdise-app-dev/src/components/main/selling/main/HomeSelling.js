import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSellerInfo, selectSellerDetail } from "../../../../features/seller/sellerSlice"
import { Link } from 'react-router-dom';

function HomeSelling() {
    const dispatch = useDispatch();
    const sellerInfo = useSelector((state) => state.seller.sellerInfo);



    // useEffect(() => {
    //     dispatch(setSellerInfo(1));
    // }, [])
    // console.log(sellerInfo);

    return (
        <div className="font-bodyFont bg-gray-100">
            <div className="w-full mt-30 xl:-mt-12 py-10">
                <div className="mx-auto h-auto grid grid-cols-2 bg-slate-400 ">
                    <div className="w-full h-full px-4 col-span-1 py-10 flex flex-col pl-12 ">
                        <span className='pl-20 text-7xl font-sans font-bold py-5'>
                            Start <br></br> selling <br></br> with <br></br> Forestdise
                        </span>
                        <span className='font-titleFont text-xl pl-20'>The fastest-growing and preferred <br></br> acquisition channel for over half our <br></br> multichannel sellers.1</span>
                        {sellerInfo ? <Link to="/selling/shop"><div className='pl-20 mt-6'><button className=" pt-4 pb-4 pl-4 pr-4 text-4xl bg-amber-500 font-bodyFont font-bold hover hover:border-1 rounded-full">Start</button></div></Link>
                            : <Link to="/sellercentral/register"><div className='pl-20 mt-6'><button className=" pt-4 pb-4 pl-4 pr-4 text-4xl bg-amber-500 font-bodyFont font-bold hover hover:border-1 rounded-full">Sign up</button></div></Link>
                        }                      
                        <span className='pl-20 mt-4 font-titleFont text-xs'>$39.99 a month + selling fees</span>
                    </div>
                    <div className='col-span-1 pt-10'>
                        <img src='https://m.media-amazon.com/images/G/01/sell/images/homepage-hero-image-03-sm.png' alt="hero" />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HomeSelling
