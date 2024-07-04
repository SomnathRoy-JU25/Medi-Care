import { toast } from "react-hot-toast";
import medicare_logo from "../../../public/app_logo.png";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";
import { setLoading } from "../../slices/authSlice";

const { PAYMENT_API, VERIFY_API } = paymentEndpoints;

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
// Book Appointment
export async function PayFees(
    token,
    total_fees,
    navigate,
    dispatch,
    callback // New callback parameter
  ) {
    const toastId = toast.loading("Loading...");
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
      if (!res) {
        toast.error("Razorpay SDK failed to load. Check your Internet Connection.");
        return;
      }
  
      // Initiating the Order in Backend
      const orderResponse = await apiConnector(
        "POST",
        PAYMENT_API,
        { total_fees }, // Pass total_fees as an object
        {
          Authorization: `Bearer ${token}`,
        }
      );
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }
  
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
        currency: orderResponse.data.data.currency,
        amount: `${orderResponse.data.data.amount}`,
        order_id: orderResponse.data.data.id,
        name: "Medi-Care",
        description: "Thank you for using our service.",
        image: medicare_logo,
        handler: function (response) {
          verifyPayment({ ...response }, token, navigate, dispatch, callback);
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.");
        console.log(response.error);
      });
    } catch (error) {
      console.log("PAYMENT API ERROR............", error);
      toast.error("Could Not make Payment.");
    }
    toast.dismiss(toastId);
  }
  
  // Verify the Payment
  async function verifyPayment(
    bodyData,
    token,
    navigate,
    dispatch,
    callback // New callback parameter
  ) {
    setLoading(true);
    const toastId = toast.loading("Verifying Payment...");
    try {
      const response = await apiConnector("POST", VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      });
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      toast.success("Payment Successful, Appointment booked successfully" , {duration: 2000});
      callback(); // Call the booking function
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error);
      // toast.error("Could Not Verify Payment.");
    }
    setLoading(false);
    toast.dismiss(toastId);
  }
  