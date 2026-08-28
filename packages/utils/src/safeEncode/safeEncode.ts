import type { StandardCodecV1 } from "@standard-schema/spec";
import { _isThenable } from "../_isThenable/index.ts";
import type { LooseAutocomplete } from "../_types/index.ts";

/**
 * Encode unknown data with a codec, returning a result object.
 *
 * @param codec The codec to encode the data with.
 *
 * @param data The data to encode.
 *
 * @returns A promise that resolves to a result object.
 */
export async function safeEncode<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferOutput<TCodec>>,
): Promise<StandardCodecV1.Result<StandardCodecV1.InferInput<TCodec>>> {
  return codec["~standard"].encode(data);
}

/**
 * Encode unknown data with a codec synchronously, returning a result object.
 * Throws an error if the codec encoding is asynchronous.
 *
 * @param codec The codec to encode the data with.
 *
 * @param data The data to encode.
 *
 * @returns A result object.
 *
 * @throws {TypeError} If the codec encoding is asynchronous.
 */
export function safeEncodeSync<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferOutput<TCodec>>,
): StandardCodecV1.Result<StandardCodecV1.InferInput<TCodec>> {
  const result = codec["~standard"].encode(data);
  if (_isThenable(result)) {
    throw new TypeError("Codec encoding must be synchronous");
  }
  return result;
}
