import {
  AuthCard,
  AuthCardContent,
  AuthCardDescription,
  AuthCardFooter,
  AuthCardHeader,
  AuthCardTitle,
} from "@/components/auth/auth-card";
import { OrSeparator } from "@/components/ui/global";
import { useDragAnimation } from "@/hooks/use-drag-animation";

function Body({
  children,
  title,
  description,
  separator,
  footer,
  effect = null,
  beforeContent = null,
}) {
  const { ref: contentWrapperRef, prev: prevChildren } = useDragAnimation(
    children,
    effect,
  );
  const { ref: mainWrapperRef } = useDragAnimation(children, title);

  const BeforeContent = beforeContent
    ? () => <AuthCardContent>{beforeContent}</AuthCardContent>
    : () => <></>;

  return (
    <AuthCard refVar={mainWrapperRef}>
      <AuthCardHeader>
        <AuthCardTitle>{title}</AuthCardTitle>
        <AuthCardDescription>{description}</AuthCardDescription>
      </AuthCardHeader>
      <BeforeContent />
      <AuthCardContent refVar={contentWrapperRef}>
        {prevChildren}
      </AuthCardContent>
      {separator && <OrSeparator className="px-6" />}
      {footer.display && <AuthCardFooter>{footer.content}</AuthCardFooter>}
    </AuthCard>
  );
}

export default Body;
