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
            userNo: true,
            userId: true,
            email: true,
            status: true,
          },
        });
        console.log(`users : ${JSON.stringify(user)}`);
        if (!user) {
          throw new Error('user not found.');
        };
        
        // If no error and we have user data, return it
        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
    },
  }),
  // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.userNo = token.userNo;
        session.user.userId = token.userId;
        session.user.status = token.status;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.userNo = user.userNo;
        token.userId = user.userId;
        token.status = user.status;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
})