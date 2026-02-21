import React from 'react'
import { useParams } from 'react-router'
import { useGetProductQuery } from './productApi';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { base } from '@/app/mainApi';
import AddToCart from '../carts/AddToCart';

export default function ProductDetail() {
    const { id } = useParams();
    const { isLoading, error, data } = useGetProductQuery(id);
    if(isLoading) return <DotLottieReact
      src="/loading.lottie"
      loop
      autoplay
    />
    if (error) return <h3 className='text-pink-500'>{error.data?.message}</h3>
  return (
    <div className=' max-w-7xl mx-auto grid grid-cols-2 mt-11'>
        <div>
            <img src={`${base}/${data.product.image}`} alt="" />
        </div>
        <div className='space-y-4'>
            <h1>{data.product.title}</h1>
            <p className='text-zinc-500'>Price:- {data.product.price}</p>
            <p className='text-zinc-500'>Stock:- {data.product.stock}</p>
            <p className='text-zinc-700'>{data.product.detail}</p>

             <hr />
             <div>
              <AddToCart product={data.product}/>
             </div>
            
            
        </div>

        
        
      
    </div>
  )
}
