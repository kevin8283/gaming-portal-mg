const router = require("express").Router()
const { getAllGames, getGameById, addGame, editGame, deleteGame } = require("../controllers/game.controller").gameController
const { validateAddGame, validateGetGameById } = require("../middlewares/game-validation.middleware").gameMiddlewares

router.get("/", getAllGames)
router.get("/:id", validateGetGameById, getGameById)

router.post("/add", validateAddGame, addGame)

router.put("/edit/:id", validateGetGameById, editGame)

router.delete("/delete/:id", validateGetGameById, validateAddGame, deleteGame)

module.exports = router