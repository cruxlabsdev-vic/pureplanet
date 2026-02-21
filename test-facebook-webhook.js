const crypto = require('crypto');

async function testWebhook() {
    const LOCAL_URL = 'http://localhost:3000/api/facebook-webhook';

    console.log('--- FB Webhook Local Tester ---');
    console.log('Make sure your local server is running on port 3000');
    console.log('Testing GET Verification...');

    try {
        const getUrl = `${LOCAL_URL}?hub.mode=subscribe&hub.verify_token=pure_planet_secure_2026&hub.challenge=test_challenge_123`;
        const getRes = await fetch(getUrl);
        const getText = await getRes.text();
        console.log(`GET Status: ${getRes.status}, Response: ${getText}`);
    } catch (e) {
        console.error('GET Request Failed. Is the dev server running?', e.message);
        return;
    }

    console.log('\nTesting POST Lead Payload...');

    const mockPayload = {
        object: 'page',
        entry: [
            {
                id: '263156821199330', // Mock Page ID
                time: Math.floor(Date.now() / 1000),
                changes: [
                    {
                        value: {
                            form_id: '1234567890', // Mock Form ID
                            leadgen_id: 'mock_lead_12345', // Mock Lead ID
                            created_time: Math.floor(Date.now() / 1000),
                            page_id: '263156821199330',
                            ad_id: '9876543210' // Mock Ad ID
                        },
                        field: 'leadgen'
                    }
                ]
            }
        ]
    };

    const payloadStr = JSON.stringify(mockPayload);

    // Create a real signature if we have the APP SECRET, 
    // but since we added WEBHOOK_SKIP_SIGNATURE, we can bypass without it if we set it in .env

    try {
        const postRes = await fetch(LOCAL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hub-signature-256': 'sha256=MOCK_SIGNATURE'
            },
            body: payloadStr
        });

        const postJson = await postRes.json();
        console.log(`POST Status: ${postRes.status}, Response:`, postJson);
        console.log('\nDone! Check your Supabase / Local Logs array if rows were added.');
    } catch (e) {
        console.error('POST Request Failed:', e.message);
    }
}

testWebhook();
