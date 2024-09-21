import { Part } from "./part"


export class OrderItem {
    constructor(
      public part: Part,
      public quantity: number,
      public discount: number
    ) {}
  }