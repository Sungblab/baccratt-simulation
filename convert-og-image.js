const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

// SVG를 데이터 URL로 변환
function svgToDataUrl(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// PNG로 변환
async function convertToPng() {
  // SVG 파일 읽기
  const svg = fs.readFileSync("og-image.svg", "utf8");
  const dataUrl = svgToDataUrl(svg);

  // Canvas 생성
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // 이미지 로드 및 그리기
  const img = await loadImage(dataUrl);
  ctx.drawImage(img, 0, 0);

  // PNG로 저장
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("og-image.png", buffer);

  console.log("OG 이미지가 성공적으로 생성되었습니다!");
}

convertToPng().catch(console.error);
