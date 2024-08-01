import { Button, Drawer, Input, InputNumber, Spin, Table } from "antd";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import { useAllProductsQuery } from "../../redux/features/products/allProducts";
import { NavLink } from "react-router-dom";
import { PlusSquareFilled } from "@ant-design/icons";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../redux/features/products/createProduct";
import TextArea from "antd/es/input/TextArea";

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<productType>();

  const [createProduct] = useCreateProductMutation();

  const onSubmit: SubmitHandler<productType> = async (data) => {
    const newProduct = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      color: data.color,
      quantity: data.quantity,
      imageUrl: data.imageUrl,
      howtocare: {
        header: data.howtocare.header,
        description: data.howtocare.description,
      },
      recommended: data.recommended,
      isFeatured: data.isFeatured,
      rating: data.rating,
    };
    // const toastId = toast.loading("Adding product");
    try {
      console.log(data);
      // const res = await createProduct(newProduct)
      // .unwrap()
      // .catch((error) => {
      //   if (error) {
      //     toast.error(error.data.message, { id: toastId, duration: 2000 });
      //   }
      // });
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dataSource: datasourcetype[] = [];
  const { data, error } = useAllProductsQuery("");
  if (data === undefined || data === null) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <Spin spinning size="large"></Spin>;
      </div>
    );
  } else if (error) {
    return <div>hihihihhihihihhihihihhhhihihih</div>;
  } else {
    const allprodcuts = data.data;
    allprodcuts.map((prod: productType) => {
      dataSource.push({
        key: prod.name,
        name: prod.name,
        price: prod.price,
        quantity: prod.quantity,
        id: prod._id,
      });
    });
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        sorter: (a: DataType, b: DataType) => a.price - b.price,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        sorter: (a: DataType, b: DataType) => a.quantity - b.quantity,
      },
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (idd: string) => (
          <NavLink to={`/dashboard/${idd}`}>
            <Button>Edit</Button>
          </NavLink>
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
          <Table columns={columns} dataSource={dataSource} />;
        </div>
        <Drawer
          placement="bottom"
          title="Adding Product"
          onClose={onClose}
          open={open}
          height={"100vh"}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:w-1/3 mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
          >
            <label className="block mb-1 font-bold text-gray-700">Name</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => <Input variant="filled" {...field} />}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
            <label className="block my-2 font-bold text-gray-700">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => <TextArea variant="filled" {...field} />}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
            <div className="flex justify-center items-center gap-5 my-5">
              <label className="block font-bold text-gray-700">Category</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => <Input variant="filled" {...field} />}
              />
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
              <label className="block font-bold text-gray-700">Color</label>
              <Controller
                name="color"
                control={control}
                rules={{ required: "Color is required" }}
                render={({ field }) => <Input variant="filled" {...field} />}
              />
              {errors.color && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.color.message}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center gap-5 mb-5">
              <label className="block mb-1 font-bold text-gray-700">
                Price
              </label>
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required" }}
                defaultValue={3}
                render={({ field }) => (
                  <InputNumber variant="filled" min={1} max={500} {...field} />
                )}
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
              <label className="block mb-1 font-bold text-gray-700">
                Quantity
              </label>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: "Quantity is required" }}
                defaultValue={3}
                render={({ field }) => (
                  <InputNumber variant="filled" min={1} max={500} {...field} />
                )}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
              <label className="block mb-1 font-bold text-gray-700">
                Rating
              </label>
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating is required" }}
                defaultValue={3}
                render={({ field }) => (
                  <InputNumber
                    variant="filled"
                    prefix
                    min={1}
                    max={5}
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <label className="block mb-1 font-bold text-gray-700">
              ImageUrl
            </label>
            <Controller
              name="imageUrl"
              control={control}
              rules={{ required: "imageUrl is required" }}
              render={({ field }) => <Input variant="filled" {...field} />}
            />
            {errors.imageUrl && (
              <p className="text-red-600 text-sm mt-1">
                {errors.imageUrl.message}
              </p>
            )}
            <label className="block mb-1 font-bold text-gray-700">
              How to Care : Header
            </label>
            <Controller
              name="howtocare.header"
              control={control}
              rules={{ required: "Header is required" }}
              render={({ field }) => <Input variant="filled" {...field} />}
            />
            {errors.howtocare?.header && (
              <p className="text-red-600 text-sm mt-1">
                {errors.howtocare.header.message}
              </p>
            )}
            <label className="block mb-1 font-bold text-gray-700">
              How to Care : Description
            </label>
            <Controller
              name="howtocare.description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => <Input variant="filled" {...field} />}
            />
            {errors.howtocare?.description && (
              <p className="text-red-600 text-sm mt-1">{errors.howtocare.description.message}</p>
            )}
            
            <Button  className="mt-10" htmlType="submit">
              Submit
            </Button>
          </form>
        </Drawer>
      </ProtectedRoute>
    );
  }
};

export default Dashboard;
