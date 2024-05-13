"use client";
import clsx from "clsx";
import { NotebookPenIcon, TagsIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

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
        <Command className="rounded-lg border shadow-md">
          <CommandList>
            <CommandGroup>
              {links.map((link) => {
                return (
                  <Link href={link.href}>
                    <CommandItem key={link.name} className="flex gap-4">
                      {link.icon}
                      <span className="font-semibold">{link.name}</span>
                    </CommandItem>
                  </Link>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div className="w-full p-6 md:overflow-y-auto md:p-7">{children}</div>
    </div>
  );
}
