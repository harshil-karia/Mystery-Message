import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import bcrypt from 'bcryptjs';
import { signOut } from "next-auth/react";


export async function PATCH(request:Request) {
    await dbConnect()
    try {
        const {oldUsername, username, password} = await request.json();
        if (!oldUsername || !username) {
            return Response.json({
                success: false,
                message: "Old and new username required"
            },{status: 400})
          }
        
        const oldUser = await UserModel.findOne({
            username: oldUsername,
            isVerified: true
        })
        if(!oldUser){
            return Response.json({
                success: false,
                message: "Invalid old username"
            },{status: 404})
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            oldUser.password
        );
        if(!isPasswordCorrect){
            return Response.json({
                success: false,
                message: "Incorrect Password"
            },{status: 400})
        }
        const existingUser = await UserModel.findOne({
            username,
            isVerified: true
        })
        if(existingUser){
            return Response.json({
                success: false,
                message: "Username already taken"
            },{status: 400})
        }
        const response = await UserModel.updateOne(
            { username: oldUsername },
            { $set: { username: username } }
        );
        return Response.json({
            success: true,
            message: "Username updated successfully. Please login again with new username"
        },{status: 201})

    } catch (error) {
        console.error('Error updating username', error);
        return Response.json({
            success: false,
            message: "Error Updating Username"
        },
        {
            status: 500
        })
    }
}