import { makeAutoObservable } from "mobx";
import { Product } from "../../components/redux/interface";

interface BasketItem {
  product: Product;
  productQuantity: number;
  // sellPrice:number
}

class BasketViewModel {
  items: BasketItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage(); // Load basket from localStorage on initialization
  }

  saveToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      this.items = JSON.parse(storedBasket);
    }
  }

  // Method to update the items array
  setItems(updatedItems: BasketItem[]) {
    this.items = updatedItems;
    this.saveToLocalStorage();
  }

  addToBasket(product: Product) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex > -1) {
      this.increaseQuantity(product.id);
    } else {
      this.items.push({ product, productQuantity: 1 });
    }
    this.saveToLocalStorage();
  }

  removeFromBasket(productId: string) {
    console.log("Removing product with UUID:", productId);
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.saveToLocalStorage();
    console.log("Updated items:", this.items);
  }

  increaseQuantity(productId: string) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === productId
    );
    if (existingItemIndex > -1) {
      this.items[existingItemIndex].productQuantity++;
      this.saveToLocalStorage();
    }
  }

  decreaseQuantity(productId: string) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === productId
    );
    if (
      existingItemIndex > -1 &&
      this.items[existingItemIndex].productQuantity > 1
    ) {
      this.items[existingItemIndex].productQuantity--;
      this.saveToLocalStorage();
    }
  }

  clearBasket() {
    this.items = [];
    this.saveToLocalStorage();
  }

  get totalItems() {
    return this.items.reduce((acc, item) => acc + item.productQuantity, 0);
  }

  get totalPrice() {
    return this.items.reduce(
      (acc, item) =>
        acc +
        (item.product.sellPrice - item.product.discount_priceTMT) *
          item.productQuantity,
      0
    );
  }
}

export default new BasketViewModel();
