"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/types/APIResponse'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounceCallback } from 'usehooks-ts'
import { z } from 'zod'

const ChangeUsernameForm = () => {

    const [isSubmitting, setIsSubmiting] = useState(false)
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [usernameMessage, setUsernameMessage] = useState('')
    const [username, setUsername] = useState('')
    const debounced = useDebounceCallback(setUsername, 300)
    const { toast } = useToast()
    const router = useRouter()


    useEffect(()=>{
        const checkUsernameUnique = async () => {
          if(username){
            setIsCheckingUsername(true)
            setUsernameMessage('')
            try {
              const response = await axios.get(`/api/check-username-unique?username=${username}`)
              setUsernameMessage(response.data.message)
            } catch (error) {
              const axiosError = error as AxiosError<ApiResponse>
              setUsernameMessage(
                axiosError.response?.data.message ?? "Error checking username"
              )
            } finally {
              setIsCheckingUsername(false)
            }
          }
        }
        checkUsernameUnique()
      },[username])
    const form = useForm<z.infer<any>>({

      })
      const onSubmit = () => {

      }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
              Update Username
            </h1>
            <p className="mb-4">Sign Up to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e)
                      debounced( e.target.value)
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
            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                  </>
                ) : ('Update')
               }
            </Button><br /><br />          
          </form>
        </Form> 
      </div>
    </div>
  )
}

export default ChangeUsernameForm
