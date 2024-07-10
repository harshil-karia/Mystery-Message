'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { passwordSchema } from '@/schemas/passwordSchema'
import { ApiResponse } from '@/types/APIResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { signOut } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const changePassword = () => {
    const router = useRouter()
    const params  = useParams<{username: string}>() 
    const {toast} = useToast()

    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),

    })

    const onSubmit = async (data:z.infer<typeof passwordSchema>) => {
        const password = data.password
        const confirmPassword = data.confirmPassword
        if(password !== confirmPassword){
            toast({
                title: "Opsss!!!",
                description: "Password and Confirm Password doesn't match",
                variant: "destructive"
            })
        }
        else {
            try {
                const username = params.username
                console.log("==================",username)
                const response = await axios.patch('/api/changePassword',{
                    username,
                    newPassword: data.password
                })
                toast({
                    title: "Changed!!!",
                    description: response.data.message
                })
                signOut({callbackUrl: '/sign-in'})
            } catch (error) {
                console.error('========Error in updating password======', error)
                const axiosError = error as AxiosError<ApiResponse>
                let errorMessage = axiosError.response?.data.message
                toast({
                    title: 'Updation Failed',
                    description: errorMessage,
                    variant: "destructive"
                })
            }
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Mystrey Message
                </h1>
                <p className="mb-4">Verify Your Account Here</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="New Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="confirmPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
             </Form>
        </div>
    </div>
  )
}


export default changePassword
