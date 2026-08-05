import { getProductBySlug, slugify } from '@/lib/mockCatalog';

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
            const jsonStartIndex = text.indexOf('[');
            if (jsonStartIndex === -1) {
                const jsonObjIndex = text.indexOf('{');
                if (jsonObjIndex === -1) throw new Error('No JSON found');
                return JSON.parse(text.substring(jsonObjIndex));
            }
            return JSON.parse(text.substring(jsonStartIndex));
        } catch (e: any) {
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

export async function fetchProductBySlug(slug: string) {
    try {
        const res = await fetch(`${API_URL}/products/${slug}`, {
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            const text = await res.text();
            const jsonObjIndex = text.indexOf('{');
            if (jsonObjIndex !== -1) {
                const data = JSON.parse(text.substring(jsonObjIndex));
                return data.data || data;
            }
        }
    } catch (error) {
        // Fallback en silencio al catálogo mock cuando el backend no está disponible
    }
    return getProductBySlug(slug) || null;
}

export function getProductUrl(product: any): string {
    if (!product) return '/productos';
    const slug = product.slug || (product.name ? slugify(product.name) : null) || product.id;
    return `/productos/${slug}`;
}

export function getImageUrl(path: string | null) {
    if (!path) return 'https://placehold.co/600x600/png?text=No+Image';
    if (path.startsWith('http')) return path;
    return `${STORAGE_URL}/${path}`;
}
