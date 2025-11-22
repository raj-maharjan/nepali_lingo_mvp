import { Progress } from "@/components/ui/progress";
import { X, InfinityIcon, Heart } from "lucide-react";
import Image from "next/image";
// import { useExitModal } from "@/store/use-exit-modal"; 
import { Button } from "@/components/ui/button";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
};

export const Header = ({
    hearts,
    percentage,
    hasActiveSubscription,
}: Props) => {
    // const { open } = useExitModal(); // Placeholder for now

    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            {/* Placeholder for Exit Modal Trigger */}
            <a href="/learn">
                <X className="text-slate-500 hover:opacity-75 transition cursor-pointer" />
            </a>
            <Progress value={percentage} />
            <div className="text-rose-500 flex items-center font-bold">
                <Heart className="h-6 w-6 mr-2 fill-rose-500" />
                {hasActiveSubscription ? (
                    <InfinityIcon className="h-6 w-6 stroke-[3]" />
                ) : (
                    hearts
                )}
            </div>
        </header>
    );
};
