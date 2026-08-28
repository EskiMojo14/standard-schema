import { describe, expect, test } from "vitest";
import {
  asyncStringToBigIntCodec,
  stringToBigIntCodec,
} from "../__test_fixtures/index.ts";
import { encode, encodeSync } from "./encode.ts";

describe("encode", () => {
  test("should return the encoded data", async () => {
    await expect(encode(stringToBigIntCodec, 123n)).resolves.toBe("123");

    await expect(encode(asyncStringToBigIntCodec, 123n)).resolves.toBe("123");
  });
  test("should throw an error if the data is invalid", async () => {
    await expect(encode(stringToBigIntCodec, "123")).rejects.toThrowError(
      "Expected bigint, got string",
    );

    await expect(encode(asyncStringToBigIntCodec, "123")).rejects.toThrowError(
      "Expected bigint, got string",
    );
  });
});

describe("encodeSync", () => {
  test("should return the encoded data", () => {
    expect(encodeSync(stringToBigIntCodec, 123n)).toBe("123");
  });
  test("should throw an error if the data is invalid", () => {
    expect(() => encodeSync(stringToBigIntCodec, "123")).toThrowError(
      "Expected bigint, got string",
    );
  });
  test("should throw an error if the codec encoding is asynchronous", () => {
    expect(() => encodeSync(asyncStringToBigIntCodec, 123n)).toThrowError(
      "Codec encoding must be synchronous",
    );
  });
});
