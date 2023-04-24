import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const ProfileLayout = ({ children }) => {
  const {userLogout} = useContext(AuthContext);
  return (
    <section className="profile_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <li className="list-group-item">
                <Link href="/profile" legacyBehavior>
                  <a>اطلاعات کاربر</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/profile/addresses" legacyBehavior>
                  <a>آدرس ها</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/profile/orders" legacyBehavior>
                  <a>سفارشات</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/profile/transactions" legacyBehavior>
                  <a>تراکنش ها</a>
                </Link>
              </li>
              <li className="list-group-item">
                  <a href="#" onClick={userLogout}>خروج</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-lg-9">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
