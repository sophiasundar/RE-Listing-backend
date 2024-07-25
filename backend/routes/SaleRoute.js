const express = require("express");
const Sale = require("../models/sale");
const   authentication  = require("../middleware/auth.js");
const router = express.Router();


//   post

    router.post("/", authentication , async (req, res) => {
        try {
            const { propertyType, location, price, propertyAvail,  description } = req.body;
            const sale = new Sale({ propertyType, location, price, propertyAvail,  description  });
            await sale.save();
            res.status(201).send("Property Added Succesfully");
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        }
    );

    // get

    router.get('/',  async (req,res)=>{
        try{
        const sales = await Sale.find({});
        res.json(sales);
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    })

    // get by id

    router.get('/:id',  async (req,res)=>{
        try{
        const sales = await Sale.findById(req.params.id);
        if(!sales){
            return res.status(404).json({ message: 'property not found' });
        }
        res.json(sales);
    }catch{
        res.status(500).json({ message: err.message });
    }
    })

    // update

    router.put("/:id",  async (req, res) => {
          try {
            const { id } = req.params;
            const { propertyType, location, price, propertyAvail,  description } = req.body;
            const update = { propertyType, location, price, propertyAvail,  description };
            await Sale.findByIdAndUpdate(id, update);
            res.status(201).send("Property updated");
          } catch (error) {
            res.status(400).send({ error: error.message });
          }
        }
      );

    //   delete

    router.delete("/:id",  async (req, res) => {
        try {
          const { id } = req.params;
          await Sale.findByIdAndDelete(id);
          res.status(201).send("Property deleted");
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      });



  module.exports = router;