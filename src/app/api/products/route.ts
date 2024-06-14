import Product from "@/app/modules/product";
import { connect } from "@/server/mongodbConnect";
import { NextResponse } from "next/server";

export  async function GET() {
    await connect();
    try {
        const products = await Product.find();
        return NextResponse.json(products);
    } catch (err: any) {       
      return  NextResponse.json({ message: err.message });
    }
  


}
export async function POST(req: any) {
    await connect();
    try {
      const body = await req.json();
      console.log(body);
        const product = new Product(body);
        await product.save();
        return NextResponse.json(product);
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
    }
}

        
