export const LOGIN = '/login';
export const ROOT = '/';

export const PUBLIC_ROUTES = [ 
    '/login',
    '/register',
    '/pricing',
    '/contact',
    '/features',
    
    '/api/auth/callback/google',
    '/api/auth/callback/github',
    '/api/register',
    '/api/contact',
    '/api/stripe',
    '/api/webhook',

]

export const PROTECTED_SUB_ROUTES = [
    '/dashboard',
]