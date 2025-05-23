// Import library yang diperlukan
const axios = require('axios');
require('dotenv').config();

// URL untuk login
const url = 'https://testnet.openledger.xyz/'; // Pastikan URL ini benar

// Fungsi untuk melakukan login
async function login() {
    try {
        // Ambil token dari environment
        const token = process.env.AUTH_TOKEN;

        // Cek apakah token ada
        if (!token) {
            console.error('Token authorization tidak ditemukan. Pastikan Anda telah mengatur AUTH_TOKEN di file .env.');
            return;
        }

        // Lakukan permintaan GET untuk login
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Tampilkan hasil login
        console.log('Login berhasil:', response.data);
    } catch (error) {
        // Tangani kesalahan dengan lebih baik
        if (error.response) {
            console.error('Error saat login:', error.response.status, error.response.data);
        } else {
            console.error('Error saat login:', error.message);
        }
    }
}

// Panggil fungsi login
login();
