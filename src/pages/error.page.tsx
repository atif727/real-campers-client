import { Button } from "antd";
import { NavLink, useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="text-4xl text-center flex flex-col justify-center items-center h-[100vh]">
      <h1 className="mb-2">Oops!</h1>
      <p>
        Route Error : <i>{error.statusText || error.message}</i>
      </p>
      <Button size="large" className="mt-4"><NavLink to={"/home"}>Go back to Home</NavLink></Button>
    </div>
  );
}