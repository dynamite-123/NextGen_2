import puppeteer from "puppeteer";

async function scrapeTableRows(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // ✅ Print the full page content (check where the table is located)
    const pageHTML = await page.evaluate(() => document.body.innerHTML);
    console.log("🔍 Page Content Sample:", pageHTML.slice(0, 1000)); // Print first 1000 characters

    // ✅ Find the wrapper div (replace `.your-div-class` with actual class)
    const tableWrapperClass = "bsr_table hist_tbl_hm"; // Replace this with the actual class name
    await page.waitForSelector(`div.${tableWrapperClass}`, { timeout: 60000 });

    try {
        // ✅ Extract table data from the first table inside the wrapper div
        const tableData = await page.evaluate((wrapperClass) => {
            const wrapper = document.querySelector(`div.${wrapperClass}`);
            if (!wrapper) return "Wrapper div not found!";

            const table = wrapper.querySelector("table");
            if (!table) return "Table not found inside wrapper!";

            // Extract rows and their text content
            return Array.from(table.querySelectorAll("tr")).map(row =>
                Array.from(row.querySelectorAll("td, th")).map(cell => cell.innerText.trim())
            );
        }, tableWrapperClass);

        console.log("📊 Extracted Table Data:", tableData);
    } catch (error) {
        console.error("❌ Error extracting table:", error);
    }

    await browser.close();
}

// Example URL (replace this with your actual source)
const url = "https://www.moneycontrol.com/stocks/marketstats/nsegainer/index.php";
scrapeTableRows(url);
