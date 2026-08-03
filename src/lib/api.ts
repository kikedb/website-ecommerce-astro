export const API_URL = "http://admin-ecommerce-backend.test/api/shop";
export const STORAGE_URL = 'http://admin-ecommerce-backend.test/storage';

export async function fetchProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    try {
        const res = await fetch(`${API_URL}/products?${query}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status}. Body: ${errorText.substring(0, 150)}`);
        }
        const text = await res.text();
        try {
            // Robust parsing: Find the start of JSON array
            const jsonStartIndex = text.indexOf('[');
            if (jsonStartIndex === -1) {
                // Try object if pagination is returned
                const jsonObjIndex = text.indexOf('{');
                if (jsonObjIndex === -1) throw new Error('No JSON found');
                return JSON.parse(text.substring(jsonObjIndex));
            }
            return JSON.parse(text.substring(jsonStartIndex));
        } catch (e) {
            throw new Error(`Invalid JSON: ${e.message}. Content starts with: ${text.substring(0, 100)}`);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function fetchCategories() {
    try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const text = await res.text();
        const jsonStartIndex = text.indexOf('[');
        if (jsonStartIndex === -1) return JSON.parse(text);
        return JSON.parse(text.substring(jsonStartIndex));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export function getImageUrl(path: string | null) {
    if (!path) return 'https://placehold.co/600x600/png?text=No+Image';
    if (path.startsWith('http')) return path;
    return `${STORAGE_URL}/${path}`;
}
