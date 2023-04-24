const { default: ProfileLayout } = require("@/components/profile/layout");
import axios from "axios";
import { handleError } from "lib/helper";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import Create from "@/components/profile/addresses/Create";
import Edit from "@/components/profile/addresses/Edit";

const addressesPage = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_APP_API_URL}/addresses`);
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

  return (
    <ProfileLayout>
        <Create provinces={data.provinces} cities={data.cities}/>
        {data.addresses.map((address, index) => (
            <Edit key={index} address={address} provinces={data.provinces} cities={data.cities}/>
        ))}
    </ProfileLayout>
  );
};

export default addressesPage;
