import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-db");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword:({user, url, token}, request)=>{
      void resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
      to: "mdwakil2009@gmail.com",
     subject: "Reset your password",
        html: ` <h4>Reset yout password</>
        Click the link to reset your password: ${url}
        <p>Ignore this email if you haven t requested a password </p>`,
      })
      
    }
  },
  emailVerification: {
  sendVerificationEmail: async ({ user, url, token }) => {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "mdwakil2009@gmail.com",
      subject: "Verify your email address",
      html: `
        <h2>Please verify your email address</h2>
        <p>Click the button below to verify your email:</p>

        <a href="${url}">
          Verify Email
        </a>
      `,
    });

    console.log("RESEND DATA:", data);
    console.log("RESEND ERROR:", error);
  },

  sendOnSignUp: true,
  autoSignInAfterVerification: true,
  expiresIn: 7 * 24 * 3600,
},
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECTET,
    },
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
