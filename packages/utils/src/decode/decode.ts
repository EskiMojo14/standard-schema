import type { StandardCodecV1 } from "@standard-schema/spec";
import type { LooseAutocomplete } from "../_types/index.ts";
import { SchemaError } from "../SchemaError/SchemaError.ts";
import { safeDecode, safeDecodeSync } from "../safeDecode/safeDecode.ts";

/**
 * Decode unknown data with a codec, throwing an error if the data is invalid.
 *
 * @param codec The codec to decode the data with.
 *
 * @param data The data to decode.
 *
 * @returns A promise that resolves to the decoded data.
 *
 * @throws {SchemaError} If the data is invalid.
 */
export async function decode<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferInput<TCodec>>,
): Promise<StandardCodecV1.InferOutput<TCodec>> {
  const result = await safeDecode(codec, data);
  if (result.issues) throw new SchemaError(result.issues);
  return result.value;
}

/**
 * Decode unknown data with a codec synchronously, throwing an error if the data is invalid or the codec decoding is asynchronous.
 *
 * @param codec The codec to decode the data with.
 *
 * @param data The data to decode.
 *
 * @returns The decoded data.
 *
 * @throws {SchemaError} If the data is invalid.
 * @throws {TypeError} If the codec decoding is asynchronous.
 */
export function decodeSync<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferInput<TCodec>>,
): StandardCodecV1.InferOutput<TCodec> {
  const result = safeDecodeSync(codec, data);
  if (result.issues) throw new SchemaError(result.issues);
  return result.value;
}
