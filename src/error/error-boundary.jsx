import { Button } from "@/components/ui/button";
import { Page } from "@/components/ui/page";
import { SectionTitle } from "@/components/ui/section";
import { Link } from "react-router-dom";

function ErrorBoundary() {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center space-y-4">
        <SectionTitle>Something went wrong</SectionTitle>
        <Link to="/">
          <Button variant="link">Return Home</Button>
        </Link>
      </div>
    </Page>
  );
}

export default ErrorBoundary;
