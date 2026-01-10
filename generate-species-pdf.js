import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  try {
    const page = await browser.newPage();

    // Read the HTML template
    const htmlPath = join(__dirname, 'species-checklist-template.html');
    const htmlContent = readFileSync(htmlPath, 'utf-8');

    console.log('Loading HTML content...');
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF with proper settings to preserve hyperlinks
    const pdfPath = join(__dirname, 'public', 'documents', 'species-checklist.pdf');

    console.log('Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: false
    });

    console.log(`✓ PDF generated successfully at: ${pdfPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePDF();
