import { Button } from "@/components/ui/button";
import { Page } from "@/components/ui/page";
import { SectionTitle } from "@/components/ui/section";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center space-y-4">
        <SectionTitle>Page Not Found</SectionTitle>
        <Link to="/">
          <Button variant="link">Home</Button>
        </Link>
      </div>
    </Page>
  );
}

export default PageNotFound;
