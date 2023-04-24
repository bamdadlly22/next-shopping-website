import Product from "@/components/product/Product";
import axios from "axios";
import { handleError } from "lib/helper";
import {  useRouter   } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MenuPage = ({ categories, products, error }) => {
  const [productList, setProductList] = useState(products);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handlePaginate = async (e, value) => {
    // e.preventDefault();
    let query = {...router.query, ...value};
    if(!value.hasOwnProperty('page')) {
      delete query.page;
    }
      try {
      setLoading(true);
      const res = await axios.get(
        `/menu?${new URLSearchParams(query).toString()}`
      );
      setProductList(res.data.data);
      router.push(`/menu?${new URLSearchParams(query).toString()}`, undefined, {shallow: true})
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="food_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <div>
              <label className="form-label">جستجو</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="نام محصول ..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="input-group-text" id="basic-addon2" onClick={searchValue != "" ? (e) => handlePaginate(e, {search: searchValue}) : null }>
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <hr />
            <div className="filter-list">
              <div className="form-label">دسته بندی</div>
              <ul>
                {categories &&
                  categories.map((category, index) => (
                    <li key={index} className={router.query.hasOwnProperty("category") && router.query.category == category.id ? "my-2 cursor-pointer filter-list-active" : "my-2 cursor-pointer"} onClick={(e) => handlePaginate(e, {category: category.id})}>
                      {category.name}
                    </li>
                  ))}
                {/* <li className="my-2 cursor-pointer filter-list-active">پیتزا</li> */}
              </ul>
            </div>
            <hr />
            <div>
              <label className="form-label">مرتب سازی</label>
              <div className="form-check my-2">
                <input
                  onChange={(e) => handlePaginate(e, {sortBy: 'max'})}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked={router.query.hasOwnProperty('sortBy') && router.query.sortBy == 'max'}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault1"
                >
                  بیشترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={(e) => handlePaginate(e, {sortBy: 'min'})}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={router.query.hasOwnProperty('sortBy') && router.query.sortBy == 'min'}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault2"
                >
                  کمترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={(e) => handlePaginate(e, {sortBy: 'bestseller'})}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  checked={router.query.hasOwnProperty('sortBy') && router.query.sortBy == 'bestseller'}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault3"
                >
                  پرفروش ترین
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={(e) => handlePaginate(e, {sortBy: 'sale'})}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault4"
                  checked={router.query.hasOwnProperty('sortBy') && router.query.sortBy == 'sale'}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="flexRadioDefault4"
                >
                  با تخفیف
                </label>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="col-sm-12 col-lg-9">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border"></div>
              </div>
            </div>
          ) : (
            <div className="col-sm-12 col-lg-9">
              <div className="row gx-3">
                {productList &&
                  productList.products.map((product, index) => (
                    <div key={index} className="col-sm-6 col-lg-4">
                      <Product prodctInfo={product} />
                    </div>
                  ))}
              </div>
              <nav className="d-flex justify-content-center mt-5">
                <ul className="pagination">
                  {productList && productList.products.length != 0 ?
                    productList.meta.links.slice(1, -1).map((link, index) => (
                      <li
                        key={index}
                        className={
                          link.active ? "page-item active" : "page-item"
                        }
                      >
                        <button
                          onClick={(e) =>
                            handlePaginate(e, { page: link.label })
                          }
                          className="page-link"
                        >
                          {link.label}
                        </button>
                      </li>
                    )) : (<div>محصولی یافت نشد!</div>)}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;

export async function getServerSideProps({resolvedUrl}) {
  try {
    const res = await axios.get(`${resolvedUrl}`);
    const resCategories = await axios.get("/categories");
    return {
      props: {
        products: res.data.data,
        categories: resCategories.data.data,
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
}
