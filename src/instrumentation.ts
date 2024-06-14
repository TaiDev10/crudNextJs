import { connect } from "@/server/mongodbConnect";


export async function register() {
    await connect();
    console.log('database connected');
}