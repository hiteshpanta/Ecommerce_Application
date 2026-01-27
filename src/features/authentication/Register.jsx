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

export default function Register() {
    const nav = useNavigate();
  return (
    <div className='p-5'>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Signup to your account</CardTitle>
                <CardDescription>
                Enter your email below to register to your account
                </CardDescription>
                <CardAction>
                <Button onClick={()=> nav(-1)} variant="link">Login</Button>
                </CardAction>
            </CardHeader>
        <CardContent>
            <form>
            <div className="flex flex-col gap-6">

                <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="username"
                    placeholder="John Doe"
                />
                </div>

                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
                </div>

                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
            Sign up
            </Button>
            {/* <Button variant="outline" className="w-full">
            Login with Google
            </Button> */}
        </CardFooter>
        </Card>
      
    </div>
  )
}
