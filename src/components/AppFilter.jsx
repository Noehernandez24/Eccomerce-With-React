import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { filterProductsThunk, setProducts } from "../store/slices/products.slice";

const AppFilter = () => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const [allProducts, setAllProducts] = useState([]) // for filter by price
    const [categories, setCategories] = useState([])


    useEffect(() => {
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
        .then(res => setCategories(res.data))

        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(res => setAllProducts(res.data))
    }, [])

    const filterByPrice = (data) =>{
        let productsFilter = allProducts.filter(product => product.price >= Number(data.from) && product.price <= Number(data.to))
        if (productsFilter.length !== 0) {
          dispatch(setProducts(productsFilter))
        } else{
          dispatch(setProducts(allProducts))
        }
    }

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Price</Accordion.Header>
        <Accordion.Body>
          <form onSubmit={handleSubmit(filterByPrice)}>
            <div className="input-container">
              <label className="label-filter" htmlFor="from">
                From
              </label>
              <input
                {...register("from")}
                className="input-filter"
                type="number"
                id="from"
              />
            </div>

            <div className="input-container">
              <label className="label-filter" htmlFor="to">
                To
              </label>
              <input
                {...register("to")}
                className="input-filter"
                type="number"
                id="to"
              />
            </div>

            <div className="justify-end">
              <button className="btn-price">Filter Price</button>
            </div>
          </form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Category</Accordion.Header>
        <Accordion.Body>
          <div className="buttons-container">
            {categories.map((categorie) => (
              <button
                onClick={() => dispatch(filterProductsThunk(categorie.id))}
                key={categorie.id}
                className="btn-filter"
              >
                {categorie.name}
              </button>
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AppFilter;
