// import { Link } from "react-router-dom";
import {useState} from 'react';
function Cards({product , addToCart  }) {
  const [selectedValue, setSelectedValue] = useState(1);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="mt-10 flex flex-wrap gap-10 justify-center">
    {product?.length > 0 &&
      product.map((element,index) => (
        <div
        key={element.id ||`product-${index}`}
          className="card relative w-80  p-4 rounded-2xl transform transition-transform duration-300 hover:scale-105 "
        >
          <img
            src={element.image}
            className="rounded-t-2xl w-full h-48 object-cover"
            alt={element.name || "Food Item"}
          />
          <div className="card-body p-4 bg-gray-900 rounded-b-2xl text-white">
          <h5 className="text-xl font-semibold mb-2 overflow-hidden h-12 truncate">{element.name}</h5>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3">
              <span className="text-lg font-medium">Qty</span>
                <select className="h-8 bg-gray-700 text-white rounded-md px-2 hover:bg-gray-600" onChange={handleChange}>
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
               
              </div>
              <span className="text-lg font-medium">₹{element.price}</span>
            </div>
            <div className='flex gap-3'>

            <button
              className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-green-500 transition-all"
              onClick={() => addToCart(element._id, selectedValue)}
            >
              Add to Cart
            </button>
            {/* <button
              className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-green-500 transition-all"
              onClick={() => OrderNow(element._id, selectedValue)}
            >
              Order Now
            </button> */}

            </div>
          </div>
        </div>
      ))}
  </div>
  
  );
}

export default Cards;
