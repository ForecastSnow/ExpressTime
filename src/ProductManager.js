import fs from "fs";

class ProductManager {

    constructor(pathFile) {
        this.pathFile = pathFile ?? "./../ch/dataBase/dataProducts.json"

    }

    createDataBase() {

        fs.writeFileSync(this.pathFile, JSON.stringify([], null, 2), "utf8", (error) => {
            if (error) {
                console.log("algo salio mal al intentar crear la dataBase \n" + error)
                throw error
            }
        })

        console.log("se ah creado la dataBase de los productos")
    }

    getProducts() {

        if (!fs.existsSync(this.pathFile)) {

            this.createDataBase();

        };

        const data = fs.readFileSync(this.pathFile, "utf8", (error) => {
            throw new Error("error al leer la dataBase especificada ");
        })

        return JSON.parse(data);

    }

    addProduct(title, description, code, price, stock, category, thumbnails, status, id) {



        const newProduct = {

            id: id ?? Date.now(),
            title: title,
            description: description,
            code: code,
            price: price,
            stock: stock,
            category: category,
            thumbnails: thumbnails,
            status: status ?? true
        }

        const productosActuales = this.getProducts();

        productosActuales.push(newProduct);

        fs.writeFileSync(this.pathFile, JSON.stringify(productosActuales, null, 2), "utf8", (error) => {
            if (error) {
                throw new Error("Error al guardar en el database");
            }
        });

    }


    getProductById(id) {

        const productosActuales = this.getProducts();

        const productoByID = productosActuales.find((producto) => producto.id === id);

        if (typeof (productoByID) === "undefined") {
            throw new Error("El id especificado no es válido");
        };

        return productoByID;
    }

    putProduct(title, description, code, price, stock, category, thumbnails, status, id) {

        if (this.getProductById(id) instanceof Error) {
            throw error
        }

        this.deleteProduct(id);

        this.addProduct(title, description, code, price, stock, category, thumbnails, status, id);

    }

    deleteProduct(id) {

        if (this.getProductById(id) instanceof Error) {
            throw error
        }

        let productosActuales = this.getProducts();

        productosActuales = productosActuales.filter((producto) => producto.id != id);

        fs.writeFileSync(this.pathFile, JSON.stringify(productosActuales, null, 2), "utf8", (error) => {
            if (error) {
                throw new Error(error);
            }

        });

    }

}

export default ProductManager;