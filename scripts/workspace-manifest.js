import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ignoredDirectories = new Set([".git", ".vercel", "dist", "node_modules", "scripts"]);

function titleFromFolder(folderName) {
  return folderName
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function discoverWorkspaceApps(repositoryRoot) {
  const directories = readdirSync(repositoryRoot, { withFileTypes: true })
    .filter((entry) =>
      entry.isDirectory() &&
      !entry.name.startsWith(".") &&
      !ignoredDirectories.has(entry.name)
    );

  const apps = [];

  for (const entry of directories) {
    const directory = entry.name;
    const manifestPath = resolve(repositoryRoot, directory, "package.json");
    if (!existsSync(manifestPath)) continue;

    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (!manifest.name || !manifest.scripts?.build) {
      console.warn(`Skipping ${directory}: package.json needs a name and build script.`);
      continue;
    }

    const metadata = manifest.appTestLab ?? {};
    const displayName = typeof metadata.displayName === "string" && metadata.displayName.trim()
      ? metadata.displayName.trim()
      : titleFromFolder(directory);

    apps.push({
      directory,
      packageName: manifest.name,
      displayName,
      description: typeof metadata.description === "string" && metadata.description.trim()
        ? metadata.description.trim()
        : `${displayName} is an independent workspace application.`,
      category: typeof metadata.category === "string" && metadata.category.trim()
        ? metadata.category.trim()
        : "INDEPENDENT APPLICATION",
      icon: typeof metadata.icon === "string" && metadata.icon.trim()
        ? metadata.icon.trim()
        : "◈",
      sortOrder: Number.isFinite(metadata.sortOrder) ? metadata.sortOrder : 100
    });
  }

  return apps.sort((a, b) =>
    a.sortOrder - b.sortOrder || a.directory.localeCompare(b.directory)
  );
}

export function writeAppsManifest(repositoryRoot, apps) {
  const publicDirectory = resolve(repositoryRoot, "public");
  mkdirSync(publicDirectory, { recursive: true });

  const publicApps = apps.map((app) => ({
    name: app.displayName,
    description: app.description,
    category: app.category,
    icon: app.icon,
    url: `/${app.directory}/`
  }));

  writeFileSync(
    resolve(publicDirectory, "apps.json"),
    `${JSON.stringify(publicApps, null, 2)}\n`,
    "utf8"
  );

  return publicApps;
}

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const apps = discoverWorkspaceApps(repositoryRoot);
  writeAppsManifest(repositoryRoot, apps);
  console.log(`Generated homepage manifest for ${apps.length} workspace app(s).`);
}
