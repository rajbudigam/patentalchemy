// Compose a minimal GS1 Digital Link–style URL (GTIN + serial)
export function gs1DigitalLink(baseUrl: string, gtin: string, serial: string) {
  // Ref: GS1 Digital Link spec (URIs embedding GS1 keys). 
  // Example path: /01/<gtin>/21/<serial>
  return `${baseUrl.replace(/\/$/,"")}/01/${gtin}/21/${encodeURIComponent(serial)}`;
}

// Why it matters: GS1 Digital Link standard “web-enables” identifiers like GTINs by embedding them in URIs, typically encoded as QR.
