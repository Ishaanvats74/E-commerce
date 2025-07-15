import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try{
        const body = await req.json()
        const { productId } = body;

        const { data, error } = await supabase.from('Orders').insert([{
            userId,
            productId,
            price: body.price,
            link: body.link,
            year: body.year,
            gender: body.gender,
            articleType: body.articleType,
            baseColor: body.baseColour,
            subCategory: body.subCategory,
            season: body.season,
            productDisplayName: body.productDisplayName,
            usage: body.usage,
            masterCategory: body.masterCategory,
            filename: body.filename,
            quantity: body.quantity,
            address: body.address ?? "",
        }]);
        console.log(data, error);
        
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        
        return NextResponse.json({ order: data }, { status: 200 });
    } catch (err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}


export async function GET() {
    const {data , error} = await supabase.from('Orders').select("*")
    console.log(data,error)

    if(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ order: data }, { status: 200 });
}