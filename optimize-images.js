// optimize-images.js
import sharp from "sharp";
import fs from "fs";
import path from "path";

const BASE_DIR = path.resolve("public/assets");

const TARGET_DIRS = ["art", "images/me", "images/projects"];

const SIZES = [400, 800, 1200, 1600];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 🔥 OPTIMIZED KLASÖRÜNÜ TAMAMEN YOK SAY
function isOptimizedDir(filePath) {
  return filePath.split(/[/\\]/).includes("optimized");
}

async function optimizeImage(inputPath, outputDir, baseName) {
  ensureDir(outputDir);

  for (const size of SIZES) {
    const outputPath = path.join(outputDir, `${baseName}-${size}.webp`);

    await sharp(inputPath)
      .resize(size)
      .webp({ quality: 80 })
      .toFile(outputPath);
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`❌ Dizin bulunamadı: ${dirPath}`);
    return;
  }

  // Eğer optimized diziniyse tamamen geç
  if (isOptimizedDir(dirPath)) return;

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.lstatSync(fullPath);

    // Klasörse → recursive tara
    if (stat.isDirectory()) {
      if (file === "optimized") continue; // 🔥 DO NOT RE-OPTIMIZE
      processDirectory(fullPath);
      continue;
    }

    // Sadece .webp dosyaları optimize edilsin
    if (!file.toLowerCase().endsWith(".webp")) continue;

    // optimized altındaki .webp’leri asla optimize etme
    if (isOptimizedDir(fullPath)) continue;

    const baseName = path.parse(file).name;
    const optimizedDir = path.join(dirPath, "optimized");

    console.log(`🖼 Optimize ediliyor → ${fullPath}`);
    optimizeImage(fullPath, optimizedDir, baseName);
  }
}

console.log("🚀 Görsel optimizasyon başlıyor...\n");

TARGET_DIRS.forEach((target) => {
  const dirPath = path.join(BASE_DIR, target);
  console.log(`📁 Tarama: ${dirPath}`);
  processDirectory(dirPath);
});

console.log("\n🎉 Tüm görseller optimize edildi!");
