export default class Cart {
    constructor(oldCart) {
        this.items = oldCart.items || {};
        this.totalQty = oldCart.totalQty || 0;
        this.totalPrice = oldCart.totalPrice || 0;
    }

    add(item, id, addInfo) {
        this.items[id] = this.items[id] || {};
        let storedItem = this.items[id][addInfo.size];

        if (!storedItem) {
            storedItem = this.items[id][addInfo.size] = {item: item, qty: 0, price: 0};
        }

        storedItem.qty = !!addInfo.quantity ? +storedItem.qty + +addInfo.quantity : ++storedItem.qty;
        storedItem.price = Math.ceil(storedItem.item.price / 100) * (100 - storedItem.item.sale) * storedItem.qty;
        this.totalQty = !!addInfo.quantity ? +this.totalQty + +addInfo.quantity : ++this.totalQty;
        this.totalPrice = !!addInfo.quantity ? +this.totalPrice + addInfo.quantity * Math.ceil(storedItem.item.price / 100) * (100 - storedItem.item.sale) : this.totalPrice + Math.ceil(storedItem.item.price / 100) * (100 - storedItem.item.sale);
    }

    reduceByX(id, addInfo) {
        this.items[id][addInfo.size].qty -= addInfo.quantity;
        this.items[id].price -= Math.ceil(this.items[id][addInfo.size].item.price / 100) * (100 - this.items[id][addInfo.size].item.sale) * addInfo.quantity;
        this.totalQty -= addInfo.quantity;
        this.totalPrice -= Math.ceil(this.items[id][addInfo.size].item.price / 100) * (100 - this.items[id][addInfo.size].item.sale) * addInfo.quantity;

        if (this.items[id][addInfo.size].qty <= 0) {
            delete this.items[id][addInfo.size];
        }
        if (Object.keys(this.items[id]).length == 0) {
            delete this.items[id];
        }
    }

    removeItem(id, addInfo) {
        this.totalQty -= this.items[id][addInfo.size].qty;
        this.totalPrice -= Math.ceil(this.items[id][addInfo.size].item.price / 100) * (100 - this.items[id][addInfo.size].item.sale) * this.items[id][addInfo.size].qty;
        delete this.items[id][addInfo.size];

        if (Object.keys(this.items[id]).length == 0) {
            delete this.items[id];
        }
    }

    putItem(id, addInfo) {
        this.items[id][addInfo.size].qty += addInfo.difQty;
        this.items[id][addInfo.size].price += Math.ceil(this.items[id][addInfo.size].item.price / 100) * (100 - this.items[id][addInfo.size].item.sale) * addInfo.difQty;
        this.totalQty += addInfo.difQty;
        this.totalPrice += Math.ceil(this.items[id][addInfo.size].item.price / 100) * (100 - this.items[id][addInfo.size].item.sale) * addInfo.difQty;

        if (this.items[id][addInfo.size].qty <= 0) {
            delete this.items[id][addInfo.size];
        }
        if (Object.keys(this.items[id]).length == 0) {
            delete this.items[id];
        }
    }
}