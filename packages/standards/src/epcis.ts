// Minimal type hints for EPCIS 2.0 JSON events (ObjectEvent)
export type EPCISObjectEvent = {
  type: "EPCIS:ObjectEvent";
  bizStep: string;
  action: "ADD" | "OBSERVE" | "DELETE";
  eventTime: string;
  epcList: string[];
};
// JSON is valid per EPCIS 2.0 which supports JSON & JSON-LD.  [oai_citation:9‡OpenEPCIS](https://openepcis.io/docs/epcis/?utm_source=chatgpt.com)
