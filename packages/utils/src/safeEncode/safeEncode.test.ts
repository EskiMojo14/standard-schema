import { describe, expect, test } from "vitest";
import {
  asyncStringToBigIntCodec,
  stringToBigIntCodec,
} from "../__test_fixtures/index.ts";
import { safeEncode, safeEncodeSync } from "./safeEncode.ts";

describe("safeEncode", () => {
  test("should return a result object", async () => {
    await expect(safeEncode(stringToBigIntCodec, 123n)).resolves.toEqual({
      value: "123",
    });

    await expect(safeEncode(asyncStringToBigIntCodec, 123n)).resolves.toEqual({
      value: "123",
    });
  });
  test("should return a result object with issues", async () => {
    await expect(safeEncode(stringToBigIntCodec, "123")).resolves.toEqual({
      issues: [{ message: "Expected bigint, got string" }],
    });

    await expect(safeEncode(asyncStringToBigIntCodec, "123")).resolves.toEqual({
      issues: [{ message: "Expected bigint, got string" }],
    });
  });
});

describe("safeEncodeSync", () => {
  test("should return a result object", () => {
    expect(safeEncodeSync(stringToBigIntCodec, 123n)).toEqual({
      value: "123",
    });
  });
  test("should return a result object with issues", () => {
    expect(safeEncodeSync(stringToBigIntCodec, "123")).toEqual({
      issues: [{ message: "Expected bigint, got string" }],
    });
  });
  test("should throw an error if the codec encoding is asynchronous", () => {
    expect(() => safeEncodeSync(asyncStringToBigIntCodec, 123n)).toThrowError(
      "Codec encoding must be synchronous",
    );
  });
});
