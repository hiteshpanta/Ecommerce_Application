import ShowDialog from '@/components/ShowDialog'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useCreateOrderMutation } from '../orders/orderApi'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@/components/ui/spinner';
import { clearCart } from './cartslice';

export default function CheckOutPart({ carts }) {
    const dispatch = useDispatch();
    const [addOrder, {isLoading}] = useCreateOrderMutation();
    const totalAmount = carts.reduce((total, item) => total + item.price * item.qty, 0)
    const { user } = useSelector((state) => state.userSlice);

    const handleOrder =async () => {
        try {
            await addOrder({
                token: user.token,
                body: {
                    products: carts.map((item) => ({
                        product: item.id,
                        quantity: item.qty,
                    })),
                    totalAmount
                }
            }).unwrap();
            dispatch(clearCart());
            
            toast.success("Order placed successfully");
        } catch (err) {
            toast.error(err.data.message);
            
            
        }
    }
  return (
    <div className='flex flex-col items-center '>
        <h1>Order Summary</h1>
        <div className='space-y-4 mt-7'>
          {carts.map(item => {
            return <div key={item.id}>
              <div>
                <span>{item.title}</span>
                <span>{item.qty} X Rs. {item.price}</span>
              </div>
              
            </div>
          })}
          <p>Total Items: {carts.length}</p>
          <div>
            <p>Total Price: Rs. {carts.reduce((total, item)=> total + item.price * item.qty, 0)}</p>
          </div>
        </div>

        <ShowDialog
        func={handleOrder}
         detail={'You want to buy this products'}>
            <Button disabled={isLoading || carts.length ===0} className="mt-9 bg-green-500">
                { isLoading ? <Spinner /> : "CheckOut"}
            </Button>

        </ShowDialog>

      </div>
  )
}
