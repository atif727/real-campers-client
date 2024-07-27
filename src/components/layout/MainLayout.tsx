import React, { useState } from "react";
import { Button, Divider, Drawer, FloatButton, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { userSidebarItems } from "../../routes/user.routes";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSingleUserQuery } from "../../redux/features/auth/getUser";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useAppSelector(useCurrentUser);
  let buttonComponentsForUser;
  let hidden;
  const username = user?.name;
  const { data } = useSingleUserQuery(user?.email as string);
  const userData = data?.data;
  if (user === null || user === undefined) {
    hidden = "hidden";
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
    hidden = "";
    buttonComponentsForUser = (
      <>
        <Button onClick={handleLogout}>Logout</Button>
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
        <Button onClick={showDrawer} className={`ml-3 ${hidden}`} type="text">
          {username}
        </Button>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <FloatButton.BackTop />
      <Drawer
        title={`${username}'s Profile`}
        onClose={onClose}
        open={open}
      >
        <div className="text-2xl text-center">
          <div>
            <b>{userData?.name}</b>
            <Divider style={{ fontSize: "20px" }}>Name</Divider>
          </div>
          <div>
            <b>{userData?.email}</b>
            <Divider style={{ fontSize: "20px" }}>Email</Divider>
          </div>
          <div>
            <b>{userData?.address}</b>
            <Divider style={{ fontSize: "20px" }}>Address</Divider>
          </div>
          <div>
            <b>{userData?.phonenumber}</b>
            <Divider style={{ fontSize: "20px" }}>Phone Number</Divider>
          </div>
        </div>
      </Drawer>
    </Layout>
  );
};

export default App;
