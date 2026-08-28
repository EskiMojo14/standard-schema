import type {
  StandardCodecV1,
  StandardJSONSchemaV1,
  StandardSchemaV1,
} from "@standard-schema/spec";

export const stringSchema: StandardSchemaV1<string> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    validate: (value) => {
      const pass = typeof value === "string";
      return pass
        ? { value }
        : {
            issues: [{ message: `Expected string, got ${typeof value}` }],
          };
    },
  },
};

export const stringToBigIntCodec: StandardCodecV1<string, bigint> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    validate: (value) => {
      const pass = typeof value === "string";
      return pass
        ? { value: BigInt(value) }
        : {
            issues: [{ message: `Expected string, got ${typeof value}` }],
          };
    },
    encode: (value) => {
      const pass = typeof value === "bigint";
      return pass
        ? { value: value.toString() }
        : {
            issues: [{ message: `Expected bigint, got ${typeof value}` }],
          };
    },
  },
};

export const asyncStringToBigIntCodec: StandardCodecV1<string, bigint> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    validate: async (value) => {
      const pass = typeof value === "string";
      return pass
        ? { value: BigInt(value) }
        : {
            issues: [{ message: `Expected string, got ${typeof value}` }],
          };
    },
    encode: async (value) => {
      const pass = typeof value === "bigint";
      return pass
        ? { value: value.toString() }
        : {
            issues: [{ message: `Expected bigint, got ${typeof value}` }],
          };
    },
  },
};

export const stringJsonSchema: StandardJSONSchemaV1<string> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    jsonSchema: {
      input: () => ({ type: "string" }),
      output: () => ({ type: "string" }),
    },
  },
};

export const stringToNumberSchema: StandardSchemaV1<string, number> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    validate: (value) => {
      const pass = typeof value === "string";
      return pass
        ? { value: Number(value) }
        : {
            issues: [{ message: `Expected string, got ${typeof value}` }],
          };
    },
  },
};

export const stringToNumberJsonSchema: StandardJSONSchemaV1<string, number> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    jsonSchema: {
      input: () => ({ type: "string" }),
      output: () => ({ type: "number" }),
    },
  },
};

export const asyncStringSchema: StandardSchemaV1<string> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    validate: async (value) => {
      const pass = typeof value === "string";
      return pass
        ? { value }
        : {
            issues: [{ message: `Expected string, got ${typeof value}` }],
          };
    },
  },
};

export interface Fields {
  foo: string;
  bar: number;
}

export const fieldsSchema: StandardSchemaV1<Fields> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    validate: () => ({ issues: [{ message: "Not implemented" }] }),
  },
};

const _fieldsJsonSchema = {
  type: "object",
  properties: {
    foo: { type: "string" },
    bar: { type: "number" },
  },
  required: ["foo", "bar"],
};

export const fieldsJsonSchema: StandardJSONSchemaV1<Fields> = {
  "~standard": {
    version: 1,
    vendor: "custom",
    jsonSchema: {
      input: () => _fieldsJsonSchema,
      output: () => _fieldsJsonSchema,
    },
  },
};
