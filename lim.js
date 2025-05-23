const axios = require('axios');
require('dotenv').config();

const url = 'https://testnet.openledger.xyz/login';

async function login() {
    try {
        const token = process.env.JWT_TOKEN;

        const response = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Login berhasil:', response.data);
    } catch (error) {
        console.error('Error saat login:', error.response ? error.response.data : error.message);
    }
}

login();
