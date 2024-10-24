import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    organization: string;
    id: string;
    password: string;
  }
}

const nextAuthSecret = `${process.env.NEXTAUTH_SECRET}`;
if (!nextAuthSecret) {
  throw new Error("NEXTAUTH_SECRET is not set");
}

const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      name: "credentials",
      credentials: {
        organization: {
          label: "Organization",
          type: "text",
          placeholder: "Organization",
        },
        id: {
          label: "ID",
          type: "text",
          placeholder: "ID",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.organization) {
            throw new Error("Organization is undefined");
          } else if (!credentials?.id) {
            throw new Error("ID is undefined");
          } else if (!credentials?.password) {
            throw new Error("Password is undefined");
          }
          return {
            id: `${credentials.organization}:${credentials.id}:${credentials.password}`,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      const [organization, id, password] = token.sub.split(":");

      if (!organization || !id || !password) {
        return session;
      }

      session.organization = organization;
      session.id = id;
      session.password = password;

      return session;
    },
  },
  secret: nextAuthSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};

export default authOptions;
