const { default: ProfileLayout } = require("@/components/profile/layout");
import axios from "axios";
import { handleError } from "lib/helper";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useForm } from "react-hook-form";


const profilePage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/info`);
  if (error) {
    toast.error(handleError(error));
  }
  if (!data) {
    return (
      <ProfileLayout>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      </ProfileLayout>
    );
  }

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/info/edit`, {
        data
      });
      toast.success("اطلاعات با موفقیت ویرایش شد!");
      mutate(res.data);
    } catch(err) {
      toast.error(handleError(err))
    }
  }

  return (
    <ProfileLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="vh-70">
        <div className="row g-4">
          <div className="col col-md-6">
            <label className="form-label">نام و نام خانوادگی</label>
            <input {...register('name', {required: "پر کردن فیلد نام و نام خانوادگی الزامی است!"})} defaultValue={data.name} type="text" className="form-control" />
            <div className="form-text text-danger">{errors.name?.message}</div>
          </div>
          <div className="col col-md-6">
            <label className="form-label">ایمیل</label>
            <input {...register('email', {required: "پر کردن فیلد ایمیل الزامی است!"})} defaultValue={data.email} type="text" className="form-control" />
            <div className="form-text text-danger">{errors.email?.message}</div>
          </div>
          <div className="col col-md-6">
            <label className="form-label">شماره تلفن</label>
            <input defaultValue={data.cellphone} type="text" disabled className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          ویرایش
        </button>
      </form>
    </ProfileLayout>
  );
};

export default profilePage;
