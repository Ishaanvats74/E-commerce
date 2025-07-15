import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { userId } = await auth();

  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId } = body;
    const { data: existingOrder, error: fetchError } = await supabase
      .from("Orders")
      .select("quantity")
      .eq("userId", userId)
      .eq("productId", productId)
      .single();

    console.log(fetchError);

    if (existingOrder) {
      const { error: updateError } = await supabase
        .from("Orders")
        .update({ quantity: Number(existingOrder.quantity) + 1 })
        .eq("userId", userId)
        .eq("productId", productId);
      console.log(updateError);

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 }
        );
      }
      return NextResponse.json({ status: 200 });
    } else {
      const { data, error } = await supabase.from("Orders").insert([
        {
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
          quantity: 1,
          address: body.address ?? "",
        },
      ]);

      if (error) {
        console.error("Insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: "Item added to cart", data });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("Orders")
    .select("*")
    .eq("userId", userId);
  console.log(data, error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ order: data }, { status: 200 });
}

export async function PATCH(req:Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json()
        const { productId } = body
        const {error: deleteError } = await supabase.from('Orders').delete().eq("userId",userId).eq("productId",productId)
        if(deleteError){
        return NextResponse.json({error:deleteError?.message},{status:501})
        }
        return NextResponse.json({ message: "History Deleted" })
    } catch (deleteError) {
        return NextResponse.json({error: deleteError},{status:500});
    }
}