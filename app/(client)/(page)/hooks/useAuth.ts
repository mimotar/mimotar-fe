import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";

export const useAuth = () => {
  const session = useSession();
  const logOutUserAction = useCallback(() => signOut({ callbackUrl: "/" }), []);
  return {
    session: session.data?.user,
    IsAuthenticated: session.status === "authenticated",
    IsLoadingAuthenticate: session.status === "loading",
    userVerified: session.data?.user.verified,
    SignOut: logOutUserAction,
  };
};
