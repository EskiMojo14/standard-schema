import type { StandardCodecV1 } from "@standard-schema/spec";
import { _isThenable } from "../_isThenable/index.ts";
import type { LooseAutocomplete } from "../_types/index.ts";

/**
 * Decode unknown data with a codec, returning a result object.
 *
 * @param codec The codec to decode the data with.
 *
 * @param data The data to decode.
 *
 * @returns A promise that resolves to a result object.
 */
export async function safeDecode<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferInput<TCodec>>,
): Promise<StandardCodecV1.Result<StandardCodecV1.InferOutput<TCodec>>> {
  return codec["~standard"].validate(data);
}

/**
 * Decode unknown data with a codec synchronously, returning a result object.
 * Throws an error if the codec decoding is asynchronous.
 *
 * @param codec The codec to decode the data with.
 *
 * @param data The data to decode.
 *
 * @returns A result object.
 *
 * @throws {TypeError} If the codec decoding is asynchronous.
 */
export function safeDecodeSync<TCodec extends StandardCodecV1>(
  codec: TCodec,
  data: LooseAutocomplete<StandardCodecV1.InferInput<TCodec>>,
): StandardCodecV1.Result<StandardCodecV1.InferOutput<TCodec>> {
  const result = codec["~standard"].validate(data);
  if (_isThenable(result)) {
    throw new TypeError("Codec decoding must be synchronous");
  }
  return result;
}
