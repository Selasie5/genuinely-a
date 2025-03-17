import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import { BackArrowIcon } from "./Icons";

const font = Bricolage_Grotesque({ weight: "400", subsets: ["latin"] });

const CmsNavbar = () => {
  return (
    <div className="flex justify-between items-center py-1 px-5">
      <Link href="/">
        <BackArrowIcon />
      </Link>

      <div className={`${font.className} text-3xl dark:text-amber-50`}>
        Genuinely A
        <span className="text-purple-500">Admin</span>
      </div>
    </div>
  );
};

export default CmsNavbar;