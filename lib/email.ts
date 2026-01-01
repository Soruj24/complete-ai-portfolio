// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "Your App"}" <${
        process.env.EMAIL_FROM_ADDRESS
      }>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent successfully to ${to}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Failed to send email via Nodemailer:", error);
    throw new Error("Failed to send email");
  }
}

export async function sendVerificationEmail(email: string, verificationLink: string) {
  return sendEmail({
    to: email,
    subject: "Verify Your Email Address",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #1f2937; margin-bottom: 16px;">Welcome! Verify Your Email</h2>
          <p style="color: #4b5563; line-height: 1.5;">Thanks for signing up. Please verify your email address to complete your registration and secure your account.</p>
          <div style="margin: 32px 0; text-align: center;">
            <a href="${verificationLink}" 
               style="background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; padding: 14px 28px; 
                      text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              Verify Email Address
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link in your browser:</p>
          <p style="color: #3b82f6; font-size: 13px; word-break: break-all; background-color: #f3f4f6; padding: 12px; border-radius: 6px;">${verificationLink}</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            This link will expire in 24 hours. If you didn't create an account, please ignore this email.
          </p>
        </div>
      `,
  });
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  return sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p>You requested to reset your password. Click the button below to set a new password:</p>
          <div style="margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="color: #666; word-break: break-all;">${resetLink}</p>
          <p style="color: #999; font-size: 14px;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
  });
}
