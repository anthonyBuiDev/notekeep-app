"use client";
import clsx from "clsx";
import {
  NotebookIcon,
  NotebookPenIcon,
  TagsIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Notes",
    href: "/notes",
    icon: <NotebookPenIcon />,
  },
  { name: "Label", href: "/label", icon: <TagsIcon /> },
  { name: "Trash", href: "/trash", icon: <TrashIcon /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="mt-6 w-full flex-none md:w-64">
        <div>
          <ul className="flex flex-col justify-between gap-3">
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-300 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3`,
                    {
                      "text-blue-1000 bg-slate-400": pathname === link.href,
                    },
                  )}
                >
                  <div className="w-6">{link.icon}</div>
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full p-6 md:overflow-y-auto md:px-6 md:py-12">
        {children}
      </div>
    </div>
  );
}
