"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/APIResponse';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import { z } from 'zod';

const googleUsername = () => {
    const [isSubmitting, setIsSubmiting] = useState(false);
    const [username, setUsername] = useState("")
    const [usernameMessage, setUsernameMessage] = useState("")
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)

    const debounced = useDebounceCallback(setUsername,300)
    const {toast} = useToast()
    const router = useRouter()

    useEffect(() => {
        const checkIsUsernameUnique = async () => {
            if(username){
                setIsCheckingUsername(true)
                setUsernameMessage('')
                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`)
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    const axiosError = error as  AxiosError<ApiResponse>
                    setUsernameMessage(
                        axiosError.response?.data.message ?? "Error checking username"
                    )
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkIsUsernameUnique()
        
    },[username])

    const form = useForm<z.infer<any>>({
        defaultValues: {
          identifier: '',
        }
      })

    const onSubmit = async (data: z.infer<any>) => {
        setIsSubmiting(true)
        try{
            localStorage.setItem('username',username)
            const response = await signIn("google",{
                redirect: false
            })
            if(response?.error){
                toast({
                  title: 'Login Failed',
                  description: response.error,
                  variant: 'destructive'
                })
            }
        } catch (error) {
            console.error('Error in sign-in', error)
            toast({
                title: 'Signup Failed',
                description: "Server Error Occurred",
                variant: "destructive"
            })
        } finally{
            setIsSubmiting(false)
        }
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
        <Form {...form} >
          <form onSubmit = {form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e)
                      console.log(e.target.value);
                      debounced(e.target.value)
                    }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin"/>}
                    <p className={`tx-sm ${usernameMessage==="Username is unique" ? ' text-green-500' : 'text-red-500'}`}>
                        {usernameMessage}
                    </p>
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
        <div className="text-center mt-4">
        </div>
      </div>
    </div>
  )
}

export default googleUsername
