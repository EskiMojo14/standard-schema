import { describe, expect, test } from "vitest";
import {
  asyncStringToBigIntCodec,
  stringToBigIntCodec,
} from "../__test_fixtures/index.ts";
import { safeDecode, safeDecodeSync } from "./safeDecode.ts";

describe("safeDecode", () => {
  test("should return a result object", async () => {
    await expect(safeDecode(stringToBigIntCodec, "123")).resolves.toEqual({
      value: 123n,
    });

    await expect(safeDecode(asyncStringToBigIntCodec, "123")).resolves.toEqual({
      value: 123n,
    });
  });
  test("should return a result object with issues", async () => {
    await expect(safeDecode(stringToBigIntCodec, 123n)).resolves.toEqual({
      issues: [{ message: "Expected string, got bigint" }],
    });

    await expect(safeDecode(asyncStringToBigIntCodec, 123n)).resolves.toEqual({
      issues: [{ message: "Expected string, got bigint" }],
    });
  });
});

describe("safeDecodeSync", () => {
  test("should return a result object", () => {
    expect(safeDecodeSync(stringToBigIntCodec, "123")).toEqual({
      value: 123n,
    });
  });
  test("should return a result object with issues", () => {
    expect(safeDecodeSync(stringToBigIntCodec, 123n)).toEqual({
      issues: [{ message: "Expected string, got bigint" }],
    });
  });
  test("should throw an error if the codec decoding is asynchronous", () => {
    expect(() => safeDecodeSync(asyncStringToBigIntCodec, "123")).toThrowError(
      "Codec decoding must be synchronous",
    );
  });
});
