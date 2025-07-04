
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="flex justify-between items-center w-full  py-4 mt-10">
      {/* <h2 className=" uppercase text-2xl md:text-4xl  max-w-2xl font-normal tracking-wider">
        {title}
      </h2> */}

      {tags && (
        <div className=" ">
          <Link href="/tag" className="text-xs md:text-sm mt-2 hover:text-purple-400 tracking-wider border border-purple-400 px-4 py-2 rounded-full mt-4">Tags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
