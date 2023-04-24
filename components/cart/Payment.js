import axios from "axios";
import { handleError } from "lib/helper";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Payment = ({cart, addressId, coupon}) => {
    const router = useRouter();
    const handlePayment = async () => {
        if(addressId == null) {
            toast.error("انتخاب آدرس الزامی میباشد!");
            return;
        }

        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/payment/sent`, {
            cart,
            coupon,
            addressId
          });
          router.push(res.data.url);
        } catch(err) {
          toast.error(handleError(err));
        }
    }
  
    return (
    <>
      <button onClick={handlePayment} className="user_option btn-auth mt-4">پرداخت</button>
    </>
  );
};

export default Payment;
