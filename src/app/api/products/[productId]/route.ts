import Product from "@/app/modules/product";
import { connect } from "@/server/mongodbConnect";
import { NextResponse } from "next/server";


export async function PUT(req: any,params:{params:{productId:string}}):Promise<NextResponse> {
    const { productId } = params.params;
    console.log(productId);
    await connect();
    try {
      const body = await req.json();
      console.log(body);
    const product = await Product.findByIdAndUpdate(productId, body) 
    return NextResponse.json(product);
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
    }

}
export async function DELETE(req: any,params:{params:{productId:string}}):Promise<NextResponse> {
    const { productId } = params.params;
    await connect();
    try {
        const product = await Product.findByIdAndDelete(productId);
        return NextResponse.json({ message: 'Xóa thành công' }, { status: 200 });
    }
    catch(err: any) {
        return NextResponse.json({ message: err.message });
    }
}
export async function GET(req: any,params:{params:{productId:string}}):Promise<NextResponse> {
    const { productId } = params.params;
    console.log(productId);
    await connect();
    try {
    const product = await Product.findById(productId) 
    return NextResponse.json(product);
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
    }

}
export async function POST(req: any):Promise<NextResponse> {
    await connect();
    try {
    const body = await req.json();
    const product = await Product.create(body) 
    return NextResponse.json(product);
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
    }

}
