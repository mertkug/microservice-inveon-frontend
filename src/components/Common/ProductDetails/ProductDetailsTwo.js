import ProductInfo from './ProductInfo';
import RelatedProduct from './RelatedProduct';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { RatingStar } from "rating-star";
import { useGetProductByIDQuery } from "../../../services/product-api";

const ProductDetailsTwo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: product, isLoading } = useGetProductByIDQuery(parseInt(id));

    useEffect(() => {
        console.log(product);
    }, [product]);

    const addToCart = (id) => {
        dispatch({ type: "products/AddToCart", payload: { id } });
    };

    const addToFav = (id) => {
        dispatch({ type: "products/addToFavorites", payload: { id } });
    };

    const [count, setCount] = useState(1);

    const incNum = () => {
        setCount(count + 1);
    };

    const decNum = () => {
        if (count > 0) {
            setCount(count - 1);
        } else {
            alert("Stokta Yok!");
            setCount(0);
        }
    };

    const [img, setImg] = useState("");

    useEffect(() => {
        if (product) {
            setImg(product.result.imageUrl)
        }
    }, [product])
    const colorSwatch = (i) => {
        const data = product?.colours.find(item => item.name === i);
        if (data) {
            setImg(data.img);
        }
    };

    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <>
            {isLoading ? (
                <div className="container ptb-100">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                            <div className="empaty_cart_area">
                                <h2>Yükleniyor</h2>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <section id="product_single_two" className="ptb-100">
                    <div className="container">
                        <div className="row area_boxed">
                            <div className="col-lg-4">
                                <div className="product_single_two_img slider-for">
                                    <Slider {...settings}>
                                        <div className="product_img_two_slider">
                                            <img src={img} alt="img" />
                                        </div>
                                        <div className="product_img_two_slider">
                                            <img src={product.result.hoverImageUrl} alt="img" />
                                        </div>
                                        {product.result.colours?.map((item, index) => (
                                            <div className="product_img_two_slider" key={index}>
                                                <img src={item.img} alt="img" />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="product_details_right_one">
                                    <div className="modal_product_content_one">
                                        <h3>{product.result.name}</h3>
                                        <div className="reviews_rating">
                                            <RatingStar maxScore={5} rating={product.result?.rating?.rate} id="rating-star-common-2" />
                                            <span>({product.result.rating?.count} Müşteri Yorumları)</span>
                                        </div>
                                        <h4>{product.result.price}.00 TL <del>{product.result.price + 15}.00 TL</del> </h4>
                                        <p>{product.description}</p>
                                        <div className="customs_selects">
                                            <select name="product" className="customs_sel_box">
                                                <option value="">Beden</option>
                                                <option value="small">S</option>
                                                <option value="medium">M</option>
                                                <option value="learz">L</option>
                                                <option value="xl">XL</option>
                                            </select>
                                        </div>
                                        <div className="variable-single-item">
                                            <span>Renk</span>
                                            <div className="product-variable-color">
                                                {product.result?.colours?.map((item, index) => (
                                                    <label key={index} htmlFor={`modal-product-color-${item.name}`}>
                                                        <input
                                                            name="modal-product-color"
                                                            id={`modal-product-color-${item.name}`}
                                                            className="color-select"
                                                            type="radio"
                                                            onChange={() => { colorSwatch(item.name) }}
                                                        />
                                                        <span className={`product-color-${item.name.toLowerCase()}`}></span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <form id="product_count_form_two">
                                            <div className="product_count_one">
                                                <div className="plus-minus-input">
                                                    <div className="input-group-button">
                                                        <button type="button" className="button" onClick={decNum}>
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input className="form-control" type="number" value={count} readOnly />
                                                    <div className="input-group-button">
                                                        <button type="button" className="button" onClick={incNum}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="links_Product_areas">
                                            <ul>
                                                <li>
                                                    <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product.result.productId)}>
                                                        <i className="fa fa-heart"></i>Favorilere Ekle
                                                    </a>
                                                </li>
                                            </ul>
                                            <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(product.result.productId)}>
                                                Sepete Ekle
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProductInfo />
                    </div>
                </section>
            )}
            <RelatedProduct />
        </>
    );
};

export default ProductDetailsTwo;
