import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '@/i18n/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix: 'as-needed',
  // Used when no locale matches
  defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!.*\\..*|_next).*)', // Match all pathnames except for the ones containing a dot (e.g. `favicon.ico`) or `_next`
    '/', // Match the root route
    '/(api|trpc)(.*)', // Match the API routes and tRPC routes
  ],
};
