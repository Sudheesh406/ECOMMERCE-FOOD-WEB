import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Profile() {
  let navigate = useNavigate();
  const location = useLocation();
  async function auth() {
    try {
      let result = await axios.get("http://localhost:3000/authentication", {
        withCredentials: true,
      });
      if (result.data) {
        console.log("result:", result);
        let { id } = result.data.User;
        if (!id) {
          navigate("/login");
        }
      } else {
        navigate("/login", { state: { from: location } });
        console.log("data is not geting");
      }
    } catch (error) {
      console.error("error found in authentication", error);
    }
  }

  useEffect(() => {
    auth();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[650px] bg-gradient-to-r from-gray-900 to-green-900 ">
      <div className=" p-6 rounded-lg shadow-lg w-[65%] h-[65%] bg-gradient-to-r from-gray-700 to-green-900">
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border"
          />
          <h2 className="text-xl text-white font-semibold">ubasdhhdhdbd</h2>
        </div>
        <div className="mt-4 space-y-2 text-white">
          <div className=" shadow-2xl bg-gray-600 pb-2">
            <div className="flex justify-between ">
              <p className="p-5 flex gap-2">
                <strong>Phone:</strong>basdhhdhdbd
              </p>
              <p className="p-5 flex gap-2">
                <strong>Gender:</strong> basdhhdhdbd
              </p>
            </div>
            <div className="flex justify-between">
              <p className="p-5 flex gap-2">
                <strong>Email:</strong>basdhhdhdbd
              </p>
              <p className="p-5 flex gap-2">
                <strong>Pin:</strong>basdhhdhdbd
              </p>
            </div>
          </div>
          <div className=" shadow-2xl bg-gray-600  pb-2">
            <p className="p-5 flex gap-2">
              <strong>Address:</strong> Get started with Tailwind CSS Tailwind
              CSS works by scanning all of your HTML files, JavaScript
              components, and any other templates for class names, generating
              the corresponding styles and then writing them to a static CSS
              file. It's fast, flexible, and reliable — with zero-runtime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
