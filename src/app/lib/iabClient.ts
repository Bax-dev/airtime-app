import axios from 'axios';

export interface AirtimeInput {
  phone: string;
  firstLevel: string; 
  amount: number;
}

export async function sendAirtimeRequest(input: AirtimeInput) {
  const apiUrl = process.env.IAB_API_URL!;
  const apiKey = process.env.IAB_API_KEY!;
  const secretKey = process.env.IAB_API_SECRET!;

  console.log('🔧 Sending Airtime Purchase Request');
  console.log('🌐 URL:', apiUrl);
  console.log('📦 Payload:', input);
  console.log('🔑 API Key Present:', Boolean(apiKey));
  console.log('🔐 Secret Key Present:', Boolean(secretKey));

  try {
    const response = await axios.post(
      apiUrl,
      input,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'secret-key': secretKey,
        },
      }
    );

    console.log('✅ API Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ API Request Failed:', error.response?.data || error.message);
    throw new Error('Failed to send airtime purchase request.');
  }
}
