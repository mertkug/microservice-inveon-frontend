import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineHeart} from 'react-icons/ai';
import {
    useCreateCartMutation,
    useGetCartQuery,
    useGetProductByIDQuery,
    useUpdateCartMutation
} from "../../../services/product-api";
import {createSelector} from "@reduxjs/toolkit";

//Her bir ürünü temsil edecek
const ProductCard = (props) => {
    let dispatch=  useDispatch();
    let carts = useSelector((state) => state.products.carts);
    let user = useSelector((state) => state.user.user);
    const [updateCart, updateResponse] = useUpdateCartMutation();
    let [createCart, createResponse] = useCreateCartMutation();
    let { data: cartContent, isLoading: isLoadingCart } = useGetCartQuery(user.user_id);
    let { data: product, isLoading: isLoadingProduct} = useGetProductByIDQuery(props.data.productId);

    const emptyData = []
    const sepeteEkle = async(id) => {
        // const found = cartContent.result.cartDetails.find(i => i.product.productId === id)

        if(cartContent.result.cartDetails.length === 0) {
            createCart({
                cartHeader: {
                    couponCode: null,
                    userId: user.user_id
                },
                cartDetails: [
                    {
                        product: product.result,
                        count: 1,
                        productId: product.result.productId
                    }
                ]
            })
        } else {
            updateCart({
                cartHeader: {
                    couponCode: null,
                    userId: user.user_id
                },
                cartDetails: [
                    {
                        product: product.result,
                        count: 1,
                        productId: product.result.productId
                    }
                ]
            })
        }
        // dispatch({type :"products/AddToCart", payload : {id}})
    }

    const favorilereEkle = async(id) => {
        dispatch({type :"products/addToFavorites",payload : {id}})
    }
    return(
        isLoadingProduct ? <div>Loading..</div>
            :
        <>
         <div className="product_wrappers_one">
            <div className="thumb">
                 <Link to={`/product-details-two/${props.data.productId}`} className="image">
                    <img src={props.data.imageUrl} alt={props.data.name}></img>
                    <img className="hover-image" src={props.data.hoverImageUrl} alt={props.data.name} />
                 </Link>
                   <span className="badges">
                    <span className={(['yaz','yeni','satışta'][Math.round(Math.random()*2)])} >
                        {"hmm"}
                    </span>
                   </span>
                   <div className="actions">
                     <a href="#!" className="action wishlist" title="Favorilere Ekle"
                      onClick={() => favorilereEkle(props.data.productId)} ><AiOutlineHeart />

                     </a>
                 </div>
                 <button type="button" className="add-to-cart offcanvas-toggle" 
                    onClick={() => sepeteEkle(props.data.productId)} >Sepete Ekle</button>
             </div>
             <div className="content">
                <h5 className="title">
                    <Link to={`/product-details-two/${props.data.productId}`}>{props.data.name}</Link>
                </h5>
                <span className="price">
                    <span className="new">{props.data.price}.00 TL</span>
                </span>
             </div>
            </div>
        </>
    )
}

export default ProductCard