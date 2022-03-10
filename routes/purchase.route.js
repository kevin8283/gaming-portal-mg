const router = require("express").Router()
const { getAllPurchases, getClientPurchases, getPurchaseById, getGamePurchases, savePurchase } = require("../controllers/purchase.controller").purchaseController

router.get("/", getAllPurchases)
router.get("/:id", getPurchaseById)
router.get("/clients/:id", getClientPurchases)
router.get("/games/:id", getGamePurchases)

router.post("/save", savePurchase)

module.exports = router