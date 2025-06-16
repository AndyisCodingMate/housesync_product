// For App Router: app/api/verify-doc/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { doc_type, doc_base64, req_id } = body;

  const externalResponse = await fetch('https://ping.arya.ai/api/v1/document-tampering-detection', {
    method: 'POST',
    headers: {
      'token': process.env.ARYA_API_TOKEN || '', // store this in .env.local
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      doc_type,
      doc_base64,
      req_id,
    }),
  });

  const data = await externalResponse.json();

  return NextResponse.json(data, { status: externalResponse.status });
}
