#!/usr/bin/env node

// Read-only SFNT font inspection. No dependencies or font execution.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

interface TableRecord {
  start: number;
  length: number;
}

interface VariationAxis {
  tag: string;
  min: number;
  default: number;
  max: number;
}

interface FontInspection {
  format: "OTF" | "TTF";
  variable: boolean;
  os2Weight: number | null;
  axes: VariationAxis[];
}

export function inspect(bytes: Uint8Array): FontInspection {
  const buffer = Buffer.from(bytes);
  if (buffer.length < 12) throw new Error("Truncated font header");

  const signature = buffer.toString("ascii", 0, 4);
  if (buffer.readUInt32BE(0) !== 0x00010000 && !["OTTO", "true"].includes(signature)) {
    throw new Error("Only uncompressed SFNT TTF/OTF supported; WOFF/WOFF2/TTC need another inspector");
  }

  const tableCount = buffer.readUInt16BE(4);
  const tables: Record<string, TableRecord> = {};
  if (12 + tableCount * 16 > buffer.length) throw new Error("Truncated table directory");

  for (let index = 0; index < tableCount; index++) {
    const offset = 12 + index * 16;
    const tag = buffer.toString("ascii", offset, offset + 4);
    const start = buffer.readUInt32BE(offset + 8);
    const length = buffer.readUInt32BE(offset + 12);
    if (start + length > buffer.length) throw new Error(`Truncated ${tag} table`);
    tables[tag] = { start, length };
  }

  const os2 = tables["OS/2"];
  const os2Weight = os2 && os2.length >= 6 ? buffer.readUInt16BE(os2.start + 4) : null;
  const axes: VariationAxis[] = [];
  const variations = tables.fvar;

  if (variations) {
    if (variations.length < 16) throw new Error("Truncated fvar header");
    const axisStart = variations.start + buffer.readUInt16BE(variations.start + 4);
    const axisCount = buffer.readUInt16BE(variations.start + 8);
    const axisSize = buffer.readUInt16BE(variations.start + 10);
    if (axisSize < 20 || axisStart + axisCount * axisSize > variations.start + variations.length) {
      throw new Error("Invalid fvar axis records");
    }

    for (let index = 0; index < axisCount; index++) {
      const offset = axisStart + index * axisSize;
      axes.push({
        tag: buffer.toString("ascii", offset, offset + 4),
        min: buffer.readInt32BE(offset + 4) / 65536,
        default: buffer.readInt32BE(offset + 8) / 65536,
        max: buffer.readInt32BE(offset + 12) / 65536,
      });
    }
  }

  return {
    format: signature === "OTTO" ? "OTF" : "TTF",
    variable: Boolean(variations),
    os2Weight,
    axes,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.length < 3) {
    console.error("Usage: node inspect-sfnt.ts font.ttf [another.otf]");
    process.exitCode = 1;
  }

  for (const fontPath of process.argv.slice(2)) {
    try {
      console.log(JSON.stringify({
        path: resolve(fontPath),
        ...inspect(await readFile(fontPath)),
      }));
    } catch (error: unknown) {
      console.error(JSON.stringify({
        path: fontPath,
        error: error instanceof Error ? error.message : String(error),
      }));
      process.exitCode = 1;
    }
  }
}
