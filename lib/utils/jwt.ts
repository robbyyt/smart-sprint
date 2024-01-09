import { jwtDecode } from 'jwt-decode';

type SafeParseResponse<T> = { success: true; result: T } | { success: false };

export function safeParseToken<T extends Record<string, any>>(token: string | null): SafeParseResponse<T> {
  if (!token) {
    return { success: false };
  }

  try {
    return { success: true, result: jwtDecode<T>(token) };
  } catch (_err) {
    return { success: false };
  }
}
