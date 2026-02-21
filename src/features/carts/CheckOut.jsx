import { useId } from 'react'

import { ArchiveIcon, MinusIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { useDispatch, useSelector } from 'react-redux'
import { base } from '@/app/mainApi'
import { removeCart, setCart } from './cartslice'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'


export default function CheckOut () {
  const { carts } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

   const handleAdd = (item) => {
    dispatch(setCart({...item, qty: item.qty +1}));

   }

   const handleRemove = (item) => {
    dispatch(setCart({...item, qty: item.qty - 1}));
   }

   const handleRemoveItem = (item) => {
    dispatch(removeCart({item}));
   }
  return (
    <div className='grid grid-cols-[1.4fr_1fr]'>
      <h2 className='font-semibold '>CheckOut Page</h2>
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
                    <Button onClick={() => handleRemove()} variant="outline" size="icon">
                      <MinusIcon />
                    </Button>
                    <span>{item.qty}</span>
                    <Button onClick={() => handleAdd()} variant="outline" size="icon">
                      <PlusIcon />
                    </Button>

                  </div>
                </TableCell>
                <TableCell>{item.price}</TableCell>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${item.id}-remove`}>
                    <Trash2Icon />
                  </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemoveItem(item)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                <TableCell className='flex items-center gap-1'>
                  {/* <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${item.id}-edit`}>
                    <PencilIcon />
                  </Button> */}
                  
                 
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <p className='text-muted-foreground mt-4 text-center text-sm'>Product Table</p> */}
    </div>
    </div>
  )
}


