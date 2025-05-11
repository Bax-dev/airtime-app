// import axios from "axios";

// export interface AirtimeInput {
//   phone: string;
//   network: string;
//   amount: string;
// }

// export async function sendAirtimeRequest(input: AirtimeInput) {
//   const res = await axios.post(
//     process.env.IAB_API_URL!,
//     input,
//     {
//       headers: {
//         "Authorization": `Bearer ${process.env.IAB_API_KEY}`,
//         "Content-Type": "application/json"
//       }
//     }
//   );

//   return res.data;
// }

import axios from "axios";

export interface AirtimeInput {
  phone: string;
  network: string;
  amount: string;
}

export async function sendAirtimeRequest(input: AirtimeInput) {
  const API_URL = "https://api.iabconcept.com/airtime"; 
  const API_KEY = "cc7ac8de48a6c9fb832857aab45e603b046735862f8a8c3a646aa3098affff2b"; // Replace with your actual API key

  const res = await axios.post(
    API_URL,
    input,
    {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
}

