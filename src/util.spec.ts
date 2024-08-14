import { describe, expect, test } from "vitest";
import { extractMajorTag, parseRef } from "./util";

describe("parseRef", () => {
  test.each([
    ["refs/tags/v1.2.3", { type: "tags", name: "v1.2.3" }],
    ["refs/heads/main", { type: "heads", name: "main" }],
    ["refs/pull/123/merge", { type: "pull", name: "123/merge" }],
    ["refs/heads/feature/branch", { type: "heads", name: "feature/branch" }],
  ])("parseRef(%s) should return %o", (ref, expected) => {
    const result = parseRef(ref);
    expect(result).toEqual(expected);
  });
});

describe("extractMajorTag", () => {
  test.each([
    ["v1.2.3", "v1"],
    ["v1.0.0", "v1"],
    ["v2.0.0", "v2"],
    ["v10.0.0", "v10"],
  ])("extractMajorTag(%s) should return %s", (tag, expected) => {
    const result = extractMajorTag(tag);
    expect(result).toBe(expected);
  });
});
