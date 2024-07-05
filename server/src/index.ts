import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
const port = 3000;

app.use(express.json());

//rate limiters

//otp rate limiter
const otpLimiter = rateLimit({
  windowMs: 5*60*1000, //5 minutes
  max:3, //limit each ip to 3 otp request per window
  message:"too many request, please try again after 5 minutes",
  standardHeaders:true,//return rate limit info in rate limit headers
  legacyHeaders:false,//disable the x-ratelimit headers
});

const passwordResetLimiter = rateLimit({
  windowMs: 15*60*1000, //15 minutes
  max:5, //limit each ip to 3 otp request per window
  message:"too many request, please try again after 15 minutes",
  standardHeaders:true,//return rate limit info in rate limit headers
  legacyHeaders:false,//disable the x-ratelimit headers
})


//storing otp in simple in memory object record which is an typescript type
const otpStore: Record<string,string> = {};   


// Endpoint to generate and log OTP
app.post('/generate-otp', otpLimiter,(req, res) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
    otpStore[email] = otp;
  
    console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
    res.status(200).json({ message: "OTP generated and logged" });
  });
  
  // Endpoint to reset password
  app.post('/reset-password',passwordResetLimiter, (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (otpStore[email] === otp) {
      console.log(`Password for ${email} has been reset to: ${newPassword}`);
      delete otpStore[email]; // Clear the OTP after use
      res.status(200).json({ message: "Password has been reset successfully" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
