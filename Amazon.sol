// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
 contract Amazon {

    struct Product {
        string name;
        uint id;
        uint quantity;
        uint price;
    }

    mapping(uint => Product) public products;
    uint productsQuantity = 0;

    address private storeOwner;
    bool open = true;

    event clientBuy(string name, address wallet, uint quantity);

    constructor() {
        storeOwner = msg.sender;
    }

    function addProduct(string memory name, uint price) public onlyOwner(msg.sender) isOpen {
        require(bytes(name).length > 5, "El nombre debe ser de 5 caracteres o mas.");
        products[productsQuantity] = Product(name, productsQuantity, 0, price);
        productsQuantity += 1;
    }

    function setProductQuantity(uint id, uint quantity) public onlyOwner(msg.sender) isOpen {
        require(quantity >= 0, "La cantidad debe ser mayor a 0.");
        products[id].quantity = quantity;
    }

    function buy(uint id, uint quantity) public payable isOpen {
        Product memory product = products[id];
        require((quantity * product.price) <= convertWeiToEther(msg.value), "No tiene suficiente dinero.");
        require(product.quantity >= quantity, "No hay la suficiente cantidad de productos requeridos.");
        products[product.id].quantity -= quantity;
        emit clientBuy(product.name, msg.sender, quantity);
        if (quantity > 10) {
            payable(msg.sender).transfer(product.price * (quantity - 1));
        } else {
            payable(msg.sender).transfer(product.price * quantity);
        }
    }

    function setOpenStore(bool opened) public onlyOwner(msg.sender){
        open = opened;
    }

    function withdraw() public onlyOwner(msg.sender) onlyOwner(msg.sender) isOpen {
        payable(msg.sender).transfer(address(this).balance);
    }

    function convertWeiToEther(uint amount) private pure returns(uint) {
        return amount / 1 ether;
    }

    modifier onlyOwner(address client) {
        require(storeOwner == client, "Solo el owner puede modificar sus caracterisitcas");
        _;
    }

    modifier isOpen() {
        require(open, "Amazon is closed.");
        _;
    }
}