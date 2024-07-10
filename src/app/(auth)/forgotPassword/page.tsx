'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema'
import { ApiResponse } from '@/types/APIResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const page = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const {data: session} = useSession()
	const router = useRouter();
	const {toast} = useToast();
  	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
      resolver: zodResolver(forgotPasswordSchema)
  	})

  const onSubmit = async (data:z.infer<typeof forgotPasswordSchema>) => {
	setIsSubmitting(true)		
	try {
		const response = await axios.post('/api/forgotPassword',data);
		if(response.data){
			toast({
				title: 'Success',
				description: response.data.message,
			  })
		}
		router.replace('/')
	} catch (error) {
		console.error('Error in sign-up', error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
      toast({
        title: 'Signup Failed',
        description: errorMessage,
        variant: "destructive"
      })
	} finally {
		setIsSubmitting(false);
	} 
  }
  	useEffect(() => {
		if (session) {
	  	router.replace('/dashboard')
		}
	}, [session, router])
	if(session){
		console.log(session)
		return <div></div>
	}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
                Mystrey Message
                </h1>
                <p className="mb-4">Provide Your Email</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
              		{
                		isSubmitting ? (
                  			<>
                    			<Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                  			</>
                		) : ('Submit')
              }
            </Button>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default page
