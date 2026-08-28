import { describe, expectTypeOf, test } from "vitest";
import { stringToBigIntCodec } from "../__test_fixtures/index.ts";
import { decode, decodeSync } from "./decode.ts";

describe("decode", () => {
  test("should infer output type from codec", () => {
    expectTypeOf(decode(stringToBigIntCodec, "123")).toEqualTypeOf<
      Promise<bigint>
    >();
  });
});

describe("decodeSync", () => {
  test("should infer output type from codec", () => {
    expectTypeOf(
      decodeSync(stringToBigIntCodec, "123"),
    ).toEqualTypeOf<bigint>();
  });
});
