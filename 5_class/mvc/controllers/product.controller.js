export class ProductController {
  constructor(cashService, productService) {
    this.cashService = cashService;
    this.productService = productService;
  }

  buyProduct(_, res) {
    // 1. 가진돈 검증하는 코드(대략 10줄 => 2줄)
    const hasMoney = this.cashService.checkValue(); // true 또는 false

    // 2. 판매여부 검증하는 코드(대략 10줄 => 2줄)
    const isSoldout = this.productService.checkSoldout(); // true 또는 false

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료!!");
    }
  }

  refundProduct(_, res) {
    // 1. 판매여부 검증하는 코드(10줄 => 2줄)
    const isSoldout = this.productService.checkSoldout(); // true 또는 false

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품 환불 완료!!");
    }
  }
}
