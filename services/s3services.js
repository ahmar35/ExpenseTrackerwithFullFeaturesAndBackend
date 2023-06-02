const AWS=require('aws-sdk')
const dotenv=require('dotenv')
dotenv.config()

const uploadtoS3=(data,filename)=>{
    try{
    console.log('111')
    const BUCKET_NAME='expensetrackerappdatanew'
    
    const s3Bucket=new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECERET
    

    })

        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        console.log(filename)
        console.log(params.Body)
    return new Promise((resolve,reject)=>{

        s3Bucket.upload(params , (err , s3Response) => {
            if(err) {
                console.log
                ("Upload failed : ",err)
                reject(err)
            }else {
                console.log("Succesfully uploaded : ",s3Response);
                resolve(s3Response.Location);
            }
        })
        });
        

    
    
}
    catch(err){
        console.log(err)
    }

}
module.exports={
    uploadtoS3
}