import axios from "axios";
import { handleError } from "lib/helper";
import { toast } from "react-toastify";

const Coupon = ({coupon, setCoupon}) => {

    const handleCheckCoupon = async () => {
        if(coupon.code === "" || coupon.code === null) {
            toast.error("وارد کردن فیلد کد تخفیف الزامی است!");
            return;
        }
        try {
            console.log(coupon.code);
          const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/cart/coupon`, {
            code: coupon.code
          });
          toast.success("کد تخفیف با موفقیت اعمال شد!");
          setCoupon({...coupon, percent: res.data.percentage})
        } catch(err) {
          toast.error(handleError(err));
        }
      }

    return(
        <div className="input-group mb-3">
        <input
        onChange={e => setCoupon({...coupon, code: e.target.value})}
          type="text"
          className="form-control"
          placeholder="کد تخفیف"
        />
        <button onClick={handleCheckCoupon} className="input-group-text" id="basic-addon2">
          اعمال کد تخفیف
        </button>
      </div>
    )
}

export default Coupon