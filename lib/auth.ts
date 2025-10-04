import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/db';
import { env } from '@/lib/env';
import { emailOTP } from 'better-auth/plugins';
import { resend } from '@/lib/resend';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: 'Anxious-Ape-LMS <onboarding@resend.dev>',
          to: [email],
          subject: 'OTP Verification',
          html: `<p>Verification <strong>OTP: ${otp}</strong></p>`,
        });
      },
    }),
    admin({
      defaultRole: 'user',
      adminRole: 'admin',
    }),
  ],
});
