"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    icon: LucideIcon;
    href: string;
};

export const SidebarItem = ({ label, icon: Icon, href }: Props) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Button
            variant={active ? "sidebarOutline" : "sidebar"}
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Icon className="mr-5 h-8 w-8" />
                {label}
            </Link>
        </Button>
    );
};
