import express from "express";
import CartManager from "../CartsManager.js"

const cartsRouter = express.Router();

const cart = new CartManager();

cartsRouter.get("/:cid", (req, res) => {

    const cid = parseInt(req.params.cid)

    try {
        res.status(200).send(cart.getCart(cid));
    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});

cartsRouter.post("/", (req, res) => {

    cart.createDataCart();

    try {
        res.status(200).send({ message: "Carrito generado con exito" })
    } catch (error) {
        res.status(500).send({ message: error })
    }





})

cartsRouter.post("/:cid/product/:pid", (req, res) => {

    const cip = req.params.cid;
    const pid = req.params.pid;

    try {
        cart.addCartProduct(cip, pid);

        res.status(200).send({ message: "añadido al carrito satisfactoriamente" })

    } catch (error) {

        res.status(400).send({ message: "Error al intentar agregar el articulo al carrito " + error })

    }


})


export default cartsRouter;