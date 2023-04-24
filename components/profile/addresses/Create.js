import axios from "axios";
import { handleError } from "lib/helper";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";


const Create = ({provinces, cities}) => {
  const {mutate} = useSWRConfig();
  const {register, handleSubmit, watch, formState: {errors}, reset} = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/addresses/create`, {
        data
      });
      toast.success("آدرس با موفقیت ثبت گردید!");
      mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/addresses`);
      reset();
    } catch(err) {
      toast.error(handleError(err));
    }
    }

    return(
        <>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          ایجاد آدرس جدید
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="collapse mt-3" id="collapseExample">
          <div className="card card-body">
            <div className="row g-4">
              <div className="col col-md-6">
                <label className="form-label">عنوان</label>
                <input {...register('title', {required: "وارد کردن فیلد عنوان الزامی است!"})} type="text" className="form-control" />
                <div className="form-text text-danger">{errors.title?.message}</div>
              </div>
              <div className="col col-md-6">
                <label className="form-label">شماره تماس</label>
                <input {...register('cellphone', {required: "وارد کردن فیلد شماره موبایل الزامی است!", pattern: {value: /^(\+98|0)?9\d{9}$/i, message: "فرمت شماره موبایل صحیح نمیباشد!"} })} type="text" className="form-control" />
                <div className="form-text text-danger">{errors.cellphone?.message}</div>
              </div>
              <div className="col col-md-6">
                <label className="form-label">کد پستی</label>
                <input {...register('postal_code', {required: "وارد کردن فیلد کد پستی الزامی است!", pattern: {value: /^\d{5}[ -]?\d{5}$/i, message: "فرمت کد پستی صحیح نمیباشد!"}})} type="text" className="form-control" />
                <div className="form-text text-danger">{errors.postal_code?.message}</div>
              </div>
              <div className="col col-md-6">
                <label className="form-label">استان</label>
                <select {...register('province_id', {required: "وارد کردن استان الزامی است!"})} className="form-select" defaultValue="" aria-label="Default select example">
                  <option  value="">انتخاب استان</option>
                  {provinces.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <div className="form-text text-danger">{errors.province_id?.message}</div>
              </div>
              <div className="col col-md-6">
                <label className="form-label">شهر</label>
                <select {...register('city_id', {required: "وارد کردن شهر الزامی است!"})} className="form-select" defaultValue="" aria-label="Default select example">
                  <option value="">انتخاب شهر</option>
                  {cities.filter(item => item.province_id == watch('province_id')).map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <div className="form-text text-danger">{errors.city_id?.message}</div>
              </div>
              <div className="col col-md-12">
                <label className="form-label">آدرس</label>
                <textarea {...register('address', {required: "وارد کردن فیلد آدرس الزامی است!"})} type="text" rows="5" className="form-control"></textarea>
                <div className="form-text text-danger">{errors.address?.message}</div>
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary mt-4">ایجاد</button>
            </div>
          </div>
        </form>
        <hr />
        </>
    )
}

export default Create;