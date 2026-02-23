

import {  MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Button } from '@/components/ui/button'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { useDispatch, useSelector } from 'react-redux'
import { base } from '@/app/mainApi'
import { removeCart, setCart } from './cartslice'
import ShowDialog from '@/components/ShowDialog'
import CheckOutPart from './CheckOutPart'


export default function CheckOut () {
  const { carts } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

   const handleIncrement = (item) => {
    dispatch(setCart({...item, qty: item.qty +1}));

   }

   const handleDecrement = (item) => {
    dispatch(setCart({...item, qty: item.qty - 1}));
   }

   const handleRemoveItem = (item) => {
    dispatch(removeCart(item));
   }
  return (
    <div>
      <h2 className='font-semibold mb-5'>CheckOut Page</h2>
      <div className='grid grid-cols-[1.4fr_1fr]'>

    <div className='w-full'>
      <div className='[&>div]:rounded-sm [&>div]:border'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className='w-0'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carts.map(item => (
              <TableRow key={item.id} className='has-data-[state=checked]:bg-muted/50'>
               
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar className='rounded-sm'>
                      <AvatarImage src={`${base}/${item.image}`} alt={item.model} />
                      <AvatarFallback className='text-xs'>{item.fallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='font-medium'>{item.title}</div>
                      <span className='text-muted-foreground mt-0.5 text-xs'>{item.brand}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className='flex gap-5 items-center'>
                    <Button onClick={() => handleDecrement(item)} disabled={item.qty === 0} variant="outline" size="icon">
                      <MinusIcon />
                    </Button>
                    <span>{item.qty}</span>
                    <Button onClick={() => handleIncrement(item)} disabled={item.qty === item.stock} variant="outline" size="icon">
                      <PlusIcon />
                    </Button>

                  </div>
                </TableCell>
                <TableCell>Rs. {item.price}</TableCell>

                <TableCell className='flex items-center gap-1'>

                   <ShowDialog 
                   func={() => handleRemoveItem(item)}
                   detail={'This action cannot be undone. This will permanently remove the Item from cart.'}>
                      <Button 
                        variant='ghost' 
                        size='icon' 
                        className='rounded-full' 
                      >
                          <Trash2Icon />
                      </Button>
                  </ShowDialog>
                </TableCell>
               
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

      <CheckOutPart carts={carts}/>
      
      

    
    </div>
    </div>
  )
}


