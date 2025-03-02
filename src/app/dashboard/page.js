import SidebarWrapper from "@/components/SidebarWrapper";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@/model/user-model";
import RegistrationFormSocial from "@/components/RegistrationFormSocial";
import UploadFileUi from "./upload-files/Ui";
import UploadFileUi10 from "./upload-files/Ui10";
import { checkSubscription } from "@/lib/subscription";

const HomePage = async () => {
  const isPro = await checkSubscription();
  const session = await auth();
  if (!session?.user) redirect("/");
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const user = await User.findOne({ email }).select("-password"); // Exclude password for security
  if (!user) {
    return <RegistrationFormSocial session={session} />;
  } else {
    return (
      <div className="md:flex">
        <SidebarWrapper session={session} />

        {isPro ? <UploadFileUi /> : <UploadFileUi10 />}
      </div>
    );
  }
};

export default HomePage;
