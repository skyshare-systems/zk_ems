import { authorize, AuthenticatedRequest } from '@/lib/auth.middleware';
import { NextResponse } from 'next/server';

export const GET = authorize(async (req: AuthenticatedRequest) => {

  return NextResponse.json({ 
    success: true, 
    message: 'Authorized', 
    user: req.user 
  }, { status: 200 });
});
