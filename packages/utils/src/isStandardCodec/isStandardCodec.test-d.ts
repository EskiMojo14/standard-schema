import type { StandardCodecV1 } from "@standard-schema/spec";
import { describe, expectTypeOf, test } from "vitest";
import { stringToBigIntCodec } from "../__test_fixtures/index.ts";
import { isStandardCodec } from "./isStandardCodec.ts";

describe("isStandardCodec", () => {
  test("should narrow types from unknown", () => {
    const maybeSchema: unknown = stringToBigIntCodec;
    if (isStandardCodec(maybeSchema)) {
      expectTypeOf(maybeSchema).toEqualTypeOf<StandardCodecV1>();
    }
  });
  test("should narrow types from unknown with version", () => {
    const maybeSchema: unknown = stringToBigIntCodec;
    if (isStandardCodec(maybeSchema, 1)) {
      expectTypeOf(maybeSchema).toEqualTypeOf<StandardCodecV1>();
    }
  });
  test("should narrow types from known", () => {
    const maybeSchema = stringToBigIntCodec as
      | StandardCodecV1<string, bigint>
      | { parse(value: unknown): string };
    if (isStandardCodec(maybeSchema)) {
      expectTypeOf(maybeSchema).toEqualTypeOf<StandardCodecV1<string, bigint>>();
    }
  });
  test("should narrow types from known with version", () => {
    const maybeSchema = stringToBigIntCodec as
      | StandardCodecV1<string, bigint>
      | { parse(value: unknown): string };
    if (isStandardCodec(maybeSchema, 1)) {
      expectTypeOf(maybeSchema).toEqualTypeOf<StandardCodecV1<string, bigint>>();
    }
  });
});