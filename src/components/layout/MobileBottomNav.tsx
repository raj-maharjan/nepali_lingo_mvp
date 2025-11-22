"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Zap, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileBottomNav = () => {
    const pathname = usePathname();

    const routes = [
        {
            label: "Learn",
            href: "/learn",
            icon: Home,
        },
        {
            label: "Leaderboard",
            href: "/leaderboard",
            icon: Trophy,
        },
        {
            label: "Quests",
            href: "/quests",
            icon: Zap,
        },
        {
            label: "Shop",
            href: "/shop",
            icon: ShoppingBag,
        },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 w-full bg-white border-t-2 h-[80px] flex items-center justify-around z-50">
            {routes.map((route) => {
                const active = pathname === route.href;
                const Icon = route.icon;

                return (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-y-1 text-slate-500",
                            active && "text-green-600"
                        )}
                    >
                        <Icon className="h-6 w-6" />
                        <span className="text-xs font-bold uppercase">{route.label}</span>
                    </Link>
                );
            })}
        </div>
    );
};
