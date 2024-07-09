import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/APIResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystrey Message | Verification Email',
            react: VerificationEmail({ username, otp: verifyCode }),
          });

        return {
            success:true,
            message: "Verifiaction Email sent successfully"
        }
    } catch (emailError) {
        console.error("Error Sending Verification Email",emailError);
        return {
            success:false,
            message: "Failed to send Verifiaction Email"
        }
        
    }
}