import { describe, expectTypeOf, test } from "vitest";
import { stringToBigIntCodec } from "../__test_fixtures/index.ts";
import { encode, encodeSync } from "./encode.ts";

describe("encode", () => {
  test("should infer input type from codec", () => {
    expectTypeOf(encode(stringToBigIntCodec, 123n)).toEqualTypeOf<
      Promise<string>
    >();
  });
});

describe("encodeSync", () => {
  test("should infer input type from codec", () => {
    expectTypeOf(encodeSync(stringToBigIntCodec, 123n)).toEqualTypeOf<string>();
  });
});
