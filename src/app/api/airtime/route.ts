import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/db';
import Airtime from '../../models/Airtime';
import { sendAirtimeRequest, AirtimeInput } from '../../lib/iabClient';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'GET route active. POST here to buy airtime.',
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as AirtimeInput;

    const { phone, network, amount } = body;

    if (!phone || !network || !amount) {
      return NextResponse.json(
        { success: false, error: 'All fields (phone, network, amount) are required.' },
        { status: 400 }
      );
    }

    if (!/^\d{11}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number (must be 11 digits).' },
        { status: 400 }
      );
    }

    const amountNumber = Number(amount);

    if (isNaN(amountNumber) || amountNumber <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be a positive number.' },
        { status: 400 }
      );
    }

    const amountString = amountNumber.toString();

    await connectDB();

 
    const apiRes = await sendAirtimeRequest({ phone, network, amount: amountString });


    await Airtime.create({
      phone,
      network,
      amount: amountString,
      status: apiRes.success ? 'success' : 'failed',
      response: apiRes,
    });

    
    return NextResponse.json(apiRes);

  } catch (err: any) {
    console.error('Airtime error:', err);

    return NextResponse.json(
      { success: false, error: 'Airtime purchase failed. Please try again later.' },
      { status: 500 }
    );
  }
}
