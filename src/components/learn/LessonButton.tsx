"use client";

import Link from "next/link";
import { Check, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
    title: string;
};

export const LessonButton = ({
    id,
    index,
    totalCount,
    locked,
    current,
    percentage,
    title,
}: Props) => {
    const cycleLength = 8;
    const cycleIndex = index % cycleLength;

    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = 0;

    const isFirst = index === 0;
    const isLast = index === totalCount - 1;
    const isCompleted = !current && !locked;

    const Icon = isCompleted ? Check : Star;

    const href = isCompleted ? `/lesson/${id}` : `/lesson/${id}`;

    return (
        <div
            className="relative flex flex-col items-center"
            style={{
                right: `${rightPosition}px`,
                marginTop: isFirst && !isCompleted ? 60 : 24,
            }}
        >
            {/* Lesson Title Label */}
            <div className="absolute -top-8 whitespace-nowrap text-sm font-bold text-neutral-600 bg-white/90 px-3 py-1 rounded-full shadow-sm border border-neutral-200 z-10">
                {title}
                <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-white border-b border-r border-neutral-200 transform -translate-x-1/2 rotate-45"></div>
            </div>

            {locked ? (
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                                size="rounded"
                                variant="locked"
                                className="h-[70px] w-[70px] border-b-8"
                                asChild
                            >
                                <Link href={href} aria-disabled={locked} style={{ pointerEvents: locked ? 'none' : 'auto' }}>
                                    <Icon
                                        className={cn(
                                            "h-10 w-10",
                                            locked
                                                ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                                : "fill-primary-foreground text-primary-foreground",
                                            isCompleted && "fill-none stroke-[4]"
                                        )}
                                    />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Complete previous lesson to unlock</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : current ? (
                <div className="h-[102px] w-[102px] relative">
                    <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                        Start
                        <div
                            className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2 bg-transparent"
                            style={{ borderTopColor: "inherit" }} // Hack for triangle border
                        />
                        <div className="absolute left-1/2 -bottom-1.5 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-white transform -translate-x-1/2" />
                    </div>
                    <CircularProgressbarWithChildren
                        value={Number.isNaN(percentage) ? 0 : percentage}
                        styles={{
                            path: {
                                stroke: "#4ade80",
                            },
                            trail: {
                                stroke: "#e5e7eb",
                            },
                        }}
                    >
                        <Button
                            size="rounded"
                            variant={locked ? "locked" : "secondary"}
                            className="h-[70px] w-[70px] border-b-8"
                            asChild
                        >
                            <Link href={href}>
                                <Icon
                                    className={cn(
                                        "h-10 w-10",
                                        locked
                                            ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                            : "fill-primary-foreground text-primary-foreground",
                                        isCompleted && "fill-none stroke-[4]"
                                    )}
                                />
                            </Link>
                        </Button>
                    </CircularProgressbarWithChildren>
                </div>
            ) : (
                <Button
                    size="rounded"
                    variant={locked ? "locked" : "secondary"}
                    className="h-[70px] w-[70px] border-b-8"
                    asChild
                >
                    <Link href={href} aria-disabled={locked} style={{ pointerEvents: locked ? 'none' : 'auto' }}>
                        <Icon
                            className={cn(
                                "h-10 w-10",
                                locked
                                    ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                    : "fill-primary-foreground text-primary-foreground",
                                isCompleted && "fill-none stroke-[4]"
                            )}
                        />
                    </Link>
                </Button>
            )}
        </div>
    );
};
