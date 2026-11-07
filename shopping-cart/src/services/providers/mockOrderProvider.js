export async function createMockOrder(payload) {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();

  return {
    id: `MM-${datePart}-${randomPart}`,
    createdAt: now.toISOString(),
    status: "Confirmed",
    paymentStatus: payload.paymentMethod === "cod" ? "Pay on delivery" : "Demo payment",
    ...payload
  };
}
