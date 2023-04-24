import { addToCart, removeFromCart } from "@/redux/cart/action";
import { numberFormat } from "lib/helper";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Product = ({prodctInfo}) => {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
      dispatch(removeFromCart(prodctInfo.id));
      dispatch(addToCart(prodctInfo, 1));
      toast.success("محصول به سبد خرید اضافه شد!");
    }

    return(
        <div className="box">
        <div>
          <div className="img-box">
            {/* <img className="img-fluid" src="./images/b1.jpg" alt=""> */}
            <Image className="img-fluid" src={prodctInfo.primary_image} width={366} height={244} placeholder="blur" blurDataURL={prodctInfo.primary_image_blurDataURL} alt="" />
          </div>
          <div className="detail-box">
            <Link href={`/products/${prodctInfo.slug}`}>
            <h5>{prodctInfo.name}</h5>
            </Link>
            <p>
                {prodctInfo.description}
            </p>
            <div className="options">
              <h6>
                {prodctInfo.is_sale ? (
                <>
                <del>{numberFormat(prodctInfo.price)}</del>
                {numberFormat(sale_price.sale_price)}
                <span>تومان</span>
                </>
                ) : (
                  <>
                  {numberFormat(prodctInfo.price)}
                  </>
                )}
              </h6>
              <button onClick={handleAddToCart}>
                <i className="bi bi-cart-fill text-white fs-5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )

}

export default Product;