import 'server-only';

import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from '@arcjet/next';
import { env } from '@/lib/env';

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};

export default arcjet({
  key: env.ARCJET_KEY,
  characteristics: ['fingerprint'],
  rules: [
    // You can include one or more rules base rules. We don't include any here
    // so they can be set on each sub-page for the demo.
    shield({
      mode: 'LIVE',
    }),
    detectBot({
      mode: 'LIVE',
      allow: [
        'CATEGORY:SEARCH_ENGINE',
        'CATEGORY:MONITOR',
        'CATEGORY:PREVIEW',
        'STRIPE_WEBHOOK',
      ],
    }),
  ],
});
