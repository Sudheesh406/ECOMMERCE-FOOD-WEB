const {
  upload,
  create,
  removeData,
  removeQty,
  AllCartProducts,
  cartClearService,
} = require("../services/cartService");

async function uploadCart(req, res) {
  let id = req.User.id;
  if (id) {
    try {
      let response = await upload(id);
      if (response) {
        let result = response.map((item) => ({
          product: {
            ...item.product.toObject(),
            quantity: item.quandity,
          },
        }));

        res.status(200).json({ message: "success", result });
      } else {
        res.status(401).json({ message: "their is no data found" });
      }
    } catch (error) {
      console.error("error found in cart", error);
      res.status(400).json({ message: "error in upload data" });
    }
  } else {
    res.status(401).json({ message: "their is no data found" });
  }
}

async function addToCart(req, res) {
  let { id, qty } = req.body;
  let userid = req.User.id;

  if (id && userid) {
    try {
      let result = await create(id, userid, qty);
      if (result) {
        res.status(200).json({ message: "success", result });
      } else {
        res.status(401).json({ message: "data not added" });
      }
    } catch (error) {
      console.error("error found in addToCart", error);
      res.status(400).json({ message: "error found in removeWish" });
    }
  } else {
    res.status(401).json({ message: "id not found so data not added" });
  }
}

async function removeFromCart(req, res) {
  let id = req.User.id;
  let proId = req.body;
  if (id) {
    try {
      let result = await removeData(id, proId.id);
      if (result) {
        res.status(200).json({ message: "success", result });
      } else {
        res.status(401).json({ message: "data not deleted" });
      }
    } catch (error) {
      console.error("error found in removewish", error);
      res.status(400).json({ message: "error found in removeWish" });
    }
  } else {
    res.status(401).json({ message: "data not deleted" });
  }
}

async function removeProductQty(req, res) {
  let id = req.User.id;
  let proId = req.body;
  if ((id, proId)) {
    try {
      let result = await removeQty(id, proId.id);
      if (result) {
        res.status(200).json({ message: "success", result });
      } else {
        res.status(401).json({ message: "data not deleted" });
      }
    } catch (error) {
      console.error("error found in removeQty", error);
      res.status(400).json({ message: "error found in removeWish" });
    }
  } else {
    res.status(401).json({ message: "data not deleted" });
  }
}

const getAllCartProducts = async (req, res) => {
  try {
    let result = await AllCartProducts();
    if (result) {
      res
        .status(200)
        .json({ message: "successfully get all products", result });
    } else {
      res.status(400).json({ message: "error found in AllCartProducts" });
    }
  } catch (error) {
    console.error("error found in getAllCartProducts", error);
  }
};

const cartClear = async (req, res) => {
  try {
    const {id} = req.body;
    let data = await cartClearService(id);
    if (data) {
      res.status(200).json({ message: "cart is cleared", data });
    }else{
      res.status(401).json({ message: "cart is cleared", data });

    }
  } catch (error) {
    console.error("error found in cartClear", error);
    res.status(401).json({ message: "cart is cleared", data });

  }
};

module.exports = {
  uploadCart,
  addToCart,
  removeFromCart,
  removeProductQty,
  getAllCartProducts,
  cartClear,
};
