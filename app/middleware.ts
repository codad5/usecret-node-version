import connectDb from '@/utils/mongoose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try{
        console.log("connecting to db from middleware");
        return await connectDb()
    }catch(err){
        console.log(err);
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/api/*',
}