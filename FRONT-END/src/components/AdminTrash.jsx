import useApiCall from "../hooks/useApiCall";
import axios from "../axios";

function AdminTrash() {
  let trash = useApiCall("/trashData"); 

  console.log("trash:",trash);
  

  async function dataDelete(id) {
    try {
      let value = await axios.delete("/products/removeProduct", {
        data: { id: id },
      });
      if (value) {
       console.log(value);
       
      }
    } catch (error) {
      console.error("Error found in retrieving data:", error);
    }
  }

  async function dataRestore(id) {
    try {
      let result = await axios.post("/restoreTrash", { id });
      if (result) {
        console.log("Success");
      }
    } catch (error) {
      console.error("Error found in dataRestore:", error);
    }
  }

  return (
    <>
      {trash?.length > 0 &&
        trash.map((element, index) => (
          <div
            key={element._id || `offer-${index}`}
            className="border-b border-gray-200 pb-4 mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-gray-400">
                Name: {element.name}
              </span>
              <div className="space-x-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => dataRestore(element._id)}
                >
                  Restore
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => dataDelete(element._id)}
                  disabled={cartproduct?.some(
                    (item) => item._id === element._id
                  )}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-400">Price: {element.price}</p>
            <p className="text-gray-400">Offer: 30%</p>
            <p className="text-gray-400">Sales: 4</p>
          </div>
        ))}
    </>
  );
}

export default AdminTrash;
