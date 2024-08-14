import * as core from "@actions/core";
import { context } from "@actions/github";
import { GitHub } from "./github";
import { extractMajorTag, parseRef } from "./util";

export const main = async () => {
  try {
    const inputs = {
      token: core.getInput("token"),
    } as const;

    const github = new GitHub({
      owner: context.repo.owner,
      repo: context.repo.repo,
      token: inputs.token,
    });

    const ref = parseRef(context.ref);
    if (ref.type !== "tags") {
      throw new Error("not a tag event");
    }
    const majorTag = extractMajorTag(ref.name);
    core.setOutput("tag", majorTag);
    core.info(`Tag ${majorTag} will be synced with ${context.sha}`);

    const exists = await github.isTagExists(majorTag);
    if (exists) {
      // Update
      core.info(`Tag ${majorTag} already exists`);
      core.info(`Updating tag ${majorTag} to ${context.sha}`);
      await github.updateTag({ tag: majorTag, sha: context.sha });
      core.info("Tag updated successfully");
    } else {
      // Create
      core.info(`Tag ${majorTag} does not exist`);
      core.info(`Creating tag ${majorTag} at ${context.sha}`);
      await github.createTag({ tag: majorTag, sha: context.sha });
      core.info("Tag created successfully");
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      throw error;
    }
  }
};

await main();
