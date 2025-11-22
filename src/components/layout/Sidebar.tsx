"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { Loader, Home, Trophy, Zap, ShoppingBag, Globe, Book } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Globe className="h-10 w-10 text-green-600" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            NepalLingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" icon={Home} />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          icon={Trophy}
        />
        <SidebarItem
          label="Quests"
          href="/quests"
          icon={Zap}
        />
        <SidebarItem label="Shop" href="/shop" icon={ShoppingBag} />
      </div>
      <div className="p-4">
        {/* Placeholder for User Profile */}
        <div className="w-full h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
          User
        </div>
      </div>
    </div>
  );
};
