import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/cliente';

export const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect (() => {
        const fetchProducts = async() => {
            try {
                setLoading(true);

                const {data,error} = await supabase.from('Productos').select('*');

                if (error) throw error;

                setProducts(data);

            } catch (err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[]);

    if (loading) return <div>Cargando productos...</div>;

    if(error) return <div>Error: {error}</div>;




    return (
        <div className='product-list'>
            <h2>Listado de Productos</h2>
            {products.length === 0 ? (
                <p>No hay productos disponibles</p>
            ):(
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio/u</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) =>(
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.Nombre}</td>
                                <td>{product.Cantidad}</td>
                                <td>{product.Precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
