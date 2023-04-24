import axios from "axios";
import { handleError } from "lib/helper";
import { useState } from "react"
import { toast } from "react-toastify";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(name == "" , email=="", subject=="", text=="") {
            toast.error("لطفا موارد خواسته شده را وارد نمایید.");
            return setLoading(false);
        }
        try {
            const res = await axios.post("/contact-us",{name, email, subject, text});
            if(res.status === 201) {
                toast.success("پیام شما با موفقیت ثبت گردید!");
                setLoading(false);
            }
        } catch(err) {
            toast.error(handleError(err));
            setLoading(false);
        }
    }

    return(
        <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" onChange={e => setName(e.target.value)} value={name} className="form-control" placeholder="نام و نام خانوادگی" />
            </div>
            <div>
                <input type="email" onChange={e => setEmail(e.target.value)} value={email} className="form-control" placeholder="ایمیل" />
            </div>
            <div>
                <input type="text" onChange={e => setSubject(e.target.value)} value={subject} className="form-control" placeholder="موضوع پیام" />
            </div>
            <div>
                <textarea rows="10" onChange={e => setText(e.target.value)} value={text} style={{height: "100px"}} className="form-control"
                    placeholder="متن پیام"></textarea>
            </div>
            <div className="btn_box">
                <button type="submit" disabled={loading}>
                    ارسال پیام
                    {loading && <div className="spinner-border spinner-border-sm" role="status"></div>}
                </button>
            </div>
        </form>
    </div>
    )
}

export default ContactForm;