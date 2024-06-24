'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/model/User"
import { useToast } from "./ui/use-toast"
import axios from "axios"
import { ApiResponse } from "@/types/APIResponse"



type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId?: string) => void;
}

const MessageCard = ({ message, onMessageDelete}: MessageCardProps) => {
    const { toast } = useToast()
    const handleDeleteConfirm = async () => {
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        toast({
            title: response.data.message
        })
        onMessageDelete(message._id)
    }
    const formatDate = (isoDateString: Date) => {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
  return (
    <Card>
        <CardHeader>
            <CardTitle>{message.content}</CardTitle>
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive"><X className="w-5 h-5"/></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>

            <CardDescription>{formatDate(message.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
            
        </CardContent>
    </Card>

  )
}

export default MessageCard
