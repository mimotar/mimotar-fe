import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith(`/dashboard`)) {
        // console.log("token", token);
        if (!token) {
          return false;
        }
      }
      return true;
    },
  },
});
