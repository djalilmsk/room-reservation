import { Loader } from "lucide-react";

const buttonLabel = (isLoading, initialStatus) => {
  const label = {
    true: (
      <div className="flex gap-2">
        <Loader className="animate-spin" /> <span>Loading...</span>
      </div>
    ),
    false: initialStatus,
  }[isLoading];

  return label;
};

export { buttonLabel };
