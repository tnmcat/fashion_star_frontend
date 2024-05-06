import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchOptionsByProductId } from '../../../features/seller_feature/option/optionSlice';
import { findVariantsByProductIdAndValueIds } from '../../../features/seller_feature/variant/variantSlice';
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
function ProductDetail(props) {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [optionList, setOptionList] = useState(null);
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const fetchOptions = async () => {
        try {
            const options_result = await dispatch(fetchOptionsByProductId(productId));
            const options = unwrapResult(options_result);
            setOptionList(options);
        } catch (error) {
            console.error("Failed to fetch options:", error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, [dispatch, productId]);

    const handleValueClick = (optionId, valueId) => {
        const isSelected = selectedValues.some(value => value.optionId === optionId);
        if (isSelected) {
            setSelectedValues(prevValues => prevValues.map(value => ({
                ...value,
                valueId: value.optionId === optionId ? valueId : value.valueId
            })));
        } else {
            setSelectedValues(prevValues => [...prevValues, { optionId, valueId }]);
        }
    };

    useEffect(() => {
        const findVariants = async () => {
            try {
                const request = {
                    productId: productId,
                    optionValueIds: selectedValues.map(value => value.valueId)
                };
                const variant_result = await dispatch(findVariantsByProductIdAndValueIds(request));
                const variant = unwrapResult(variant_result);
                setSelectedVariant(variant);
            } catch (error) {
                console.error("Failed to fetch variants:", error);
            }
        };

        if (selectedValues.length > 0) {
            findVariants();
        }
    }, [dispatch, productId, selectedValues]);
    //cart area
    const schema = yup.object().shape({
        quantity: yup.string().required('Please input an order quantity'),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleAddToCart = (data) => {
        const { quantity } = data;
        if (selectedVariant && quantity > 0) {
            console.log(`Adding ${quantity} of variant ${selectedVariant.id} (SKU) ${selectedVariant.skuCode} sale price ${selectedVariant.salePrice} to the cart `);
            // Dispatch an action to add the selected variant and quantity to the cart
            // Example: dispatch(addToCart(selectedVariant, quantity));
        } else {
            console.error("Invalid quantity or selected variant");
        }
    };

    return (
        <div>
            <h1>Product Details</h1>
            {selectedVariant && (
                <div>
                    <h2>Selected Variant</h2>
                    <p>Variant ID: {selectedVariant.id}</p>
                    <p>Price: {selectedVariant.salePrice}</p>
                    {/* Render other details of the selected variant */}
                </div>
            )}
            {optionList && optionList.length > 0 ? (
                <ul>
                    {optionList.map((option) => (
                        <ul key={option.id}>{option.name}
                            {option.optionValueDTOList.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleValueClick(option.id, item.id)}
                                    className={selectedValues.some(value => value.optionId === option.id && value.valueId === item.id) ? 'selected' : ''}
                                    style={{
                                        background: selectedValues.some(value => value.optionId === option.id && value.valueId === item.id) ? '#ccc' : 'transparent',
                                        padding: '10px',
                                        margin: '5px 0',
                                    }}
                                >
                                    {item.value}
                                </li>
                            ))}
                        </ul>
                    ))}
                </ul>
            ) : (
                <div>No options found for this product.</div>
            )}


            <h3>Input quantity to add cart: </h3>
            <form onSubmit={handleSubmit(handleAddToCart)}>
                <label>
                    Quantity:
                    <input type="number" {...register("quantity")} />
                    {errors.quantity && <span>{errors.quantity.message}</span>}
                </label>
                <button type="submit">Add to Cart</button>
            </form>

        </div>

    );
}

export default ProductDetail;
