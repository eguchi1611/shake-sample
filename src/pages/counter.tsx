import StatusViewer from "@/components/status-viewer";
import UserProrivder from "@/user-provider";

export default function AppPage() {
  return (
    <UserProrivder>
      <StatusViewer />
    </UserProrivder>
  );
}
