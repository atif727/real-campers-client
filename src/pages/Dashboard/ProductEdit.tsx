import React from "react";
import { Button, Layout, Menu, Spin, Tag } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { userSidebarItems } from "../../routes/user.routes";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSingleProductQuery } from "../../redux/features/products/singleproduct";
import EditProductForm from "./EditProductForm";

const { Header, Content } = Layout;

const ProductEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useAppSelector(useCurrentUser);
  let buttonComponentsForUser;
  const username = user?.name;
  if (user === null) {
    buttonComponentsForUser = (
      <>
        <Button type="primary">
          <NavLink to={"/signin"}>Login</NavLink>
        </Button>
        <Button className="ml-3">
          <NavLink to={"/signup"}>Sign up</NavLink>
        </Button>
      </>
    );
  } else {
    buttonComponentsForUser = <Button onClick={handleLogout}>Logout</Button>;
  }

  const prodid: string = useParams().prodid as string;
  const { data } = useSingleProductQuery(prodid);
  // const data = undefined;
  if (data === undefined || data === null) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spin size="large"></Spin>{" "}
      </div>
    );
  } else {
    const product = data.data;
    let color: string = product.color;
    color = color.toLowerCase();
    let stockTagAndCartButton;
    if (product.quantity === 0) {
      stockTagAndCartButton = (
        <>
          <Tag
            className="flex justify-center items-center w-40 mt-20 mb-5 text-lg"
            icon={<CloseCircleOutlined />}
            color="darkred"
          >
            OUT OF STOCK
          </Tag>
          <Button
            size="large"
            className="flex justify-center items-center w-40"
            disabled
          >
            Add to Cart <ShoppingCartOutlined style={{ fontSize: "22px" }} />
          </Button>
        </>
      );
    } else {
      stockTagAndCartButton = (
        <>
          <Tag
            className="flex justify-center items-center w-40 mt-20 mb-5 text-lg"
            icon={<CheckCircleOutlined />}
            color="darkgreen"
          >
            IN STOCK
          </Tag>
          <Button
            size="large"
            className="flex justify-center items-center w-40"
          >
            Add to Cart <ShoppingCartOutlined style={{ fontSize: "22px" }} />
          </Button>
        </>
      );
    }
    return (
      <Layout style={{ background: "white" }}>
        <Header
          style={{
            borderBottom: "1px solid #e5e7eb",
            position: "sticky",
            background: "white",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            items={userSidebarItems}
            style={{ flex: 1, minWidth: 0 }}
          />
          {buttonComponentsForUser}
          <p className="ml-3">{username}</p>
        </Header>
        <Content className="">
          {/*  className="flex max-sm:flex-col justify-left gap-10 p-20 max-sm:p-10 md:h-[90vh]" */}
          <EditProductForm productId={prodid} />
        </Content>
      </Layout>
    );
  }
};

export default ProductEdit;
