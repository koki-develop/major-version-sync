import { getOctokit } from "@actions/github";

export type Config = {
  owner: string;
  repo: string;
  token: string;
};

export class GitHub {
  private readonly octokit: ReturnType<typeof getOctokit>;

  constructor(private readonly _config: Config) {
    this.octokit = getOctokit(_config.token);
  }

  async createTag(params: { tag: string; sha: string }): Promise<void> {
    await this.octokit.rest.git.createRef({
      owner: this._config.owner,
      repo: this._config.repo,
      ref: `refs/tags/${params.tag}`,
      sha: params.sha,
    });
  }

  async updateTag(params: { tag: string; sha: string }): Promise<void> {
    await this.octokit.rest.git.updateRef({
      owner: this._config.owner,
      repo: this._config.repo,
      ref: `tags/${params.tag}`,
      sha: params.sha,
      force: true,
    });
  }

  async isTagExists(tag: string): Promise<boolean> {
    return this.octokit.rest.git
      .getRef({
        owner: this._config.owner,
        repo: this._config.repo,
        ref: `tags/${tag}`,
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        if (error.status && error.status === 404) {
          return false;
        }
        throw error;
      });
  }
}
