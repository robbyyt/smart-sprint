export function safeParseBearerToken(header: string | undefined): string | null {
  if (!header) return null;

  const tokenRegex = /^Bearer\s+(.*)$/; // Regex to match Bearer format
  const match = header.match(tokenRegex);
  if (match && match[1]) {
    return match[1]; // Extracted token
  } else {
    console.error('could not extract bearer token');
    return null;
  }
}
