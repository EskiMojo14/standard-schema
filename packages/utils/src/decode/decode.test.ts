import { describe, expect, test } from "vitest";
import {
  asyncStringToBigIntCodec,
  stringToBigIntCodec,
} from "../__test_fixtures/index.ts";
import { decode, decodeSync } from "./decode.ts";

describe("decode", () => {
  test("should return the decoded data", async () => {
    await expect(decode(stringToBigIntCodec, "123")).resolves.toBe(123n);

    await expect(decode(asyncStringToBigIntCodec, "123")).resolves.toBe(123n);
  });
  test("should throw an error if the data is invalid", async () => {
    await expect(decode(stringToBigIntCodec, 123n)).rejects.toThrowError(
      "Expected string, got bigint",
    );

    await expect(decode(asyncStringToBigIntCodec, 123n)).rejects.toThrowError(
      "Expected string, got bigint",
    );
  });
});

describe("decodeSync", () => {
  test("should return the decoded data", () => {
    expect(decodeSync(stringToBigIntCodec, "123")).toBe(123n);
  });
  test("should throw an error if the data is invalid", () => {
    expect(() => decodeSync(stringToBigIntCodec, 123n)).toThrowError(
      "Expected string, got bigint",
    );
  });
  test("should throw an error if the codec decoding is asynchronous", () => {
    expect(() => decodeSync(asyncStringToBigIntCodec, "123")).toThrowError(
      "Codec decoding must be synchronous",
    );
  });
});
