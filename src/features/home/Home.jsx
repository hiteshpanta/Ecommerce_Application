

import React from 'react'

import { useGetProductsQuery } from "../products/productApi"
import ProductCard from "../products/ProductCard"
import { Skeleton } from '@/components/ui/skeleton';
import ProductCardSkeleton from '../products/ProductCardSkeleton';

export default function Home() {
  const { isLoading, error, data} = useGetProductsQuery();
  if (isLoading) return <div className='grid grid-cols-4 gap-6 mt-4 items-start'>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />            
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
        </div>
  if (error) return <h1 className="text-pink-950">{error}</h1>
  return (
    <div>


      <h1>Wellcome To Online Shopping</h1>

      <div className='grid grid-cols-4 gap-6 mt-4 items-start'>
         {data?.products.map((product) => {
            return <ProductCard key={product._id} product={product}/>

          })}
      </div>
     
 

    </div>
  )
}
