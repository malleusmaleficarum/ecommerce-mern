const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const Journal = require("../models/Journal");

//CREATE JOURNAL
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newJournal = new Journal(req.body);
  try {
    const savedJournal = await newJournal.save();
    res.status(200).json(savedJournal);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE JOURNAL
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.status(200).json("Journal has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE JOURNAL
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedJournal);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE JOURNAL
router.get("/find/:id", async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    res.status(200).json(journal);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL JOURNAL
router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
