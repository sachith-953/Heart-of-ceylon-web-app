import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Send the formData directly without converting to JSON
    const response = await fetch('http://localhost:8080/api/v1/pBuyer/list-new-product', {
      method: 'POST',
      body: formData, // Send formData directly
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add product');
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}