require('dotenv').config();
const puppeteer = require('puppeteer');

const MIN_AMOUNT = 0.0001; // BNB
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function bridgeBNB() {
    if (!PRIVATE_KEY) {
        console.error('Private key tidak ditemukan di .env');
        return;
    }

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Akses situs Mango Bridge
    await page.goto('https://crossv2.testnet.mangonetwork.io/en');

    // Tunggu elemen untuk memuat
    await page.waitForSelector('button.connect-wallet');

    // Klik tombol untuk menghubungkan dompet
    await page.click('button.connect-wallet');

    // Tunggu dan pilih dompet yang sesuai
    await page.waitForSelector('button.metamask');
    await page.click('button.metamask');

    // Tunggu dan konfirmasi transaksi
    await page.waitForSelector('button.confirm');
    await page.click('button.confirm');

    // Tunggu dan pilih jaringan sumber (BSC Testnet)
    await page.waitForSelector('select.network-from');
    await page.select('select.network-from', 'BSC Testnet');

    // Pilih token (BNB)
    await page.select('select.token-from', 'BNB');

    // Masukkan jumlah
    await page.type('input.amount-from', MIN_AMOUNT.toString());

    // Pilih jaringan tujuan (Mango Testnet)
    await page.select('select.network-to', 'Mango Testnet');

    // Pilih token tujuan (BNB)
    await page.select('select.token-to', 'BNB');

    // Klik tombol untuk memulai bridging
    await page.click('button.bridge');

    // Tunggu dan konfirmasi transaksi
    await page.waitForSelector('button.confirm');
    await page.click('button.confirm');

    console.log('Proses bridging dimulai...');

    // Tunggu beberapa detik untuk memastikan transaksi diproses
    await page.waitForTimeout(5000);

    await browser.close();
}

bridgeBNB().catch(console.error);
