// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { dbConnect } from "@/config/db";
import crypto from "crypto";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await dbConnect();

          const user = await User.findOne({ email: credentials.email }).select("+password +twoFactorSecret").lean();

          if (!user) throw new Error("User not found");

          if (user.status === "banned") {
            throw new Error("Your account has been banned. Please contact support.");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your email before logging in.");
          }

          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isMatch) throw new Error("Invalid password");

          // Check for 2FA
          if (user.twoFactorEnabled) {
            if (!credentials.otp) {
              throw new Error("2FA_REQUIRED");
            }

            const { authenticator } = await import("otplib");
            const isValid = authenticator.verify({
              token: credentials.otp as string,
              secret: user.twoFactorSecret!,
            });

            if (!isValid) {
              throw new Error("Invalid 2FA code");
            }
          }

          // Generate or update refresh token for credentials user
          const refreshToken = crypto.randomBytes(40).toString("hex");
          await User.findByIdAndUpdate(user._id, { refreshToken });

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
            image: user.image,
            refreshToken, // Pass to JWT callback
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Check if it's the first user
            const userCount = await User.countDocuments();
            const role = userCount === 0 ? "admin" : "user";

            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: role,
              isVerified: true, // Social accounts are auto-verified
              status: "active",
            });
          } else {
            // If user exists, update their image if it changed
            if (user.image && existingUser.image !== user.image) {
              existingUser.image = user.image;
              await existingUser.save();
            }
            
            // Check if banned
            if (existingUser.status === "banned") {
              return false;
            }
          }
          return true;
        } catch (error) {
          console.error("Error in social sign in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // For credentials, user.role is already there from authorize
        // For social, we need to fetch it from DB on first sign in
        if (account?.provider !== "credentials") {
          await dbConnect();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.role = dbUser.role;
            token.status = dbUser.status;
          }
        } else {
          token.role = (user as { role: string }).role;
          token.status = (user as unknown as { status: string }).status;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as unknown as { status: string }).status = token.status as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
