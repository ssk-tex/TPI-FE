import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import * as tar from "tar";

// ---------------- CONFIG ----------------
const viteConfigPath = path.resolve("vite.config.js");
const distFolder = path.resolve("dist");
const outputTar = path.resolve("wbjit_integration.tar");

// ---------------- STEP 1: Update vite.config.js ----------------
let viteConfig = fs.readFileSync(viteConfigPath, "utf-8");

// Uncomment or add base line
if (viteConfig.includes("// base: '/wbjit-integration/',")) {
  viteConfig = viteConfig.replace(
    "// base: '/wbjit-integration/',",
    "base: '/wbjit-integration/',"
  );
} else if (!viteConfig.includes("base: '/wbjit-integration/',")) {
  viteConfig = viteConfig.replace(
    /plugins:\s*\[.*?\],/s,
    (match) => `${match}\n  base: '/wbjit-integration/',`
  );
}

fs.writeFileSync(viteConfigPath, viteConfig);
console.log("✅ vite.config.js updated with base path");

// ---------------- STEP 2: Build ----------------
console.log("🏗️ Building project...");
execSync("npm run build", { stdio: "inherit" });

// ---------------- STEP 3: Create tar using Node tar module ----------------
console.log("📦 Creating tar file...");
if (fs.existsSync(outputTar)) fs.unlinkSync(outputTar); // remove if exists

await tar.c(
  {
    file: outputTar,
    cwd: distFolder,
    gzip: false, // plain tar, change to true for .tar.gz
  },
  ["."]
);

console.log("🎉 Done! Created:", outputTar);

// ---------------- STEP 4: Revert vite.config.js ----------------
viteConfig = viteConfig.replace(
  "base: '/wbjit-integration/',",
  "// base: '/wbjit-integration/',"
);
fs.writeFileSync(viteConfigPath, viteConfig);
console.log("🔁 vite.config.js reverted to original");
