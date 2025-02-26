
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function Adminlogmodal({open, handleClose}) {
 let navigate = useNavigate() 

    const confirm = ()=>{
        handleClose()
        navigate('/AdminPanel')
    }
  return (
     <div
          className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
            open ? "block" : "hidden"
          }`}
          role="dialog"
          aria-hidden={!open}
        >
          <div className="bg-white p-6 rounded-lg w-1/3">
            <div className="relative">
              <h4 className="text-2xl text-gray-400">Login Notification</h4>
              <p className="mt-1 text-gray-400">
               This mail can only go to Admin page
              </p>
              {/* <button
                className="absolute top-2 right-2 text-black hover:text-gray-800 text-xl"
                onClick={handleClose}
                aria-label="Close"
              >
                <ImCancelCircle />
              </button> */}
            </div>

              <div className="w-full flex gap-3 justify-end pt-3">
                <button
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={confirm}>
                  ok
                </button>
              </div>
          </div>
        </div>
  )
}

export default Adminlogmodal