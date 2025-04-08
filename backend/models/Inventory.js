import { Schema, model } from "mongoose";

const inventorySchema = new Schema(
    {
    bloodGroup: 
    { type: String, required: true, unique: true ,enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],}
    ,
    bloodAmount: 
    { type: Number, required: true, min: 0 }
    ,
    });
  
 const Inventory = model("Inventory", inventorySchema);
 export default Inventory;