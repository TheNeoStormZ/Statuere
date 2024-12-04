// cookieUtils.ts nos permite tener abstracción entre cliente y servidor (/api)
import { getCookie as getCookieClient, setCookie as setCookieClient, deleteCookie as deleteCookieClient, hasCookie as hasCookieClient } from 'cookies-next/client';
import { getCookie as getCookieServer, setCookie as setCookieServer, deleteCookie as deleteCookieServer, hasCookie as hasCookieServer } from 'cookies-next/server';

const isClient = typeof window !== 'undefined';

export const getCookie = isClient ? getCookieClient : getCookieServer;
export const setCookie = isClient ? setCookieClient : setCookieServer;
export const deleteCookie = isClient ? deleteCookieClient : deleteCookieServer;
export const hasCookie = isClient ? hasCookieClient : hasCookieServer;
