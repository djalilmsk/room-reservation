import { SecurityForm } from "@/components/dashboard/forms/security-form";

function Security() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Security Settings</h1>
      <SecurityForm />
    </div>
  );
}

export default Security;
