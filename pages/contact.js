import ContactForm from "@/components/ContactForm";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
  })

const ContactPage = () => {
    return(
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
    )   
}

export default ContactPage;