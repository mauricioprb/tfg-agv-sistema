import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const allowedGithubEmails = ["mauricio.pereira@ufn.edu.br"];
const allowedGoogleEmails = ["mauprb@gmail.com"];

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "github") {
        if (!allowedGithubEmails.includes(user.email)) {
          return false;
        }
      } else if (account.provider === "google") {
        if (!allowedGoogleEmails.includes(user.email)) {
          return false;
        }
      }
      return true;
    },
  },
};

export default authConfig;
