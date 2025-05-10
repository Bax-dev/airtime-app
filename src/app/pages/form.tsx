// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function AirtimeForm() {
//   const [phone, setPhone] = useState("");
//   const [network, setNetwork] = useState("");
//   const [amount, setAmount] = useState("");

//   const mutation = useMutation({
//     mutationFn: async () => {
//       const res = await axios.post("http://localhost:5000/api/airtime", {
//         phone,
//         network,
//         amount,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       if (data.success) {
//         toast.success("✅ Airtime sent successfully!");
//       } else {
//         toast.error(`❌ API Error: ${data.error || "Unknown"}`);
//       }
//     },
//     onError: (err: any) => {
//       toast.error(err?.response?.data?.message || "❌ Server Error");
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!/^\d{11}$/.test(phone)) {
//       toast.error("❌ Invalid phone number (must be 11 digits)");
//       return;
//     }
//     if (!network || !amount) {
//       toast.error("❌ All fields are required.");
//       return;
//     }
//     mutation.mutate();
//   };

//   return (
//     <main className="max-w-md mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Buy Airtime</h1>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
//         <input
//           type="text"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="Phone Number"
//           className="w-full p-2 border rounded"
//         />
//         <select
//           value={network}
//           onChange={(e) => setNetwork(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Network</option>
//           <option value="MTN">MTN</option>
//           <option value="AIRTEL">Airtel</option>
//           <option value="GLO">Glo</option>
//           <option value="9MOBILE">9mobile</option>
//         </select>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Amount"
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           disabled={mutation.isPending}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {mutation.isPending ? "Processing..." : "Send Airtime"}
//         </button>
//       </form>
//     </main>
//   );
// }
