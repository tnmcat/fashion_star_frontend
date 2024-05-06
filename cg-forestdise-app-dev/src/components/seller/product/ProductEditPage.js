import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductEditPage() {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5454/api/products/${productId}/details`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(product)
    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    {/* Render other product details here */}
                </div>
            ) : (
                <div>No product found</div>
            )}
        </div>
    );
}

export default ProductEditPage;
