import Header from "@/components/auth/auth-header";
import Body from "@/components/auth/auth-body";
import Footer from "@/components/auth/auth-footer";

function AuthLayout() {
  return (
    <div className=" flex min-h-dvh flex-col justify-between">
      <div className="h-full">
        <Header />
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default AuthLayout;