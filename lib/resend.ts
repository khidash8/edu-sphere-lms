import { Resend } from 'resend';
import { env } from '@/lib/env';

export const resend = new Resend(env.RESEND_MAIL_API_KEY);
