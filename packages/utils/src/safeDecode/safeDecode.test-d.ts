import type { StandardCodecV1 } from "@standard-schema/spec";
import { describe, expectTypeOf, test } from "vitest";
import { stringToBigIntCodec } from "../__test_fixtures/index.ts";
import { safeDecode, safeDecodeSync } from "./safeDecode.ts";

describe("safeDecode", () => {
  test("should infer output type from codec", () => {
    expectTypeOf(safeDecode(stringToBigIntCodec, "123")).toEqualTypeOf<
      Promise<StandardCodecV1.Result<bigint>>
    >();
  });
});

describe("safeDecodeSync", () => {
  test("should infer output type from codec", () => {
    expectTypeOf(safeDecodeSync(stringToBigIntCodec, "123")).toEqualTypeOf<
      StandardCodecV1.Result<bigint>
    >();
  });
});
