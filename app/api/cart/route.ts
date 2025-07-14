import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server";

// Initialize Supabase client with service role key (for server-side)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // This bypasses RLS
);

export async function POST(req: Request){
    try {
        // Get Clerk user - await the auth function
        const { userId } = await auth();
        
        console.log("Clerk userId:", userId);
        
        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }
        
        const body = await req.json();
        console.log("Adding product to cart for user:", userId);
        console.log("Body:", body);
        
        const { productId } = body;
        
        // Check if item already exists in cart
        const { data: existing, error: selectError } = await supabase
            .from('Cart')
            .select("quantity")
            .eq('userId', userId)  // Use Clerk user ID
            .eq('productId', productId)
            .single();
            
        console.log("Existing item:", existing);
        console.log("Select error:", selectError);
            
        if (existing) {
            // Update quantity if item exists
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
            // Insert new item
            const { data, error } = await supabase
                .from('Cart')
                .insert([{
                    userId,  // Clerk user ID
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