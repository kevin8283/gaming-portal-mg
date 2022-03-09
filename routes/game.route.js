const router = require("express").Router()
const { gameController } = require("../controllers/game.controller")

router.get("/", gameController.getAllGames)
router.get("/:id", gameController.getGameById)

router.post("/add", gameController.addGame)

router.put("/edit/:id", gameController.editGame)

router.delete("/delete/:id", gameController.deleteGame)

module.exports = router