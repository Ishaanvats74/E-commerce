import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
    const { data, error } = await supabase.from('Orders').select("*");
    console.log(data, error);

    if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    }

  return NextResponse.json({ order: data }, { status: 200 });
}