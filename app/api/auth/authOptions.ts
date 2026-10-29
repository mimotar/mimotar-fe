import { unTokenAxiosInstance } from "@/lib/services/axiosService";
import { AxiosError } from "axios";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       firstName: string;
//       lastName: string;
//       accessToken: string;
//       verified: boolean;
//       refreshToken?: string;
//       phone_no?: string;
//       address?: string;
//       city?: string;
//       country?: string;
//       postal_code?: string;
//       id_number?: number;
//       avatar?: string;
//     };
//   }

//   interface User {
//     id: string;
//     email: string;
//     firstName: string;
//     lastName: string;
//     verified: boolean;
//     accessToken: string;
//     phone_no?: string;
//     address?: string;
//     city?: string;
//     country?: string;
//     postal_code?: string;
//     id_number?: number;
//     avatar?: string;
//   }
// }

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
        console.log("input", req);
        return unTokenAxiosInstance
          .post("user/login-with-email", {
            email: credentials?.email as string,
            password: credentials?.password as string,
          })
          .then(({ data }) => {
            // console.log("server login data", data);
            if (!data) {
              return null;
            }

            console.log("server data", data);
            return {
              id: data.data.user.id,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              accessToken: data.data.token,
              email: data.data.user.email,
              verified: data.data.user.verified,
              phone_no: data.data.user.profile?.phone_no || "",
              phoneVerified: data.data.user.profile?.phoneVerified || false,
              address: data.data.user.profile?.address || "",
              city: data.data.user.profile?.city || "",
              country: data.data.user.profile?.country || "",
              postal_code: data.data.user.profile?.postal_code || "",
              id_number: data.data.user.profile?.id_number,
              avatar: data.data.user.profile?.avatar || "",
              avatarUrl: data.data.user.profile?.avatarUrl || "",
              profilePicture: data.data.user.profile?.profilePicture || "",
            };
          })
          .catch((error) => {
            console.log(
              "login error 1",
              JSON.stringify((error as AxiosError).response),
            );

            if (error instanceof AxiosError) {
              console.log(error.response?.data.message);
            }
            // throw new Error(error?.response?.data?.response?.message);
            console.log("login error", error);
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
    jwt: async ({ token, user, trigger, account, session, profile }) => {
      // console.log("profile", profile);
      // console.log("account", account);
      // console.log("user", user);

      if (trigger === "update" && session) {
        token.firstName = session.firstName ?? token.firstName;
        token.lastName = session.lastName ?? token.lastName;
        token.phone_no = session.phone_no ?? token.phone_no;
        token.phoneVerified = session.phoneVerified ?? token.phoneVerified;
        token.address = session.address ?? token.address;
        token.city = session.city ?? token.city;
        token.country = session.country ?? token.country;
        token.postal_code = session.postal_code ?? token.postal_code;
        token.id_number = session.id_number ?? token.id_number;
        token.avatar = session.avatar ?? token.avatar;
        token.avatarUrl = session.avatarUrl ?? token.avatarUrl;
        token.profilePicture = session.profilePicture ?? token.profilePicture;
      }

      if (account?.provider == "credentials" && user) {
        token.accessToken = user.accessToken;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.id = user.id;
        token.verified = user.verified;
        token.phone_no = user.phone_no;
        token.phoneVerified = user.phoneVerified;
        token.address = user.address;
        token.city = user.city;
        token.country = user.country;
        token.postal_code = user.postal_code;
        token.id_number = user.id_number;
        token.avatar = user.avatar;
        token.avatarUrl = user.avatarUrl;
        token.profilePicture = user.profilePicture;
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
        token.id = googleProfile?.sub;
        token.verified = googleProfile?.email_verified;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.accessToken = token.accessToken as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.id = token.id as string;
        session.user.verified = token.verified as boolean;
        session.user.phone_no = token.phone_no as string | undefined;
        session.user.phoneVerified = token.phoneVerified as boolean;
        session.user.address = token.address as string | undefined;
        session.user.city = token.city as string | undefined;
        session.user.country = token.country as string | undefined;
        session.user.postal_code = token.postal_code as string | undefined;
        session.user.id_number = token.id_number as number | undefined;
        session.user.avatar = token.avatar as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth?auth=login",
    signOut: "/",
  },
};
