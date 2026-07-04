import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      accessToken: string;
      firstName: string;
      lastName: string;
      verified: boolean;
      phone_no?: string;
      address?: string;
      city?: string;
      country?: string;
      postal_code?: string;
      id_number?: number;
      avatar?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    accessToken: string;
    phone_no?: string;
    address?: string;
    city?: string;
    country?: string;
    postal_code?: string;
    id_number?: number;
    avatar?: string;
  }
}
