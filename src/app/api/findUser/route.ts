import dbConnect from "@/lib/dbConnect";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel, { User } from "@/model/User";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const _user: User = session?.user as User;
        console.log(_user)

        if(!session || !_user){
            return Response.json({ 
                    success: false,
                     message: 'Not authenticated' },
                { status: 401 }
              );
        }
        const userId = new mongoose.Types.ObjectId(_user._id as string);
        const user = await UserModel.findById( session.user._id)
        const password = user?.password
        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            },{status: 404})
        }
        return Response.json({
            success: true,
            message: password
        },{status: 404})
    } catch (error) {
        console.log(error)
        return Response.json({
            status: false,
            message: "Error occured"
        },{status: 500})
    }
}