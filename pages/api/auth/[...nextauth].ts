import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '#/prisma';


const isCorrectCredentials = async (credentials: { username: string; password: string; }) => {
  const { username, password } = credentials
  const user = await prisma.user.findUnique({ where: { username: username } });


  if (!user) return null;
  return user;
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Naam", type: "text", placeholder: "jsmith" },
        password: { label: "Wachtwoord", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(`authorizing...`)
        console.log({ credentials })
        const user = await isCorrectCredentials(credentials as { username: string; password: string; })
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
