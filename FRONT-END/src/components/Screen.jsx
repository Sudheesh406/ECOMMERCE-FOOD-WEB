import img from "../assets/freepik__upload__2652-removebg.png";
import "./screen.css";
const Screen = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-green-900 text-white">
      <div className="flex flex-col md:flex-row items-center px-10 md:px-36 pt-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold leading-snug">
            Enjoy Your <span className="text-orange-500">Favorite</span> <br />{" "}
            Foods Anytime
          </h1>
          <div className="flex justify-center md:justify-start space-x-10 mt-8 text-center">
            <div>
              <p className="text-4xl font-semibold">5k+</p>
              <span className="text-yellow-400 text-lg">Reviews</span>
            </div>
            <div>
              <p className="text-4xl font-semibold">200+</p>
              <span className="text-yellow-400 text-lg">Daily Orders</span>
            </div>
            <div>
              <p className="text-4xl font-semibold">5000+</p>
              <span className="text-yellow-400 text-lg">Happy Customers</span>
              <p className="text-sm text-gray-400">
                4.8 Rating (5000+ Reviews)
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={img}
            alt="Character holding burger"
            className="w-full md:w-5/6 lg:w-4/5 mx-auto drop-shadow-lg rounded-lg bg-lime-300 rotater shadow-md"
          />
        </div>
      </div>

      {/*----------------------------- Offers Section------------------- */}
      <div className="mt-20 px-10 md:px-36">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl md:text-6xl font-bold">
            Save <span className="text-orange-500">$$$</span> with Offers
          </h1>
          <hr className="hidden md:block flex-grow border-t border-white mx-10" />
        </div>
        <p className="text-lg text-gray-400 mt-4 md:mt-2">
          Explore amazing deals and discounts on your favorite meals!
        </p>
      </div>
    </div>
  );
};

export default Screen;
