import { toast } from "sonner";
import { useAllProductsQuery } from "../../redux/features/products/allProducts";
import { NavLink } from "react-router-dom";
import { Card, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { ShoppingCartOutlined, UpCircleOutlined } from "@ant-design/icons";

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
  const { data } = useAllProductsQuery(null);
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
  } else {
    const allproducts = data.data;
    return (
      <div className="flex mt-10 max-sm:flex-col justify-center items-center gap-10 flex-wrap">
        {allproducts.map((prod: productType) => (
          <Card
            data-aos="zoom-out"
            key={prod.name}
            hoverable
            style={{ width: 300, height: 500 }}
            cover={
              <img className="p-5 h-80" src={prod.imageUrl} alt={prod.name} />
            }
            actions={[
              <NavLink to={`/shop/${prod._id}`} replace={true}>
                <UpCircleOutlined style={{ fontSize: "25px" }} />
              </NavLink>,
              <ShoppingCartOutlined style={{ fontSize: "25px" }} />,
            ]}
          >
            <Meta title={prod.name} description={prod.description} />
          </Card>
        ))}
      </div>
    );
  }
};

export default Shop;
