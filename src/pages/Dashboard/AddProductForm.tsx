import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../redux/features/products/createProduct";
import { Button, Input, InputNumber, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CheckOutlined, CloseOutlined, StarFilled } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "sonner";
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

const AddProductForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<productType>();

  const [createProduct] = useCreateProductMutation();

  const [recommendedStatus, setrecommendedStatus] = useState(false);
  const [featuredStatus, setfeaturedStatus] = useState(false);

  const updateRecommend = (checked: boolean) => {
    if (checked === true) {
      setrecommendedStatus(true);
    } else {
      setrecommendedStatus(false);
    }
  };
  const updateFeatured = (checked: boolean) => {
    if (checked === true) {
      setfeaturedStatus(true);
    } else {
      setfeaturedStatus(false);
    }
  };

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
      recommended: recommendedStatus,
      isFeatured: featuredStatus,
      rating: data.rating,
    };
    const toastId = toast.loading("Adding product");

    const res = await createProduct(newProduct)
      .unwrap()
      .catch((error) => {
        if (error) {
          toast.error(error.data.message, { id: toastId, duration: 2000 });
        }
      });

    if (res.success === true) {
      toast.success("Product Added Successfully", {
        id: toastId,
        duration: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:w-2/3 mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
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
      <label className="block my-2 font-bold text-gray-700">Description</label>
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
      <div className="flex max-sm:block justify-center items-center gap-5 my-5 md:px-32">
        <label className="block font-bold text-gray-700">Category</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Input className="max-sm:mb-4" variant="filled" {...field} />
          )}
        />
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
        )}
        <label className="block font-bold text-gray-700">Color</label>
        <Controller
          name="color"
          control={control}
          rules={{ required: "Color is required" }}
          render={({ field }) => <Input variant="filled" {...field} />}
        />
        {errors.color && (
          <p className="text-red-600 text-sm mt-1">{errors.color.message}</p>
        )}
      </div>

      <div className="flex max-sm:block justify-center items-center gap-5 mb-5">
        <label className="block mb-1 font-bold text-gray-700">Price</label>
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          defaultValue={3}
          render={({ field }) => (
            <InputNumber
              variant="filled"
              className="max-sm:w-2/3"
              min={1}
              max={500}
              {...field}
            />
          )}
        />
        {errors.price && (
          <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
        )}
        <label className="block mb-1 font-bold text-gray-700">Quantity</label>
        <Controller
          name="quantity"
          control={control}
          rules={{ required: "Quantity is required" }}
          defaultValue={3}
          render={({ field }) => (
            <InputNumber
              variant="filled"
              min={1}
              max={500}
              className="max-sm:w-2/3"
              {...field}
            />
          )}
        />
        {errors.quantity && (
          <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
        )}
        <label className="block mb-1 font-bold text-gray-700">Rating</label>
        <Controller
          name="rating"
          control={control}
          rules={{ required: "Rating is required" }}
          defaultValue={3}
          render={({ field }) => (
            <InputNumber
              className="max-sm:w-2/3"
              variant="filled"
              prefix={<StarFilled />}
              min={1}
              max={5}
              {...field}
            />
          )}
        />
        {errors.rating && (
          <p className="text-red-600 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      <label className="block mb-1 font-bold text-gray-700">ImageUrl</label>
      <Controller
        name="imageUrl"
        control={control}
        rules={{ required: "imageUrl is required" }}
        render={({ field }) => (
          <Input className="mb-4" variant="filled" {...field} />
        )}
      />
      {errors.imageUrl && (
        <p className="text-red-600 text-sm mt-1">{errors.imageUrl.message}</p>
      )}
      <label className="block mb-1 font-bold text-gray-700">
        How to Care : Header
      </label>
      <Controller
        name="howtocare.header"
        control={control}
        rules={{ required: "Header is required" }}
        render={({ field }) => (
          <Input className="mb-4" variant="filled" {...field} />
        )}
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
        render={({ field }) => <TextArea variant="filled" {...field} />}
      />
      {errors.howtocare?.description && (
        <p className="text-red-600 text-sm mt-1">
          {errors.howtocare.description.message}
        </p>
      )}
      <div className="mt-5">
        <label className="mb-1 mr-3 font-bold text-gray-700">
          Recommended :
        </label>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={updateRecommend}
          style={{ width: "50px" }}
        />
        <br />
        <label className="mb-1 mr-3 font-bold text-gray-700">Featured :</label>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={updateFeatured}
          style={{ width: "50px" }}
        />
      </div>

      <Button
        type="primary"
        size="large"
        className="mt-10 font-bold"
        htmlType="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default AddProductForm;
