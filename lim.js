const axios = require('axios');
require('dotenv').config();

// URL untuk login
const url = 'https://testnet.openledger.xyz/login'; 

// Fungsi untuk melakukan login
async function login() {
    try {
        // Ambil token dari environment
        const token = process.env.JWT_TOKEN;

        // Cek apakah token ada
        if (!token) {
            console.error('Token JWT .');
            return;
        }

        // Lakukan permintaan POST untuk login
        const response = await axios.post(url, {}, {
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
login();
