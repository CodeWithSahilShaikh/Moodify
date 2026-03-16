const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:[true, "Username is required"],
    unique:[true, "Username must be unique"]
  },
  email: {
    type:String,
    required:[true, "Email is required"],
    unique:[true, "Email must be unique"]
  },
  password: {
    type:String,
    required:[true, "Password is required"]
  }
});


/* Task pre and post kya hai
 userSchema.pre("save", function(next) {
  YEH CODE SAVE HONE SE PEHLE CHALEGA
    
    // Example: Password ko hash karna
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    next(); // Agla step (actual save) execute karo
     })   

     Use cases:

Password hashing
Data validation/modification
Timestamps set karna
Cleanup operations

-----------------------------------------------

userSchema.post("save", function(doc, next) {
    // YEH CODE SAVE HONE KE BAAD CHALEGA
    
    console.log(`User ${doc.username} saved successfully!`);
    
    // Example: Welcome email bhejna
    sendWelcomeEmail(doc.email);
    
    next();
});
Use cases:

Logging
Notifications/emails send karna
Cache update karna
Cleanup operations


*/

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
