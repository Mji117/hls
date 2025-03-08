const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let channels = [];

app.post('/api/channels', (req, res) => {
    const { name, url } = req.body;
    
    // تحقق من صحة الرابط
    try {
        new URL(url);
        channels.push({ name, url });
        res.json({ success: true });
    } catch (e) {
        res.status(400).json({ error: "رابط غير صالح" });
    }
});

app.get('/api/channels', (req, res) => {
    res.json(channels);
});

app.listen(3000, () => {
    console.log('Admin server running on port 3000');
});
