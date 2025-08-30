export function getApiBase() {
  // Browser: use same origin unless NEXT_PUBLIC_API_BASE is set
  if (typeof window !== "undefined") {
    const env = process.env.NEXT_PUBLIC_API_BASE;
    return env && env.length ? env : `${window.location.origin.replace(/\/$/, "")}/api`;
  }
  // Server: prefer explicit or Codespaces domain
  const env = process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE;
  if (env && env.length) return env;
  const isCodespace = !!process.env.CODESPACES || !!process.env.CODESPACE_NAME;
  if (isCodespace) {
    const name = process.env.CODESPACE_NAME;
    const dom = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN; // e.g., app.github.dev
    // FastAPI runs on 8000
    return `https://${name}-8000.${dom}`;
  }
  return "http://localhost:8000";
}
