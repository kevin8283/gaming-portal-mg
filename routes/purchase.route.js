const router = require("express").Router()
const { getAllPurchases, getClientPurchases, getPurchaseById, getGamePurchases, savePurchase } = require("../controllers/purchase.controller").purchaseController
const { validateId, validatePurchase } = require("../middlewares/purchase-validation.middleware")

router.get("/", getAllPurchases)
router.get("/:id", validateId, getPurchaseById)
router.get("/clients/:id", validateId, getClientPurchases)
router.get("/games/:id", validateId, getGamePurchases)

router.post("/save", validatePurchase, savePurchase)

module.exports = router