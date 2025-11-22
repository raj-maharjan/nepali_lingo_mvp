"use client";

import { useState, useEffect } from "react";
import { Unit } from "./Unit";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    units: any[]; // Using any for now to match the structure passed from page.tsx
    activeLesson: any;
    activeLessonPercentage: number;
};

export const UnitList = ({ units, activeLesson, activeLessonPercentage }: Props) => {
    const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem("completedLessons");
        if (saved) {
            setCompletedLessons(JSON.parse(saved));
        }
    }, []);

    const currentUnit = units[currentUnitIndex];

    if (!currentUnit) {
        return <div>No units found.</div>;
    }

    const isFirstUnit = currentUnitIndex === 0;
    const isLastUnit = currentUnitIndex === units.length - 1;

    // Check if current unit is completed to unlock next
    const currentUnitLessons = currentUnit.lessons;
    const isCurrentUnitCompleted = currentUnitLessons.every((lesson: any) =>
        completedLessons.includes(lesson.id)
    );

    const handleNext = () => {
        if (!isLastUnit && isCurrentUnitCompleted) {
            setCurrentUnitIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstUnit) {
            setCurrentUnitIndex((prev) => prev - 1);
        }
    };

    if (!isMounted) {
        return null; // Prevent hydration mismatch
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="mb-10 w-full">
                <Unit
                    id={currentUnit.id}
                    order={currentUnit.order}
                    description={currentUnit.description}
                    title={currentUnit.title}
                    lessons={currentUnit.lessons}
                    activeLesson={activeLesson}
                    activeLessonPercentage={activeLessonPercentage}
                />
            </div>

            <div className="flex justify-between w-full max-w-[500px] px-4 pb-10">
                <Button
                    variant="secondary"
                    onClick={handlePrev}
                    disabled={isFirstUnit}
                    className={isFirstUnit ? "invisible" : ""}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Unit
                </Button>

                {isLastUnit || !isCurrentUnitCompleted ? (
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <span className="inline-block">
                                    <Button
                                        variant={isCurrentUnitCompleted ? "secondary" : "locked"}
                                        onClick={handleNext}
                                        disabled={isLastUnit || !isCurrentUnitCompleted}
                                        className={isLastUnit ? "invisible" : ""}
                                    >
                                        Next Unit
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p>Complete current unit to unlock</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <Button
                        variant="secondary"
                        onClick={handleNext}
                        disabled={isLastUnit}
                        className={isLastUnit ? "invisible" : ""}
                    >
                        Next Unit
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};
