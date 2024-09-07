import { z } from "zod";

const detailSchema = z
  .object({
    uid: z.string().optional(),
    "@type": z.string().optional(),
    message: z.string(),
  })
  .transform(({ uid, "@type": type, message }) => ({
    uid: uid || type || "unknown",
    message,
  }));

export const detailsArraySchema = z
  .array(
    z.union([z.string(), detailSchema, z.unknown().transform((d) => ({ uid: "unknown", message: JSON.stringify(d) }))])
  )
  .transform((details) =>
    details.map((d) => {
      if (typeof d === "string") return { uid: "unknown", message: d };
      return d;
    })
  );

export const extractDetails = (details: any[]): Array<{ uid: string; message: string }> => {
  return details.map((d) => {
    if (typeof d === "string") {
      return { uid: "unknown", message: d };
    } else if (d && typeof d === "object") {
      return {
        uid: d.uid || d["@type"] || "unknown",
        message: d.message || JSON.stringify(d),
      };
    }
    return { uid: "unknown", message: String(d) };
  });
};
