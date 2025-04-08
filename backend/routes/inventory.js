import {Router} from 'express'
import Inventory from "../models/Inventory.js";

const router=Router();

router.get("/inventory", async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.json(inventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      res.status(500).json({ message: "Failed to fetch inventory." });
    }
  });
  
  // Route to update blood inventory (add or update blood amounts)
  router.post("/inventory", async (req, res) => {
    const { bloodGroup, bloodAmount } = req.body;
  
    try {
      let inventory = await Inventory.findOne({ bloodGroup });
  
      if (inventory) {
        // If blood group already exists, update the amount
        inventory.bloodAmount = bloodAmount;
        await inventory.save();
        res.json({ message: "Inventory updated successfully!", inventory });
      } else {
        // If blood group doesn't exist, create a new entry
        inventory = new Inventory({ bloodGroup, bloodAmount });
        await inventory.save();
        res.json({ message: "New inventory item added!", inventory });
      }
    } catch (error) {
      console.error("Error updating inventory:", error);
      res.status(500).json({ message: "Failed to update inventory." });
    }
  });

  export default router;