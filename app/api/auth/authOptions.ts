import axiosService, {
  unTokenAxiosInstance,
} from "@/lib/services/axiosService";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      accessToken: string;
      verified: boolean;
      refreshToken?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    accessToken: string;
  }
}

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
        return unTokenAxiosInstance
          .post("user/login-with-email", {
            email: credentials?.email as string,
            password: credentials?.password as string,
          })
          .then(({ data }) => {
            // console.log(data);
            if (!data) {
              return null;
            }
            return {
              id: data.data.user.id,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              accessToken: data.data.token,
              email: data.data.user.email,
              verified: data.data.user.verified,
            };
          })
          .catch((error) => {
            console.log(error);
            // throw new Error(error?.response?.data?.response?.message);
            return null;
          });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    // async signIn({ user, account }: { user: any; account: any }) {
    //   try {
    //     if (account?.provider == "credentials") {
    //       return true;
    //     }
    //     if (account?.provider == "google") {
    //       return true;
    //     }
    //   } catch (error) {
    //     return false;
    //   }

    //   return false;
    // },

    jwt: async ({ token, user, account, profile }) => {
      // console.log("profile", profile);
      // console.log("account", account);
      if (account?.provider == "credentials") {
        token.accessToken = user.accessToken;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.userId = user.id;
        token.verified = user.verified;
      }

      if (account?.provider == "google") {
        const googleProfile = profile as GoogleProfile & {
          email_verified: boolean;
          given_name: string;
          family_name: string;
          // picture:string
        };
        token.accessToken = account?.access_token;
        token.firstName = googleProfile?.given_name;
        token.lastName = googleProfile?.family_name;
        token.userId = googleProfile?.sub;
        token.verified = googleProfile?.email_verified;
      }

      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.userId = token.userId;
        session.user.verified = token.verified;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
