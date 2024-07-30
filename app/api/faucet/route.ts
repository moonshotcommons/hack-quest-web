import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';
import { NextResponse } from 'next/server';
export async function GET() {
  // get tokens from the Devnet faucet server
  try {
    await requestSuiFromFaucetV0({
      // connect to Devnet
      host: getFaucetHost('testnet'),
      // recipient: '0xbefe4881a3f08d191d71ed3d6af5ce07de39f010fe0da692c26374f465efd0cf'
      recipient: '0xbefe4881a3f08d191d71ed3d6af5ce07de39f010fe0da692c26374f465efd0cf'
    });
  } catch (err: any) {
    console.log(err.message);
  }

  return NextResponse.json({ msg: 'success' });
}
