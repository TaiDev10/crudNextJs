import mongoose from "mongoose"
let isConnected = false

export const connect = async () => {
    if(isConnected) {
        console.log('already connected')
        return
    }
    try{
        
        const url = process.env.MONGODB_URI
        // console
        if(!url) {
            throw new Error('MONGODB_URI chưa được cung cấp')
        }
        await mongoose.connect(url)
        isConnected = true
        console.log('Đã kết nối với MongoDB')
    }
    catch(err) {
        console.log('Kết nối thất bại')
        throw err
    }
   
}