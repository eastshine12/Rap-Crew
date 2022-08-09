import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  secret: process.env.SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Rap-Crew',

      credentials: {
        userId: { label: "아이디", type: "text", placeholder: "아이디를 입력하세요." },
        password: {  label: "비밀번호", type: "password" }
      },

      async authorize(credentials, req) {

        console.log(`credentials : ${JSON.stringify(credentials)}`);
        
        const user = await prisma.tb_user.findFirst({
          where: {
            userId: credentials.userId,
            password: credentials.password,
          },
          select: {
            userId: true,
            email: true,
            status: true,
          },
        });

        if (!user) {
          throw new Error('user not found.');
        };
        
        // If no error and we have user data, return it
        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
    // ...add more providers here
  ],
})