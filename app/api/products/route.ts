import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(req:Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query')?.toLowerCase() || '';
    console.log(query);

    const { data, error } = await supabase.from('Product').select("*").or(`productDisplayName.ilike.%${query}%,baseColour.ilike.%${query}%,subCategory.ilike.%${query}%`).order('productDisplayName', { ascending: true });
    console.log(data, error);


    if (error){
        return NextResponse.json({error: error.message},{status: 500});
    };

    const filteredData = data.filter((product)=>{
        return product.productDisplayName.toLowerCase().includes(query) 
    })

    return NextResponse.json(filteredData,{status: 200});
}