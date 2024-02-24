
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")

    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const addProduct = async () => {
        console.log(!name);
        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }

        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem("user")).id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`

            }
        });
        result = await result.json();
        console.log(result);
        navigate("/")
    }



    return (

        <div className="addproduct" >
            <h1>Add  product</h1>

            <input className='inputBox' type="text" placeholder="enter Product Name" value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className="invalid-input" >Enter Valid Name</span>}

            <input className='inputBox' type="text" placeholder="enter Product price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span className="invalid-input" >Enter Valid price</span>}

            <input className='inputBox' type="text" placeholder="enter Product category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span className="invalid-input" >Enter Valid category</span>}

            <input className='inputBox' type="text" placeholder="enter Product company" value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <span className="invalid-input" >Enter Valid company</span>}

            <button onClick={addProduct} className="appButton" type="button">Add</button>

        </div>)
};

export default AddProduct