import { base } from '@/app/mainApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react'
import { useParams } from 'react-router'

export default function Order() {

    const {id} = useParams();
    const {data, isLoading,error} = useGetOrderQuery(id);

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1 className='text-pink-500'>{error?.error}</h1>

    console.log(data)


  return (
    <div>
        {data && <div>
            <h3>OrderId: {data.order._id}</h3>
            <p className='text-slate-600'>CreatedAt: {data.order.createdAt}</p>
            <hr />
            <div>
                {data.order.products.map((item) => {
                    return <div key={item._id} >
                        <div>
                            <Avatar className="size-20">
                                <AvatarImage src={`${base}/${item.product.image}`} alt="@shadcn"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            
                        </div>
                        <div className='space-y-2'>
                            <p>Product: {item.product.title}</p>
                            <p>Price: Rs.{item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <hr />
                        </div>
                        
                    </div>
                })}
            </div>
            <div className='mt-12'>
                <h2>Total Amount: Rs.{data.order.totalAmount}</h2>
            </div>
        </div>}
      
    </div>
  )
}
