import { describe, expect, test } from "vitest";
import {
  stringSchema,
  stringToBigIntCodec,
} from "../__test_fixtures/index.ts";
import { isStandardCodec } from "./isStandardCodec.ts";

describe("isStandardCodec", () => {
  test("should return true for standard codec", () => {
    expect(isStandardCodec(stringToBigIntCodec)).toBe(true);
  });
  test("should return false for non-standard codec", () => {
    expect(isStandardCodec({ parse() {} })).toBe(false);
    expect(isStandardCodec(null)).toBe(false);
    expect(isStandardCodec({ "~standard": null })).toBe(false);
  });
  test("should return false for standard schema without encode", () => {
    expect(isStandardCodec(stringSchema)).toBe(false);
  });
  test("should return false for ~standard with invalid encode", () => {
    expect(
      isStandardCodec({
        "~standard": {
          version: 1,
          vendor: "custom",
          validate() {
            return {};
          },
          encode: "invalid",
        },
      }),
    ).toBe(false);
  });
  describe("check version", () => {
    test("should return true for standard codec v1", () => {
      expect(isStandardCodec(stringToBigIntCodec, 1)).toBe(true);
    });
    test("should return false for non-standard codec", () => {
      expect(isStandardCodec({ parse() {} }, 1)).toBe(false);
      expect(isStandardCodec(null, 1)).toBe(false);
    });
    test("should return false for other versions", () => {
      expect(
        isStandardCodec({
          "~standard": {
            version: 2,
            vendor: "custom",
            validate() {
              return {};
            },
            encode() {
              return {};
            },
          },
        }, 1),
      ).toBe(false);
    });
  });
});