import type { StandardCodecV1 } from "@standard-schema/spec";
import type { LooseAutocomplete } from "../_types/index.ts";
import { SchemaError } from "../SchemaError/SchemaError.ts";
import { safeEncode, safeEncodeSync } from "../safeEncode/safeEncode.ts";

/**
 * Encode unknown data with a codec, throwing an error if the data is invalid.
 *
 * @param codec The codec to encode the data with.
 *
 * @param data The data to encode.
 *
 * @returns A promise that resolves to the encoded data.
 *
 * @throws {SchemaError} If the data is invalid.
 */
export async function encode<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferOutput<TCodec>>,
): Promise<StandardCodecV1.InferInput<TCodec>> {
  const result = await safeEncode(codec, data);
  if (result.issues) throw new SchemaError(result.issues);
  return result.value;
}

/**
 * Encode unknown data with a codec synchronously, throwing an error if the data is invalid or the codec encoding is asynchronous.
 *
 * @param codec The codec to encode the data with.
 *
 * @param data The data to encode.
 *
 * @returns The encoded data.
 *
 * @throws {SchemaError} If the data is invalid.
 * @throws {TypeError} If the codec encoding is asynchronous.
 */
export function encodeSync<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferOutput<TCodec>>,
): StandardCodecV1.InferInput<TCodec> {
  const result = safeEncodeSync(codec, data);
  if (result.issues) throw new SchemaError(result.issues);
  return result.value;
}
