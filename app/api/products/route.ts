import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(req:Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query')?.toLowerCase() || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    console.log(query);
    
    const { data, error , count} = await supabase.from('Product').select("*",{count: 'exact'}).or(`productDisplayName.ilike.%${query}%,baseColour.ilike.%${query}%,subCategory.ilike.%${query}%`).order('productDisplayName', { ascending: true }).range((page-1) * limit ,page * limit -1);
    console.log(data, error);

    if (error){
        return NextResponse.json({error: error.message},{status: 500});
    };

    return NextResponse.json({products: data, count: count},{status: 200});
}