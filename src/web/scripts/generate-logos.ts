const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

// Define the BillBox logo SVG content
const svgContent = `<svg width="44" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 9V31C2 35.4183 5.58172 39 10 39H34C38.4183 39 42 35.4183 42 31V9H2ZM12 15.5C12 14.6716 12.6716 14 13.5 14H30.5C31.3284 14 32 14.6716 32 15.5C32 16.3284 31.3284 17 30.5 17H13.5C12.6716 17 12 16.3284 12 15.5Z" fill="#2463EB"/>
<rect width="44" height="7" rx="2" fill="#2463EB"/>
</svg>`;

// Create a version with padding to ensure nothing gets cut off
const paddedSvgContent = `<svg width="48" height="45" viewBox="0 0 48 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(2, 3)">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 9V31C2 35.4183 5.58172 39 10 39H34C38.4183 39 42 35.4183 42 31V9H2ZM12 15.5C12 14.6716 12.6716 14 13.5 14H30.5C31.3284 14 32 14.6716 32 15.5C32 16.3284 31.3284 17 30.5 17H13.5C12.6716 17 12 16.3284 12 15.5Z" fill="#2463EB"/>
  <rect width="44" height="7" rx="2" fill="#2463EB"/>
</g>
</svg>`;

async function generateLogos() {
  const publicDir = path.join(process.cwd(), "public");

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // SVG logo
  fs.writeFileSync(path.join(publicDir, "logo.svg"), svgContent);
  console.log("Generated: logo.svg");

  // favicon.ico (32x32)
  await sharp(Buffer.from(paddedSvgContent))
    .resize(32, 32)
    .toFile(path.join(publicDir, "favicon.ico"));
  console.log("Generated: favicon.ico");

  // favicon-16x16.png
  await sharp(Buffer.from(paddedSvgContent))
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, "favicon-16x16.png"));
  console.log("Generated: favicon-16x16.png");

  // favicon-32x32.png
  await sharp(Buffer.from(paddedSvgContent))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png"));
  console.log("Generated: favicon-32x32.png");

  // apple-touch-icon.png (180x180)
  await sharp(Buffer.from(paddedSvgContent))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("Generated: apple-touch-icon.png");

  // android-chrome icons
  await sharp(Buffer.from(paddedSvgContent))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "android-chrome-192x192.png"));
  console.log("Generated: android-chrome-192x192.png");

  await sharp(Buffer.from(paddedSvgContent))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "android-chrome-512x512.png"));
  console.log("Generated: android-chrome-512x512.png");

  // og-image.png (1200x630)
  const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="white"/>
    <g transform="translate(490,165) scale(5)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 9V31C2 35.4183 5.58172 39 10 39H34C38.4183 39 42 35.4183 42 31V9H2ZM12 15.5C12 14.6716 12.6716 14 13.5 14H30.5C31.3284 14 32 14.6716 32 15.5C32 16.3284 31.3284 17 30.5 17H13.5C12.6716 17 12 16.3284 12 15.5Z" fill="#2463EB"/>
      <rect width="44" height="7" rx="2" fill="#2463EB"/>
    </g>
    <text x="600" y="470" text-anchor="middle" font-family="Arial" font-size="64" font-weight="bold" fill="#10172A">
      BillBox
    </text>
    <text x="600" y="520" text-anchor="middle" font-family="Arial" font-size="32" fill="#10172A" opacity="0.5">
      Smart Invoice Management
    </text>
  </svg>`;

  await sharp(Buffer.from(ogImageSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, "og-image.png"));
  console.log("Generated: og-image.png");

  // Generate manifest.json
  const manifest = {
    name: "BillBox",
    short_name: "BillBox",
    description: "Intelligent invoice management tool",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2463EB",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  fs.writeFileSync(
    path.join(publicDir, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("Generated: manifest.json");

  console.log("All logo assets generated successfully!");
}

generateLogos().catch(console.error);