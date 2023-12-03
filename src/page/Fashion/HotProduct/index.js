import Heading from "../Heading"
import React, {useEffect, useState} from "react"
import {useSelector}  from "react-redux";
import ProductCard from "../../../components/Common/Product/ProductCard";
import {useGetAllProductsQuery, useGetProductsByLabelQuery} from "../../../services/product-api";
const HotProduct = () => {

    let TumUrunler =  useSelector((state)=> state.products.products);
    const [activeTab, setActiveTab] = useState('trending');
    let tags = {trending: "Trending", newArrival: "Yeni Gelen Ürünler", onSell: "Satışta", bestSellers: "En çok satanlar", featured: "Öne Çıkanlar"}
    const [searchQuery, setSearchQuery] = useState(activeTab)
    let { data, isLoading, isSuccess , refetch } = useGetProductsByLabelQuery(searchQuery);

    console.log(data)
    useEffect(() => {
        setSearchQuery(activeTab);
        refetch();
    }, [activeTab]);
    return (
        <>
            <section id="hot-Product_area" className="ptb-100">
                <div className="container">
                    <Heading baslik="Yeni Ürünler" altBaslik="Herkesin BT Shop'tan Alışveriş Yaptığını Görün" />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tabs_center_button">
                                <ul className="nav nav-tabs">
                                    {Object.entries(tags).map(([tag, label]) => (
                                        <li key={tag}>
                                            <a
                                                data-toggle="tab"
                                                href={`#${tag}`}
                                                className={activeTab === tag ? 'active' : ''}
                                                onClick={() => setActiveTab(tag)}
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="tabs_el_wrapper">
                                <div className="tab-content">
                                    {Object.entries(tags).map(([tag, _]) => (
                                        <div
                                            id={tag}
                                            className={`tab-pane fade ${activeTab === tag ? 'show active' : ''}`}
                                            key={tag}
                                        >
                                            <div className="row">

                                                {isLoading ?
                                                    <div>Loading...</div> :
                                                    data.result.map((urun,index)=> (
                                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                                        <ProductCard data={urun} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HotProduct

/*
,<div id="new_arrival" className="tab-pane fade show in active">
                                <div className="row">

                               </div>
                            </div>
                            <div id="trending" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(3,5).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="best_sellers" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(4,7).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="featured" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(5,9).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="on_sall" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(2,7).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
 */