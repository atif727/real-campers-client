import { Button, Drawer, Popover, Spin, Table } from "antd";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import { useAllProductsQuery } from "../../redux/features/products/allProducts";
import { NavLink } from "react-router-dom";
import {
  ExclamationCircleFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import { useState } from "react";
import AddProductForm from "./AddProductForm";
import type { ColumnsType } from "antd/es/table";

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
  recommended: boolean;
  isFeatured: boolean;
  rating: number;
};

type datasourcetype = {
  key: string;
  name: string;
  price: number;
  quantity: number;
  id: string;
};

interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  id: string;
}

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenChange = (id: string) => {
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

  const dataSource: datasourcetype[] = [];
  const { data, error } = useAllProductsQuery("");
  if (data === undefined || data === null) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <Spin spinning size="large" />
      </div>
    );
  } else if (error) {
    return <div>Error loading data</div>;
  } else {
    const allProducts = data.data;
    allProducts.map((prod: productType) => {
      dataSource.push({
        key: prod.name,
        name: prod.name,
        price: prod.price,
        quantity: prod.quantity,
        id: prod._id,
      });
    });

    const columns: ColumnsType<DataType> = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        responsive: ["lg"] as any,
        align: "center",
        sorter: (a: DataType, b: DataType) => a.price - b.price,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        sorter: (a: DataType, b: DataType) => a.quantity - b.quantity,
        align: "center",
      },
      {
        title: "Edit",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (id: string) => (
          <>
            <NavLink to={`/dashboard/${id}`}>
              <Button>Edit</Button>
            </NavLink>

            <Popover
              content={
                <>
                  <div className="flex justify-center items-center gap-2">
                    <ExclamationCircleFilled className="text-red-600" />
                    <h1>This will permanently delete the product</h1>
                  </div>
                  <div className="mt-2">
                    <Button onClick={() => setOpenPopoverId(null)} className="rounded-lg">
                      Close
                    </Button>
                    <Button
                      onClick={() => setOpenPopoverId(null)}
                      className="rounded-lg ml-2"
                      danger
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>
                </>
              }
              title={<h1 className="text-lg font-bold text-left">Are you sure ?</h1>}
              trigger="click"
              open={openPopoverId === id}
              onOpenChange={() => handleOpenChange(id)}
            >
              <Button className="ml-2" danger type="dashed">Delete</Button>
            </Popover>
          </>
        ),
      },
    ];

    return (
      <ProtectedRoute>
        <div className="mt-10 px-10">
          <Button
            onClick={showDrawer}
            type="primary"
            size="large"
            className="flex justify-center items-center w-full mb-5 font-bold"
          >
            <PlusSquareFilled />
            Add Products
          </Button>
          <Table columns={columns} dataSource={dataSource} sticky={{ offsetHeader: 64 }} />
        </div>
        <Drawer
          placement="bottom"
          title="Adding Product"
          onClose={onCloseDrawer}
          open={openDrawer}
          height={"100vh"}
        >
          <AddProductForm />
        </Drawer>
      </ProtectedRoute>
    );
  }
};

export default Dashboard;
