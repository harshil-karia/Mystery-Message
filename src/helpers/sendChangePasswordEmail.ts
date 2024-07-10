import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/APIResponse";
import ChangePasswordEmail from "../../emails/ChangePasswordEmail";

export async function sendChangePasswordEmail(
    email: string,
    username: string,
): Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystrey Message | Change Password',
            react: ChangePasswordEmail({ username}),
          });

        return {
            success:true,
            message: "Change Password Email sent successfully"
        }
    } catch (emailError) {
        console.error("Error Sending Email",emailError);
        return {
            success:false,
            message: "Failed to send Email"
        }
        
    }
}