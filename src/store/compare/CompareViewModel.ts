import { makeAutoObservable } from "mobx";
import { Product } from "../../components/redux/interface";

class CompareViewModel {
  items: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToCompare(product: Product) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex === -1) {
      this.items.push(product);
    }
  }

  removeFromCompare(productId: string) {
    this.items = this.items.filter((item) => item.id !== productId);
  }

  clearCompare() {
    this.items = [];
  }
}

export default new CompareViewModel();
