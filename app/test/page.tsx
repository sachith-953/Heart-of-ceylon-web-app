'use client';

import { useState } from 'react';

export interface ProductDTO {
    productName: string;
    productAvailableStokes: number;
    productDescription: string;
    productPrice: number;
    productImage: File;
    productWeight: number;
    productDimensions: string;
    productKeyWords: string;
    productManufacture: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}

export default function AddProductPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formElement = event.currentTarget;
            const formData = new FormData(formElement);

            const response = await fetch('http://localhost:3000/api/test', {
                method: 'POST',
                body: formData,
            });

            const result: ApiResponse = await response.json();

            if (!response.ok) throw new Error(result.message || 'Failed to add product');

            setSuccess(true);
            formElement.reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Product added successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block mb-1">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productAvailableStokes" className="block mb-1">Available Stock</label>
                    <input
                        type="number"
                        id="productAvailableStokes"
                        name="productAvailableStokes"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productDescription" className="block mb-1">Description</label>
                    <textarea
                        id="productDescription"
                        name="productDescription"
                        required
                        className="w-full border rounded px-3 py-2 h-32"
                    />
                </div>

                <div>
                    <label htmlFor="productPrice" className="block mb-1">Price</label>
                    <input
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        step="0.01"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productWeight" className="block mb-1">Weight</label>
                    <input
                        type="number"
                        id="productWeight"
                        name="productWeight"
                        step="0.01"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productDimensions" className="block mb-1">Dimensions</label>
                    <input
                        type="text"
                        id="productDimensions"
                        name="productDimensions"
                        required
                        placeholder="e.g., 10x20x30 cm"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productKeyWords" className="block mb-1">Keywords</label>
                    <input
                        type="text"
                        id="productKeyWords"
                        name="productKeyWords"
                        placeholder="Comma-separated keywords"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productManufacture" className="block mb-1">Manufacturer</label>
                    <input
                        type="text"
                        id="productManufacture"
                        name="productManufacture"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productImage" className="block mb-1">Product Image</label>
                    <input
                        type="file"
                        id="productImage"
                        name="productImage"
                        required
                        accept="image/*"
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

