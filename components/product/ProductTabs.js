import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import Product from "./Product";

const ProductsTabs = ({ productsTabs }) => {
  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>منو محصولات</h2>
        </div>
        <Tabs selectedTabClassName="active">
        <TabList>
        <ul className="filters_menu">
          {productsTabs.tabList.map((list, index) => (
            <Tab key={index}>{list}</Tab>
          ))}
        </ul>
        </TabList>

        <div className="filters-content">
          {productsTabs.tabPanel.map((panel, index) => (
            <TabPanel key={index}>
            <div  className="row grid">
              {panel.map((product, index) => (
                <div key={index} className="col-sm-6 col-lg-4">
                    <Product prodctInfo={product}/>
                </div>
              ))}
            </div>
            </TabPanel>
          ))}
        </div>
        </Tabs>
        <div className="btn-box">
          <a href="">مشاهده بیشتر</a>
        </div>
      </div>
    </section>
  );
};

export default ProductsTabs;
