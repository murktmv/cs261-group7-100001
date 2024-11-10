require('dotenv').config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/auth', async (req, res) => {
    const { UserName, PassWord } = req.body;

    if (!UserName || !PassWord) {
        return res.status(400).json({ error: 'Please enter your username and password' });
    }

    try {
        const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': process.env.APPLICATION_KEY
            },
            body: JSON.stringify({
                UserName,
                PassWord
            })
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Authentication failed' });
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));