const router = require("express").Router()
const { getAllGames, getGameById, getGameByTitle, getGamesByPage, addGame, editGame, deleteGame } = require("../controllers/game.controller").gameController
const { validateAddGame, validateGetGameById, validateGetGameByTitle, validateEditGame, validateGetGamesByPage } = require("../middlewares/game-validation.middleware").gameMiddlewares

router.get("/", getAllGames)
router.get("/:id", validateGetGameById, getGameById)
router.get("/page/:page", validateGetGamesByPage, getGamesByPage)

router.post("/add", validateAddGame, addGame)
router.post("/search", validateGetGameByTitle, getGameByTitle)

router.put("/edit/:id", validateGetGameById, validateEditGame, editGame)

router.delete("/delete/:id", validateGetGameById, deleteGame)

module.exports = router