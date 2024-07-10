import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'

export async function PATCH(request:Request) {
    await dbConnect()
    try {
        const {username,newPassword} = await request.json()
        console.log("======",username)
        console.log("======",newPassword);
        
        if(!username || !newPassword){
            return Response.json({
                success: false,
                message: "Username and password is required"
            }, {status: 404})
        }
        console.log("========",username)
        console.log("========",newPassword)
        const existingUser = await UserModel.findOne({
            username,
            isVerified: true
        })
        console.log("======",existingUser)
        if(!existingUser){
            return Response.json({
                success: false,
                message: "No user found with this username"
            },{status: 400})
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const response = await UserModel.updateOne(
            { username },
            { $set: { password: hashPassword } }
        );
        console.log("===========",response)
        return Response.json({
            success: true,
            message: "Password changed successfully. Please login again with new password"
        },{status: 201})

    } catch (error) {
        console.error('=============Error updating password===================', error);
        return Response.json({
            success: false,
            message: "Error Updating Username"
        },{ status: 500 })        
    }
}