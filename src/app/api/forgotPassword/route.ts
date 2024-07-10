import { sendChangePasswordEmail } from "@/helpers/sendChangePasswordEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request) {
    await dbConnect()
    try {
        const { email } = await request.json();
        const existingUser = await UserModel.findOne({
            email,
            isVerified: true
        })
        if(!existingUser){
            return Response.json({
                success: false,
                message: "Invalid username or email"
            },{status: 404})
        }
        const username = existingUser.username;
        const response = await sendChangePasswordEmail(email,username);
        console.log("===Response===",response)
        if(!response){
            return Response.json({
                success: false,
                message: "Error sending the email"
            },{status: 500 })
        }
        return Response.json({
            suceess: true,
            message: "The details to update password sent to email.Please check emails."
        },{status: 201})

    } catch (error) {
        console.error('Error registering user', error);
        return Response.json({
            success: false,
            message: "Error Registering User"
        },{ status: 500 })
    }
}