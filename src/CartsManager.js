import fs from "fs";

class CartManager {


    constructor(pathFile) {

        this.pathFile = pathFile ?? "../ch/dataBase/dataCart.json";

    }

    createDataCart() {

        fs.writeFileSync(this.pathFile, JSON.stringify([], null, 2), "utf8", (error) => {
            if (error) {
                console.log("algo salio mal al intentar crear la dataBase del cart \n" + error)
                throw error
            }
        })

        console.log("se ah creado la dataBase del cart");
    }

    getCart(id) {

        if (!fs.existsSync(this.pathFile)) {

            this.createDataCart();

        };


        const dataCart = JSON.parse(fs.readFileSync(this.pathFile, "utf8"));

        if (!dataCart.some(cart => cart.id == id)) {
            throw new Error("El carrito no existe")
        }

        return JSON.stringify(dataCart.find((cart) => cart.id == id))



    }

    addCartProduct(cid, pid) {

        let dataCart = JSON.parse(fs.readFileSync(this.pathFile, "utf8"));

        if (!dataCart.some(cart => cart.id == cid)) {

            dataCart.push({ "id": cid, "products": [{ "id": pid, "quantity": 1 }] })

        } else {

            const actualCart = dataCart.find((cart) => cart.id == cid)

            let actualCartProducts = actualCart.products;

            let inCart = false;

            actualCartProducts = actualCartProducts.map((product) => {

                if (product.id == parseInt(pid)) {

                    product.quantity = product.quantity + 1

                    inCart = true

                    return product

                }

                return product

            })

            if (!inCart) {

                actualCartProducts.map((product) => {

                    if (product.id == parseInt(pid)) {

                        product.push([{ "id": pid, "quantity": 1 }])

                    }



                })
            }

            dataCart = dataCart.filter((cart) => cart.id != cid)

            dataCart.push({ "id": actualCart.id, "products": actualCartProducts })

        }

        fs.writeFileSync(this.pathFile, JSON.stringify(dataCart), "utf8", (error) => {
            if (error) {
                throw error;
            };
        });

    }

}

export default CartManager