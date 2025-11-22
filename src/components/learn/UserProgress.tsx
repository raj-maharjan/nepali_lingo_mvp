import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfinityIcon, Heart, Zap } from "lucide-react";
import Image from "next/image";
import { Course } from "@/db/schema";

type Props = {
    activeCourse: Course;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const UserProgress = ({
    activeCourse,
    points,
    hearts,
    hasActiveSubscription,
}: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Button variant="ghost" className="cursor-default hover:bg-transparent">
                <Image
                    src={activeCourse.imageSrc}
                    alt={activeCourse.title}
                    className="rounded-md border"
                    width={32}
                    height={32}
                />
            </Button>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image
                        src="/assets/points.svg"
                        height={28}
                        width={28}
                        alt="Points"
                        className="mr-2"
                    />
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Heart className="mr-2 h-5 w-5 fill-rose-500" />
                    {hasActiveSubscription ? (
                        <InfinityIcon className="h-4 w-4 stroke-[3]" />
                    ) : (
                        hearts
                    )}
                </Button>
            </Link>
        </div>
    );
};
