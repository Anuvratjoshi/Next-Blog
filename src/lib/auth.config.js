/*
 this is the basic one in the i haven't updated the id of the user and set it to the session whe user logged in using google
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      // console.log(auth);

      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnChatPage = request.nextUrl?.pathname.startsWith("/chat");
      const isOnDonationSuccessPage =
        request.nextUrl?.pathname.startsWith("/success");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      if (
        (isOnBlogPage && !user) ||
        (!user && isOnChatPage) ||
        (!user && isOnDonationSuccessPage)
      ) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },

    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //     token.isAdmin = user.isAdmin;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (token) {
    //     session.user.id = token.id;
    //     session.user.isAdmin = token.isAdmin;
    //   }
    //   return session;
    // },
    // authorized({ auth, request }) {
    //   const user = auth?.user;
    //   const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
    //   const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
    //   const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

    //   // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

    //   if (isOnAdminPanel && !user?.isAdmin) {
    //     return false;
    //   }

    //   // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

    //   if (isOnBlogPage && !user) {
    //     return false;
    //   }

    //   // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

    //   if (isOnLoginPage && user) {
    //     return Response.redirect(new URL("/", request.nextUrl));
    //   }

    //   return true;
    // },
  },
};


*/

import { User } from "./models";
import { connectToDb } from "./utils";

const getUserId = async (email) => {
  try {
    connectToDb();
    const user = await User.findOne({ email });
    return user._id;
  } catch (error) {
    return null;
  }
};

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user?.email) {
        const userId = await getUserId(user?.email);
        token.id = userId;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      // console.log(auth);

      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnChatPage = request.nextUrl?.pathname.startsWith("/chat");
      const isOnDonationSuccessPage =
        request.nextUrl?.pathname.startsWith("/success");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      if (
        (isOnBlogPage && !user) ||
        (!user && isOnChatPage) ||
        (!user && isOnDonationSuccessPage)
      ) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },
};
