import express from "express"

import ProductManager from "../ProductManager.js"


const productsRouter = express.Router();
productsRouter.use(express.json());

const products = new ProductManager();

productsRouter.get("/", (req, res) => {

    try {
        res.status(200).send([products.getProducts()]);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

productsRouter.get("/:pid", (req, res) => {

    const { pid } = req.params;

    try {
        res.status(200).send(products.getProductById(JSON.parse(pid)));
    } catch (error) {
        res.status(400).send({ error: error.message });
    }


})

productsRouter.post("/", (req, res) => {

    const { title, description, code, price, stock, category, thumbnails, id } = req.body;


    try {
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Campos incompletos")
        }
        products.addProduct(title, description, code, price, stock, category, thumbnails, id);
        res.status(201).send({ message: "Elemento creado" })
    } catch (error) {
        res.status(400).send({ error: error.message });
    }



})

productsRouter.put("/:pid", (req, res) => {

    const { pid } = req.params;

    const { title, description, code, price, stock, category, thumbnails, status } = req.body;

    try {
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Campos incompletos")
        }

        products.putProduct(title, description, code, price, stock, category, thumbnails, status, parseInt(pid))
        res.status(200).send({ message: "Producto modificado con exito" })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }



});

productsRouter.delete("/:pid", (req, res) => {

    const { pid } = req.params;
    try {
        products.deleteProduct(parseInt(pid));
        res.status(200).send({ message: "Producto eliminado con exito" })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }


})







export default productsRouter;