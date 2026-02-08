const axios = require('axios');

async function testOpenAIKey() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
        console.error('Error: OPENAI_API_KEY environment variable not set');
        return;
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Hello' }],
                max_tokens: 10
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('✓ API key is valid');
        console.log('Response:', response.data.choices[0].message.content);
    } catch (error) {
        console.error('✗ API key test failed:', error.response?.data || error.message);
    }
}

testOpenAIKey();