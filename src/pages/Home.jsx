
// import React from 'react'

// import { NewestArrival } from '../components/NewestArrival'
// import { BestSeller } from '../components/BestSeller'

// export const Home = () => {


//     const newest = "newest"
//     const bestSeller = "bestSeller"

//     return (
//         <>
//             <NewestArrival newest={newest} />
//             <BestSeller bestSeller={bestSeller} />

//         </>
//     )
// }



import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import { HeroSection } from "@/components/layout/Hero"
import FeaturedProductsSlider from "@/components/product/FeaturedProducts"
import { BestSeller } from '../components/BestSeller'
import FlashDeals from "@/components/product/FlashDeals"
import Sales from "@/components/product/Sales"
// import SaleDeals from "@/components/product/SaleDeals"


export const Home = () => {

    return (
        <>
            <div className="max-w-6xl mx-auto">

                <HeroSection />
                <section>
                    {/* <div className="flex gap-2 w-full">
                        <FlashDeals />
                        <Sales />
                    </div> */}
                    <div>
                        <BestSeller />
                    </div>
                    <div className="flex justify-center mt-8">
                        <Button asChild className="w-[10%] rounded-full" size="sm">
                            <Link to="/shop">Go to Shop</Link>
                        </Button>
                    </div>

                </section>
                <section>
                    <FeaturedProductsSlider />
                </section>
                {/* <div className="bg-gray-400 h-94">
                    <SaleDeals />
                </div> */}
                <div className="flex">
                    <div className="w-1/2">

                        <FlashDeals />
                    </div>
                    <div className="w-1/2">

                        <Sales />
                    </div>
                </div>
            </div>
        </>
    )
}
