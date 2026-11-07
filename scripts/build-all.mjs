import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

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

// Build the root landing page first; Vite clears dist/ before app output is copied.
runNpm(["run", "build:home"]);

const ignoredDirectories = new Set([".git", ".vercel", "dist", "node_modules", "scripts"]);
const appDirectories = readdirSync(repositoryRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && !ignoredDirectories.has(entry.name))
  .sort((a, b) => a.name.localeCompare(b.name));

let builtApps = 0;
for (const entry of appDirectories) {
  const appDirectory = resolve(repositoryRoot, entry.name);
  const manifestPath = resolve(appDirectory, "package.json");
  if (!existsSync(manifestPath)) continue;

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (!manifest.name || !manifest.scripts?.build) {
    console.warn(`Skipping ${entry.name}: package.json needs a name and build script.`);
    continue;
  }

  console.log(`\nBuilding workspace: ${manifest.name}`);
  runNpm(["run", "build", `--workspace=${manifest.name}`], {
    APP_BASE_PATH: `/${entry.name}/`
  });

  const workspaceOutput = resolve(appDirectory, "dist");
  if (!existsSync(workspaceOutput)) throw new Error(`Workspace ${entry.name} did not create dist/.`);

  const deploymentOutput = resolve(outputRoot, entry.name);
  rmSync(deploymentOutput, { recursive: true, force: true });
  mkdirSync(outputRoot, { recursive: true });
  cpSync(workspaceOutput, deploymentOutput, { recursive: true });
  builtApps += 1;
}
console.log(`\nBuild complete: root homepage and ${builtApps} workspace app(s) are in dist/.`);
