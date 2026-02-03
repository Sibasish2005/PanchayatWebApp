import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import UserDataModel from "@/models/user.models";
import bcrypt from "bcryptjs"; 

// just fot the commit
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrMobile: { label: "Email or Mobile", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.emailOrMobile || !credentials?.password) {
          throw new Error("Please enter email/mobile and password");
        }

        await connectDB();

        // Find user by email or mobile number
        const user = await UserDataModel.findOne({
          $or: [
            { email: credentials.emailOrMobile },
            { mobileNo: credentials.emailOrMobile }
          ]
        });

        if (!user) {
          throw new Error("No user found with this email or mobile number");
        }

        // Check if account is active
        if (!user.accountStatus) {
          throw new Error("Your account is not activated yet");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user object for session
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          userId: user.userId,
          usertype: user.usertype,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = (user as any).userId;
        token.usertype = (user as any).usertype;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).userId = token.userId;
        (session.user as any).usertype = token.usertype;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };