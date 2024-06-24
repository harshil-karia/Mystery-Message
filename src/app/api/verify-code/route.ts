import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request) {
    await dbConnect()
    
    try {
        const {username, code} = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername})
        if(!user){
            console.error("User not found")
            return Response.json({
                success: false,
                message: "User not found"
            },{status: 500})    
        }

        if(user.isVerified){
            return Response.json({
                success: true,
                message: "User already verified"
            },{status: 200})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()
            return Response.json({
                success: true,
                message: "Account Verified Successfully"
            },{status: 200})
        } else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Your code has expired. Please signup again to get a new code"
            },{status: 400})
        } else{
            return Response.json({
                success: false,
                message: "Invalid Verification code"
            },{status: 400})
        }
    } catch (error) {
        console.error("Error Verifying User", error)
        return Response.json({
            success: false,
            message: "Error Verifying User"
        },{status: 500})
    }
}