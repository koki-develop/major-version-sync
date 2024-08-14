export type Ref = {
  type: string;
  name: string;
};

export const parseRef = (ref: string) => {
  if (!ref.startsWith("refs/")) {
    throw new Error("not a valid ref");
  }
  const [, type, ...name] = ref.split("/");
  return { type, name: name.join("/") };
};

export const extractMajorTag = (tag: string) => {
  if (!tag.match(/^v\d+\.\d+\.\d+$/)) {
    throw new Error("tag must be in the semver format (e.g. v1.2.3)");
  }
  return tag.split(".")[0];
};
