// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { to, subject, body } = await request.json();
        
        // Using Resend (modern email service)
        await resend.emails.send({
            from: 'ZSTATE <notifications@zstate.vercel.app>',
            to: to,
            subject: subject,
            text: body,
        });
        
        return NextResponse.json({ success: true });
        
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 }
        );
    }
}