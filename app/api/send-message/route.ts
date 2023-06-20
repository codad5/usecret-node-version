import { NextResponse } from "next/server"
export const POST = async (req: Request) => {
    try {
        const res = await req.json()
         return NextResponse.json({ res })
        
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message : ("something went wrong"), error: (e as Error).message})
    }
}