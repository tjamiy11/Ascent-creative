import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const projectsFile = path.join(rootDir, "lib", "projects.ts");
const mdxDir = path.join(rootDir, "content", "projects");

function readProjectSlugs() {
  const source = fs.readFileSync(projectsFile, "utf8");
  const regex = /slug:\s*"([^"]+)"/g;
  const slugs = new Set();
  let match;

  while ((match = regex.exec(source)) !== null) {
    slugs.add(match[1]);
  }

  return slugs;
}

function readMdxSlugs() {
  if (!fs.existsSync(mdxDir)) return [];
  return fs
    .readdirSync(mdxDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

const projectSlugs = readProjectSlugs();
const mdxSlugs = readMdxSlugs();
const orphanMdx = mdxSlugs.filter((slug) => !projectSlugs.has(slug));

if (orphanMdx.length > 0) {
  console.error("Orphan MDX files found (no matching project slug):");
  for (const slug of orphanMdx) {
    console.error(`- content/projects/${slug}.mdx`);
  }
  process.exit(1);
}

console.log(
  `MDX slug check passed (${mdxSlugs.length} mdx files, ${projectSlugs.size} projects).`
);
