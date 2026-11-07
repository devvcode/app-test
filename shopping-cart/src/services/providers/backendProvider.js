const API_BASE = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }
  return payload;
}

// Expected backend contract: GET /products returns { products, total, page, pageSize }.
// Keep response normalization here so React components never depend on API response shapes.
export async function getProducts(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  }
  const payload = await request(`/products?${query.toString()}`);
  return {
    ...payload,
    products: payload?.products || [],
    total: Number(payload?.total || 0),
    page: Number(payload?.page || 1),
    pageSize: Number(payload?.pageSize || payload?.limit || 24),
    pageCount: Number(payload?.pageCount || 1),
    source: "backend"
  };
}

export async function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

export async function getDepartments() {
  return request("/departments");
}

export async function createOrder(payload) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
