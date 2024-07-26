import { toast } from "sonner";
import { useAllProductsQuery } from "../../redux/features/products/allProducts";
import { Link, NavLink, Navigate } from "react-router-dom";
import { Button, Card, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import {
  EditOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";

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

const toastId = toast.loading("Fetching all the products");
const Shop = () => {
  const { data, isError, error } = useAllProductsQuery(null);
  if (data === undefined || data === null) {
    toast.loading("Fetching all the products", { id: toastId });
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <Spin spinning size="large"></Spin>;
      </div>
    );
  } else if (data.success === false) {
    toast.success("All the products Shown !", { id: toastId, duration: 1500 });
    return (
      <>
        <div className="text-center text-red-600 font-bold text-6xl">
          Sorry something went wrong
        </div>
      </>
    );
  } else {
    toast.success("All the products Shown !", { id: toastId, duration: 1500 });
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