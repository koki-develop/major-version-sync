import { describe, expect, test } from "vitest";
import { parseRef } from "./util";

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
