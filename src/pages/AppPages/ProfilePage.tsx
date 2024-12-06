import { Button } from "@/components/ui/button";
import { doSignOut } from "@/firebase/auth";
const ProfilePage = () => {
  return (
    <div className="mt-20 w-full h-full">
      <span className="text-2xl">Edit </span>
      <span className="text-2xl text-primary dark:text-primaryDark">
        Profile
      </span>

      <div className="h-full flex">
        <Button
          className="absolute right-8 bottom-5"
          variant={"destructive"}
          onClick={doSignOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
