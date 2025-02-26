import { useParams } from "react-router-dom";
import axios from "../axios";
import { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const pdfRef = useRef();

    async function getDetails() {
        try {
            let { data } = await axios.get(`/order/getOrderDetails/${orderId}`);
            if (data) {
                console.log("Order details:", data.result);
                setOrder(data.result);
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    }

    useEffect(() => {
        getDetails();
    }, [orderId]);

    if (!order) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-green-900">
                <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const totalAmount = order.products.reduce((acc, item) => acc + item.price, 0);

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Order_${orderId}.pdf`);
        });
    };

    return (
        <div className="min-h-[649px] pt-5">
            <div className="max-w-3xl mx-auto p-4 bg-gray-100 min-h-[70vh]" ref={pdfRef}>
                <h1 className="text-lg font-bold text-gray-800 mb-4 text-center">Order Summary</h1>

                {/* User & Address Section */}
                <div className="bg-white shadow-md p-4 rounded-lg border border-gray-300">
                    <div className="mb-3">
                        <h2 className="text-md font-semibold text-gray-700">👤 Customer Details</h2>
                        <p className="text-gray-600">Name: {order.userId.username}</p>
                        <p className="text-gray-600">Email: {order.userId.email}</p>
                    </div>
                    <div>
                        <h2 className="text-md font-semibold text-gray-700">📍 Shipping Address</h2>
                        <p className="text-gray-600">{order.address.houseName}, {order.address.city}, {order.address.state}</p>
                    </div>
                    <div className="pt-3">
                        <h2 className="text-md font-semibold text-gray-700">Order Status</h2>
                        <p className="text-gray-600">{order.status}</p>
                    </div>
                </div>

                {/* Products List */}
                <div className="mt-4 bg-white shadow-md p-4 rounded-lg border border-gray-300">
                    <h2 className="text-md font-semibold text-gray-700 mb-2">🛍️ Ordered Items</h2>
                    <div className="space-y-3">
                        {order.products.map((item) => (
                            <div key={item._id} className="flex items-center space-x-4 border-b pb-3 last:border-b-0">
                                <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded-lg shadow" />
                                <div className="flex-1">
                                    <h3 className="text-md font-medium text-gray-800">{item.productId.name}</h3>
                                    <p className="text-gray-600">Price: ₹{item.productId.price} × {item.price / item.productId.price}</p>
                                </div>
                                <p className="text-lg font-semibold text-gray-800">₹{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Total Amount and Download Button */}
            <div className="text-center mt-5 flex justify-between max-w-3xl mx-auto">
                <div className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md text-lg font-semibold">
                    💰 Total: ₹{totalAmount}
                </div>
                <button
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md text-lg font-semibold"
                    onClick={downloadPDF}
                >
                    Download
                </button>
            </div>
        </div>
    );
}

export default OrderDetails;
