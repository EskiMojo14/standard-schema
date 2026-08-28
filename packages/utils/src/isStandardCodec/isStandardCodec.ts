import type { StandardCodecV1 } from "@standard-schema/spec";
import { isStandardSchema } from "../isStandardSchema/index.ts";

// check for any version
export function isStandardCodec(schema: unknown): schema is StandardCodecV1;
// check for specific version
export function isStandardCodec(
  schema: unknown,
  version: 1,
): schema is StandardCodecV1;
export function isStandardCodec(
  schema: unknown,
  version?: number,
): schema is StandardCodecV1 {
  return (
    // @ts-expect-error easier to ignore than to account for isStandardSchema overloads
    isStandardSchema(schema, version) &&
    typeof (schema["~standard"] as StandardCodecV1.Props).encode === "function"
  );
}
