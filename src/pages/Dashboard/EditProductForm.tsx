import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, Input, InputNumber, Result, Spin, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CheckOutlined, CloseOutlined, StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateProductMutation } from "../../redux/features/products/updateProduct";
import { useSingleProductQuery } from "../../redux/features/products/singleproduct";
import { NavLink, useNavigate } from "react-router-dom";
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

type EditProductFormProps = {
  productId: string;
};

const EditProductForm: React.FC<EditProductFormProps> = ({ productId }) => {
    const navigate = useNavigate();
  const { data, isLoading } = useSingleProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();

  if (data === undefined || data === null) {
    return (
      <Result
        status="error"
        title="Product Doesn't Exist or Server Error"
        subTitle="Please check the product you're searching for"
        extra={[
          <NavLink to={"/home"}>
            <Button type="primary">Go back to home</Button>
          </NavLink>,
          <NavLink to={"/dashboard"}>
            <Button type="primary">Go back to dashboard</Button>
          </NavLink>,
        ]}
      ></Result>
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin />
      </div>
    );
  }
  const TheProduct: productType = data.data;

  const [recommendedStatus, setrecommendedStatus] = useState(
    TheProduct.recommended
  );
  const [featuredStatus, setfeaturedStatus] = useState<true | false>(
    TheProduct.isFeatured
  );

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<productType>({
    defaultValues: {
      name: TheProduct.name,
      description: TheProduct.description,
      category: TheProduct.category,
      price: TheProduct.price,
      color: TheProduct.color,
      quantity: TheProduct.quantity,
      imageUrl: TheProduct.imageUrl,
      howtocare: {
        header: TheProduct.howtocare.header,
        description: TheProduct.howtocare.description,
      },
      recommended: recommendedStatus,
      isFeatured: featuredStatus,
      rating: TheProduct.rating,
    },
  });

  const watchedRecommended = watch("recommended", TheProduct.recommended);
  const watchedFeatured = watch("isFeatured", TheProduct.isFeatured);

  useEffect(() => {
    setrecommendedStatus(watchedRecommended);
  }, [watchedRecommended]);

  useEffect(() => {
    setfeaturedStatus(watchedFeatured);
  }, [watchedFeatured]);

  const handleRecommendChange = (checked: boolean) => {
    setValue("recommended", checked);
  };

  const handleFeaturedChange = (checked: boolean) => {
    setValue("isFeatured", checked);
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
    console.log(newProduct);
    const toastId = toast.loading("Adding product");
    try {
      const prop = { body: newProduct, id: productId };
      const res = await updateProduct(prop)
        .unwrap()
        .catch((error) => {
          if (error) {
            toast.error(error.data.message, { id: toastId, duration: 2000 });
          }
        });
      if (res.success === true) {
        toast.success("Product Updated Successfully", {
          id: toastId,
          duration: 2000,
        });
        navigate("/dashboard")
      }
    //   console.log(res);
    } catch (err) {
      toast.error("something went wrong", { id: toastId });
      console.log(err);
    }
  };

  return (
    <div>
      <Alert
        className="text-center font-bold md:mb-3 max-sm:p-3"
        message="Do not keep any fields empty, if you accidentally change something, just undo it or change according to your need, also reload after submitting your changes"
        type="warning"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:w-2/3 mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
      >
        <label className="block mb-1 font-bold text-gray-700">Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <Input defaultValue={TheProduct.name} variant="filled" {...field} />
          )}
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
          render={({ field }) => (
            <TextArea
              defaultValue={TheProduct.description}
              variant="filled"
              {...field}
            />
          )}
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
              <Input
                className="max-sm:mb-4"
                defaultValue={TheProduct.category}
                variant="filled"
                {...field}
              />
            )}
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
            render={({ field }) => (
              <Input
                defaultValue={TheProduct.color}
                variant="filled"
                {...field}
              />
            )}
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
            defaultValue={TheProduct.price}
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
            defaultValue={TheProduct.quantity}
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
            <p className="text-red-600 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
          <label className="block mb-1 font-bold text-gray-700">Rating</label>
          <Controller
            name="rating"
            control={control}
            rules={{ required: "Rating is required" }}
            defaultValue={TheProduct.rating}
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
            <Input
              className="mb-4"
              defaultValue={TheProduct.imageUrl}
              variant="filled"
              {...field}
            />
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
            <Input
              className="mb-4"
              defaultValue={TheProduct.howtocare.header}
              variant="filled"
              {...field}
            />
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
          render={({ field }) => (
            <TextArea
              defaultValue={TheProduct.howtocare.description}
              variant="filled"
              {...field}
            />
          )}
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
            defaultChecked={recommendedStatus}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleRecommendChange}
            style={{ width: "50px" }}
          />
          <br />
          <label className="mb-1 mr-3 font-bold text-gray-700">
            Featured :
          </label>
          <Switch
            defaultChecked={featuredStatus}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleFeaturedChange}
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
    </div>
  );
};

export default EditProductForm;
