import React from 'react'
import { useGetProductsQuery } from '../products/productApi'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DeleteIcon, EditIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { base } from '@/app/mainApi';
import { RemoveProduct } from './RemoveProduct';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export default function AdminPanel() {
    const nav = useNavigate()
    const { isLoading, error, data} = useGetProductsQuery();

    console.log(data);
    if(isLoading) return <DotLottieReact
      src="/loading.lottie"
      loop
      autoplay
    />
    if(error) return <h1 className='text-pink-950'>{error}</h1>
  return (
    <div className='p-5'>

        <div className='mb-4'>
            <Button className={'bg-green-700'}
            onClick={()=> nav('/product-add')}>
                Add product
            </Button>
        </div>
    <div className='w-full'>
      <div className='[&>div]:rounded-sm [&>div]:border'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Name</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>CreatedAt</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage src={`${base}/${item.image}`} alt={item.image} />
                      {/* <AvatarFallback className='text-xs'>{item.fallback}</AvatarFallback> */}
                    </Avatar>
                    <div className='font-medium'>{item.title}</div>
                  </div>
                </TableCell>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.updatedAt}</TableCell>
                <TableCell>
                    <Button onClick={() => nav(`/product-edit/${item._id}`)}>
                        <EditIcon />
                    </Button>
                </TableCell>
                <TableCell >
                  <RemoveProduct id={item._id}/>
                    
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </div>
  )
}
