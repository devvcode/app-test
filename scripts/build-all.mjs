import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { discoverWorkspaceApps, writeAppsManifest } from "./workspace-manifest.js";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(repositoryRoot, "dist");

function runNpm(args, extraEnvironment = {}) {
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    env: { ...process.env, ...extraEnvironment },
    stdio: "inherit",
    shell: process.platform === "win32"
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// Discover apps and generate the homepage manifest before Vite copies public/ into dist/.
const workspaces = discoverWorkspaceApps(repositoryRoot);
writeAppsManifest(repositoryRoot, workspaces);

// Build the root landing page first; Vite clears dist/ before app output is copied.
runNpm(["run", "build:home"]);

for (const workspace of workspaces) {
  const { directory, packageName } = workspace;
  const appDirectory = resolve(repositoryRoot, directory);

  console.log(`\nBuilding workspace: ${packageName}`);
  runNpm(["run", "build", `--workspace=${packageName}`], {
    APP_BASE_PATH: `/${directory}/`
  });

  const workspaceOutput = resolve(appDirectory, "dist");
  if (!existsSync(workspaceOutput)) {
    throw new Error(`Workspace ${directory} did not create dist/.`);
  }

  const deploymentOutput = resolve(outputRoot, directory);
  rmSync(deploymentOutput, { recursive: true, force: true });
  mkdirSync(outputRoot, { recursive: true });
  cpSync(workspaceOutput, deploymentOutput, { recursive: true });
}

console.log(`\nBuild complete: root homepage and ${workspaces.length} workspace app(s) are in dist/.`);
