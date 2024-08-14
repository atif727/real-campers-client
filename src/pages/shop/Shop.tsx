import { useAllProductsQuery } from "../../redux/features/products/allProducts";
import { NavLink } from "react-router-dom";
import { Card, Empty, GetProps, Input, Spin } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

type howtocare = { header: string; description: string };
type productType = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  color: string;
  imageUrl: string;
  quantity: number;
  howtocare: howtocare;
};
const Shop = () => {
  const [searchQuery, setsearchQuery] = useState(``);
  type SearchProps = GetProps<typeof Input.Search>;
  const onSearch: SearchProps["onSearch"] = (value) => {
    if (value === "") {
      setsearchQuery(``);
    } else {
      setsearchQuery(`?name=${value}`);
    }
  };
  const { data, error } = useAllProductsQuery(searchQuery);
  console.log(data);
  if (data === undefined || data === null) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <Spin spinning size="large"></Spin>;
      </div>
    );
  } else if (data.success === false) {
    return (
      <>
        <div className="text-center text-red-600 font-bold text-6xl">
          Sorry something went wrong
        </div>
      </>
    );
  } else if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Search
          className="w-1/3 max-sm:w-2/3 mt-5"
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          size="large"
        />
        <div className="flex my-10 max-sm:flex-col justify-center items-center gap-10 flex-wrap">
        <Empty style={{fontSize: '20px'}} description={"No products found Or Maybe use captial letters at the start and also write the exact name if you can"} />;
        </div>
      </div>
    );
  } else {
    const allproducts = data.data;
    return (
      <div className="flex flex-col justify-center items-center">
        <Search
          className="w-1/3 max-sm:w-2/3 mt-5"
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          size="large"
        />
        <div className="flex my-10 max-sm:flex-col justify-center items-center gap-10 flex-wrap">
          {allproducts.map((prod: productType) => (
            <NavLink key={prod.name} to={`/shop/${prod._id}`} replace={true}>
              <Card
                data-aos="zoom-out"
                key={prod.name}
                hoverable
                style={{ width: 300, height: 500 }}
                cover={
                  <img
                    className="p-5 h-80"
                    src={prod.imageUrl}
                    alt={prod.name}
                  />
                }
              >
                <p className="text-lg font-bold">{prod.name}</p>
                <p className="mt-1 text-base font-light">{prod.description}</p>
                <p className="mt-2 text-lg font-semibold">৳ {prod.price}</p>
              </Card>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
};

export default Shop;
