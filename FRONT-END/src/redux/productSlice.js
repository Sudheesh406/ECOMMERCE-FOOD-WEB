
import { createSlice } from '@reduxjs/toolkit';

const  initialState ={
    products:[],
   }

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
        addProduct :(state,action)=>{ 
            console.log("action:",action.payload);
            state.products = [...action.payload];
        },
        editProduct: (state, action) => {
          const updatedProduct = action.payload; 
          let data = JSON.parse(JSON.stringify(state.products))
          const index = data.findIndex((product) => product._id === updatedProduct._id);          
          state.products[index] = updatedProduct; 
        },
        deleteProduct:(state, action)=>{
          const deletedProduct = action.payload;
          let data = JSON.parse(JSON.stringify(state.products))
          let newStore = data.filter((product) => product._id != deletedProduct._id); 
          state.products = [...newStore];
        }
  }
});

export const {addProduct, editProduct, deleteProduct} = productSlice.actions;
export default productSlice.reducer;
