'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { signInSchema } from '@/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


const page = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    try {
      const response =  await signIn('credentials',{
        redirect:false,
        identifier: data.identifier,
        password: data.password
      })
      if(response?.error){
        toast({
          title: 'Login Failed',
          description: response.error,
          variant: 'destructive'
        })
      }
      if(response?.ok){
        toast({
          title: 'Login Successfull',
          description: "Congrats you logged in successfully",
        })
      }
      if(response?.url){
        router.replace('/dashboard')
      }
    } catch (error) {
      console.error('Error in sign-in', error)
      toast({
        title: 'Signup Failed',
        description: "Server Error Occurred",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const forgotPassword = () => {
      router.replace('/forgotPassword')
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Welcome Back to Mystrey Message
            </h1>
            <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username/email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span 
              onClick={forgotPassword} 
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              Forgot Password
            </span>
            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                  </>
                ) : ('SignIn')
              }
            </Button><br/><br/>          
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Don't have a account ? {' '}
            <Link href='/sign-up' className="text-blue-600 hover: text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
