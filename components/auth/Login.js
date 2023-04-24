import AuthContext from "context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const Login = ({setStep}) => {
    const {login,cellphone, setCellphone} = useContext(AuthContext);
    const handleLogin = () => {
        if(cellphone === "") {
           toast.error("لطفا فیلد موبایل را پر کنید!");
           return
        }
        const pattern = /^(\+98|0)?9\d{9}$/;
        if (!pattern.test(cellphone)) {
            toast.error("فرمت شماره موبایل معتبر نیست")
            return;
        }
        login(cellphone);
        setStep(2);
    }
  return (
    <div className="form_container">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            شماره موبایل
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={e => setCellphone(e.target.value)}
          />
        </div>
        <button onClick={() => handleLogin()} className="btn btn-primary btn-auth">
          ورود
        </button>
    </div>
  );
};

export default Login;
