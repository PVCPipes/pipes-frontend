import { useRouter } from "next/router";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const accessToken = localStorage.getItem("pipesAccessToken");
      if (!accessToken) {
        Router.replace("/login");
        return null;
      } else if (Router.pathname === "/login" && accessToken) {
        Router.replace("/home");
        return null;
      } else if (Router.pathname === "/") {
        Router.replace("/login");
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
