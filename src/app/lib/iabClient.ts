import axios from "axios";

export interface AirtimeInput {
  phone: string;
  network: string;
  amount: string;
}

export async function sendAirtimeRequest(input: AirtimeInput) {
  const res = await axios.post(
    process.env.IAB_API_URL!,
    input,
    {
      headers: {
        "Authorization": `Bearer ${process.env.IAB_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
}
