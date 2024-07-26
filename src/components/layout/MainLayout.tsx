import React from "react";
import { Button, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { userSidebarItems } from "../../routes/user.routes";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const { Header, Content } = Layout;

const App: React.FC = () => {
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
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
