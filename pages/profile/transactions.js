import ProfileLayout from "@/components/profile/layout";
import { handleError, numberFormat } from "lib/helper";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const transactionsPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/transactions?page=${pageIndex}`
  );
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
    <>
      <ProfileLayout>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>شماره پیگیری</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((item) => (
                <tr key={item.id}>
                  <th>{item.order_id}</th>
                  <td>{numberFormat(item.amount)} تومان</td>
                  <td>
                    <span
                      className={
                        item.status == "موفق"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.trans_id}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="d-flex justify-content-center mt-5">
          <ul className="pagination">
            {data.meta.links.slice(1, -1).map((link, index) => (
              <li
                key={index}
                className={link.active ? "page-item active" : "page-item"}
              >
                <button
                  onClick={() => setPageIndex(link.label)}
                  className="page-link"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </ProfileLayout>
    </>
  );
};

export default transactionsPage;
