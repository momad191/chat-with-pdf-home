import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers'; // Import cookies from the headers

export default getRequestConfig(async () => {
  // Fetch the locale from cookies
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get('lan')?.value || 'en'; // Fallback to 'en' if no cookie is found

  return {
    locale: localeFromCookie, // Locale will always be a string
    messages: (await import(`../../messages/${localeFromCookie}.json`)).default
  };
});