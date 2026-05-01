import { normalizeText } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('Content-Type') || '';

  if (!contentType.includes('multipart/form-data')) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid content type. Please upload a file.' }),
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;

    if (!file || file.type !== 'application/pdf') {
      return new NextResponse(
        JSON.stringify({ error: 'Please upload a valid PDF file.' }),
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfData = await pdfParse(Buffer.from(arrayBuffer));
    const normalizedText = normalizeText(pdfData.text);

    return new NextResponse(JSON.stringify({ text: normalizedText }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to process the uploaded file.' }),
      { status: 500 }
    );
  }
}
