import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik } from 'formik'
import * as Yup from 'yup';
import toast from 'react-hot-toast'
import { Spinner } from '@/components/ui/spinner'
import { useGetUserQuery, useUpdateUserMutation } from '../user/userApi'


const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    username: Yup.string().min(3).required(),
})

export default function UpdateUser({ user }) {



    const { isLoading, data, error } = useGetUserQuery(user.token);
    const [updateUser, {isLoading: updateLoading}] = useUpdateUserMutation();
    if (isLoading) return <div className='flex gap-2 items-center'>
        <h3>Loading...</h3>
        <Spinner />
    </div>
    if (error) return <h1 className='text-pink-500'>{error.data?.message}</h1>

  return (
    <div className='p-5'>
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>
                Enter your detail to update
                </CardDescription>
                
            </CardHeader>
            <CardContent>

                <Formik
                    initialValues={{
                        username: data?.user.username,
                        email: data?.user.email
                    }}
                    onSubmit={ async(val)=> {
                        try {
                            await updateUser({
                                token: user.token,
                                body: {
                                    username: val.username,
                                    eamil: val.email
                                }
                            }).unwrap();
                            toast.success("Update successful");
                            
                            
                            
                        } catch (err) {
                            console.log(err);
                            toast.error(err?.data?.data || err.data?.message || "Login failed")
                            
                        }
                    }}
                    validationSchema={loginSchema}
                >
                    
                    {({values, handleChange,handleSubmit, errors, touched}) =>(
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">


                                <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    name= "username"
                                    onChange= {handleChange}
                                    value= {values.username}
                                    id="username"
                                    type="text"
                                    placeholder="John Doe"
                                />
                                {errors.username && touched.username && <p className='text-red-500'>
                                    {errors.username}</p>}
                                </div>

                                <div className='w-full max-w-xs space-y-2'>
                                    <Label >Email</Label>
                                    <div className='relative'>
                                        <Input
                                            onChange = {handleChange}
                                            value = {values.email}
                                            type= 'email'
                                            placeholder= 'm@gmail.com'
                                        />
                                        {/* <Button
                                        type = 'button'
                                        onClick = {() => setShow(!show)}
                                        variant='ghost'
                                        size='icon'
                                        className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                                        >
                                            {
                                                show ? <LockKeyholeOpenIcon /> : <LockKeyhole />
                                            }
                                        
                                        <span className='sr-only'>Show password</span>
                                        </Button> */}
                                    </div>
                                    {errors.email && touched.email && <p
                                    className='text-red-500'>
                                        {errors.email}
                                        </p>}
                                </div>



                                
                            </div>
                            {updateLoading ? <Button size='sm' variant="outline" disabled 
                                className="w-full mt-5">
                                <Spinner />
                                Submit
                            </Button> : <Button type="submit" className="w-full mt-5">
                                Submit
                            </Button>}
                             

                        </form>
                    )}
                </Formik>
                
        </CardContent>
        
        </Card>
      
    </div>
  )
}
