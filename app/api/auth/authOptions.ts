import axiosService from "@/lib/services/axiosService";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        return axiosService
          .post("/auth/login", {
            email: credentials?.email as string,
            password: credentials?.password as string,
          })
          .then(({ data }) => {
            return {
              token: data.access_token,
              id: data.user.id,
              user: data.user,
            };
          })
          .catch((error) => {
            throw new Error(error?.response?.data?.response?.message);
          });
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider == "credentials") {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        return {
          ...token,
          jwt: user.token,
          user: user.user,
        };
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.jwt = token.jwt;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
