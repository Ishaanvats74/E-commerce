import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);


export async function POST(req: Request){
    try {
        const { userId } = await auth();
        
        console.log("Clerk userId:", userId);
        
        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }
        
        const body = await req.json();
        console.log("Adding product to cart for user:", userId);
        console.log("Body:", body);
        
        const { productId } = body;

        const { data: existing, error: selectError } = await supabase
            .from('Cart')
            .select("quantity")
            .eq('userId', userId) 
            .eq('productId', productId)
            .single();
            
        console.log("Existing item:", existing);
        console.log("Select error:", selectError);
            
        if (existing) {
            const { error: updateError } = await supabase
                .from('Cart')
                .update({ quantity: existing.quantity + 1 })
                .eq('userId', userId)
                .eq('productId', productId);
                
            if (updateError) {
                console.error("Update error:", updateError);
                return NextResponse.json({ error: updateError.message }, { status: 500 });
            }
            return NextResponse.json({ message: "Quantity updated" });
        } else {
            const { data, error } = await supabase
                .from('Cart')
                .insert([{
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
                }]);
                
            if (error) {
                console.error("Insert error:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json({ message: "Item added to cart", data });
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}