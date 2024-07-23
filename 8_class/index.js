import express from "express";

import { ProductController } from "./mvc/controllers/product.controller";
import { CouponController } from "./mvc/controllers/coupon.controller";
import { CashService } from "./mvc/controllers/services/cash.service";
import { PointService } from "./mvc/controllers/services/point.service";
import { ProductService } from "./mvc/controllers/services/product.service";

const app = express();

const cashService = new CashService();
const productService = new ProductService();
const pointService = new PointService();

// 상품 API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기
app.post("/products/refund", productController.refundProduct); // 상품 환불하기

// 쿠폰(상품권) API
const couponController = new CouponController(cashService);
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰(상품권) 구매하기 API

app.listen(3000, () => {
  console.log("백엔드 API 서버거 켜졌어요!!!");
});
