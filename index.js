const { chromium } = require("playwright");

(async () => {
  // Mở browser
  const browser = await chromium.launch({ headless: false }); // false để thấy trình duyệt
  const page = await browser.newPage();

  // Truy cập trang W3Schools
  await page.goto("https://www.w3schools.com/");

  // Chờ input xuất hiện
  await page.waitForSelector("#tnb-google-search-input");

  // Nhập nội dung vào ô search
  await page.fill("#tnb-google-search-input", "javascript tutorial");

  // Nhấn Enter
  await page.keyboard.press("Enter");

  // Chờ tải kết quả
  await page.waitForLoadState("networkidle");

  // Tạm dừng để xem kết quả
  await page.waitForTimeout(5000);

  // Đóng trình duyệt
  await browser.close();
})();
