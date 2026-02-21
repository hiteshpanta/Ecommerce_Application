
import { base } from '@/app/mainApi'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router'



export default function ProductCard ({product})  {
  
  const nav = useNavigate();

  return (
    
    <div className='hover:scale-[103%] ease-in delay-100 duration-75 transition cursor-pointer relative rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'
    onClick={()=> nav(`/products/${product._id}`)}>
      <div className='flex h-50 items-center justify-center'>
        <img
          src={`${base}/${product?.image}`}
          alt='Shoes'
          className='w-75'
        />
      </div>
      

      <Card className='border-none'>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          {/* <CardDescription className='flex items-center gap-2'>
            <Badge variant='outline' className='rounded-sm'>
              EU38
            </Badge>
            <Badge variant='outline' className='rounded-sm'>
              Black and White
            </Badge>
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <p className='line-clamp-3'>
            {product.detail}
          </p>
        </CardContent>
        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>
            <span className='text-xl font-semibold'>Rs. {product.price}</span>
          </div>
          {/* <Button size='lg'>Add to cart</Button> */}
        </CardFooter>
      </Card>
    </div>
  )
}


