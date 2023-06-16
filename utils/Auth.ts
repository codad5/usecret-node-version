import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const IsSignedIn = async () => {
    const session = await getServerSession(authOptions)
    if(!session) return false;
    
}