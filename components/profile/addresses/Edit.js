import axios from "axios";
import { handleError } from "lib/helper";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

const Edit = ({address, provinces, cities}) => {
  const {mutate} = useSWRConfig();
  const {register, handleSubmit, watch, formState: {errors}} = useForm({
    defaultValues: {
      province_id: address.province_id
    }
  });
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/addresses/edit`, {
        data,
        address_id: address.id
      });
      toast.success("آدرس با موفقیت ثبت گردید!");
      mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/addresses`);
    } catch(err) {
      toast.error(handleError(err));
    }
    }

    const handleDelete = async () => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/addresses/delete`, {
          address_id: address.id
        });
        toast.success("آدرس با موفقیت حذف گردید!");
        mutate(`${process.env.NEXT_PUBLIC_APP_API_URL}/addresses`);
      } catch(err) {
        toast.error("مشکلی پیش آمده است!");
      }
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="card card-body mb-4">
          <div className="row g-4">
            <div className="col col-md-6">
              <label className="form-label">عنوان</label>
              <input {...register('title', {required: "وارد کردن فیلد عنوان الزامی است!"})} type="text" defaultValue={address.title} className="form-control" />
                <div className="form-text text-danger">{errors.title?.message}</div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">شماره تماس</label>
              <input {...register('cellphone', {required: "وارد کردن فیلد شماره موبایل الزامی است!", pattern: {value: /^(\+98|0)?9\d{9}$/i, message: "فرمت شماره موبایل صحیح نمیباشد!"} })} defaultValue={address.cellphone} type="text" className="form-control" />
                <div className="form-text text-danger">{errors.cellphone?.message}</div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">کد پستی</label>
              <input {...register('postal_code', {required: "وارد کردن فیلد کد پستی الزامی است!", pattern: {value: /^\d{5}[ -]?\d{5}$/i, message: "فرمت کد پستی صحیح نمیباشد!"}})} defaultValue={address.postal_code} type="text" className="form-control" />
                <div className="form-text text-danger">{errors.postal_code?.message}</div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">استان</label>
              <select {...register('province_id', {required: "وارد کردن استان الزامی است!"})} className="form-select" defaultValue={address.province_id} aria-label="Default select example">
                  <option  value="">انتخاب استان</option>
                  {provinces.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <div className="form-text text-danger">{errors.province_id?.message}</div>
            </div>
            <div className="col col-md-6">
              <label className="form-label">شهر</label>
              <select {...register('city_id', {required: "وارد کردن شهر الزامی است!"})} className="form-select" defaultValue={address.city_id} aria-label="Default select example">
                  <option value="">انتخاب شهر</option>
                  {cities.filter(item => item.province_id == watch('province_id')).map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                <div className="form-text text-danger">{errors.city_id?.message}</div>
            </div>
            <div className="col col-md-12">
              <label className="form-label">آدرس</label>
              <textarea {...register('address', {required: "وارد کردن فیلد آدرس الزامی است!"})} defaultValue={address.address} type="text" rows="5" className="form-control"></textarea>
                <div className="form-text text-danger">{errors.address?.message}</div>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary mt-4">ویرایش</button>
              <button type="button" onClick={handleDelete} className="btn btn-dark mt-4">حذف</button>
            </div>
          </div>
        </form>
        </>
    )
}

export default Edit;