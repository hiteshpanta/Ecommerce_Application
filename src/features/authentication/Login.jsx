import React from 'react'
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
import { useNavigate } from 'react-router'
import { useUserLoginMutation } from './authApi'
import { Formik } from 'formik'
import * as Yup from 'yup';


const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(3).required(),
})

export default function Login() {
    const nav = useNavigate();
    const [loginUser, {isLoading}] =useUserLoginMutation();

  return (
    <div className='p-5'>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                <Button onClick={() => nav('/signup')} variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={ async(val)=> {
                        try {
                            await loginUser(val).unwrap();
                            
                        } catch (err) {
                            console.log(err);
                            
                        }
                    }}
                    validationSchema={loginSchema}
                >
                    
                    {({values, handleChange,handleSubmit, errors, touched}) =>(
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name= "email"
                                    onChange= {handleChange}
                                    value= {values.email}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                {errors.email && touched.email && <p className='text-red-500'>
                                    {errors.email}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input
                                    name= "password"
                                    onChange= {handleChange}
                                    value= {values.password}
                                    id="password"
                                    type="password"
                                    />
                                </div>
                                {errors.password && touched.password && <p className='text-red-500'>
                                    {errors.password}
                                </p>}
                            </div>

                            {/* <CardFooter className="flex-col gap-2 mt-2"> */}
                                <Button type="submit" className="w-full mt-5">
                                Login
                                </Button>
                                {/* <Button variant="outline" className="w-full">
                                Login with Google
                                </Button> */}
                            {/* </CardFooter> */}
                        </form>
                    )}
                </Formik>
                
        </CardContent>
        
        </Card>
      
    </div>
  )
}
