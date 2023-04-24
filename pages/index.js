import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Features from "@/components/Features";
// import Map from "@/components/Map";
import ProductsTabs from "@/components/product/ProductTabs";
import axios from "axios";
import { handleError } from "lib/helper";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
})

const Home = ({productsTabs, error}) => {
  useEffect(() => {
    error && toast.error(error)
  },[error])
  return (
    <>
        <Features/>
        {productsTabs && <ProductsTabs productsTabs={productsTabs}/>}
        <About/>
        <section className="book_section layout_padding">
        <div className="container">
            <div className="heading_container">
                <h2>
                    تماس با ما
                </h2>
            </div>
            <div className="row">
                <div className="col-md-6">
                <ContactForm/>
                </div>
                <div className="col-md-6">
                    <div className="map_container ">
                    <Map/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Home;

export async function getServerSideProps() {
  try {
    const res = await axios.get("/products/products-tabs");
    return {
      props: {
        productsTabs: res.data.data
      }
    }
  } catch(err) {
    return {
      props: {
        error: handleError(err)
      }
    }
  }
}
