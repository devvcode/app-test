import { createSelector } from "@reduxjs/toolkit";

const selectItems = (state) => state.cart.items;
const selectCouponCode = (state) => state.cart.couponCode;

export const selectCartCount = createSelector([selectItems], (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartSummary = createSelector(
  [selectItems, selectCouponCode],
  (items, couponCode) => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const coupon = couponCode === "MORROW10"
      ? { code: "MORROW10", type: "percentage", value: 10 }
      : couponCode === "FREESHIP"
        ? { code: "FREESHIP", type: "shipping", value: 0 }
        : null;
    const discount = coupon?.type === "percentage" ? Math.round(subtotal * coupon.value / 100) : 0;
    const shipping = subtotal === 0 || subtotal >= 1499 || coupon?.type === "shipping" ? 0 : 99;
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      total,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      coupon,
      couponValid: !couponCode || Boolean(coupon)
    };
  }
);
