

import React, { useEffect } from 'react'

import { useGetProductsQuery } from "../products/productApi"
import ProductCard from "../products/ProductCard"
import ProductCardSkeleton from '../products/ProductCardSkeleton';
import { Input } from '@/components/ui/input';
import { Formik } from 'formik';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router';

export default function Home() {
  const [params, setParams] = useSearchParams()

  const querYPage = params.get('page') ?? 1;

  const query = params.get('search') ?{
    search: params.get('search'),
  } :  null;

  const { isLoading, error, data} = useGetProductsQuery({
    ...query,
    page: querYPage
  });
  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behaviour: 'smooth'
    });
  }, [querYPage]);



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


      <h1 className='text-center text-zinc-300'>Wellcome To Online Shopping Store</h1>


      <Formik
        initialValues={{
          search: ''
        }}

        onSubmit={(val, { resetForm})=> {
          setParams({ search: val.search });
          resetForm();
        }}
      >
        {({handleChange, handleSubmit, values, touched, errors}) => (
          <form className='mt-4 mb-4 max-w-sm'>
            <div className='flex gap-5'>
              <Input
                value={values.search}
                onChange={handleChange}
                name="search"
                placeholder="Search"/>
              <Button onClick={handleSubmit}>Search</Button>
            </div>

          </form>
        )}

      </Formik>

      <div className='grid grid-cols-4 gap-6 mt-20 items-start'>
         {data?.products.map((product) => {
            return <ProductCard key={product._id} product={product}/>

          })}
      </div>


      <div className='flex gap-5 my-5 justify-center'>
        <Button disabled={Number(querYPage) === 1} onClick={() =>
          setParams({ page: Number(querYPage) - 1 })
        }>Prev</Button>
        <h1>{params.get('page') ?? 1}</h1>
        <Button disabled={ data.totalPages === Number(querYPage)} onClick={() => setParams({ page: Number(querYPage) + 1 })}>Next</Button>
      </div>
     
 

    </div>
  )
}
