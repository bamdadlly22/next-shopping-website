import { handleError } from "lib/helper";
import Link from "next/link";
import { toast } from "react-toastify";
import useSWR from "swr";

const Addresses = ({setAddressId}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/addresses`
  );
  if (error) {
    toast.error(handleError(error));
  }
  if (!data) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      {data.length !== 0 ? (
        <>
          <div>انتخاب آدرس</div>
          <select
          onChange={e => setAddressId(e.target.value)}
            style={{ width: "200px" }}
            className="form-select ms-3"
            defaultValue=""
            aria-label="Default select example"
          >
            <option value="">انتخاب کنید</option>
            {data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
        <Link href="http://localhost:3000/profile/addresses" legacyBehavior>
        <a className="btn btn-primary">
            ایجاد آدرس
          </a>
        </Link>
        </>
      )}
    </>
  );
};

export default Addresses;
