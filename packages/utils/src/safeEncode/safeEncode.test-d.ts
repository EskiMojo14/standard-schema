import type { StandardCodecV1 } from "@standard-schema/spec";
import { describe, expectTypeOf, test } from "vitest";
import { stringToBigIntCodec } from "../__test_fixtures/index.ts";
import { safeEncode, safeEncodeSync } from "./safeEncode.ts";

describe("safeEncode", () => {
  test("should infer input type from codec", () => {
    expectTypeOf(safeEncode(stringToBigIntCodec, 123n)).toEqualTypeOf<
      Promise<StandardCodecV1.Result<string>>
    >();
  });
});

describe("safeEncodeSync", () => {
  test("should infer input type from codec", () => {
    expectTypeOf(safeEncodeSync(stringToBigIntCodec, 123n)).toEqualTypeOf<
      StandardCodecV1.Result<string>
    >();
  });
});
