"use client";

import { Lesson, Unit as UnitType } from "@/db/schema";
import { UnitHeader } from "./UnitHeader";
import { LessonButton } from "./LessonButton";
import { useEffect, useState } from "react";

type Props = {
    id: number;
    order: number;
    title: string;
    description: string;
    lessons: Lesson[];
    activeLesson: Lesson | undefined; // Initial server-side active lesson (fallback)
    activeLessonPercentage: number;
};

export const Unit = ({
    id,
    order,
    title,
    description,
    lessons,
    activeLesson: initialActiveLesson,
    activeLessonPercentage,
}: Props) => {
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem("completedLessons");
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log("Unit mounted, completedLessons:", parsed);
            setCompletedLessons(parsed);
        } else {
            console.log("Unit mounted, no completedLessons found");
        }
    }, []);

    // If not mounted yet (SSR), use the initial props (which are likely all locked except first)
    // Once mounted, use the localStorage data

    return (
        <>
            <UnitHeader title={title} description={description} />
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson, index) => {
                    const isCompleted = isMounted
                        ? completedLessons.includes(lesson.id)
                        : lesson.completed; // Fallback to server state

                    // Check if previous lesson is completed to unlock this one
                    // For the very first lesson of the course (Unit 1, Lesson 1), it's always unlocked.
                    // For others, check if the previous lesson in the list (or previous unit's last lesson) is completed.
                    // Simplified logic: Find the first incomplete lesson across the whole course? 
                    // Actually, we only have access to THIS unit's lessons here.
                    // But we can check if THIS lesson is completed.

                    // Better logic:
                    // But we need to know about previous units too.
                    // For MVP: Let's just say if it's completed, it's completed.
                    // If it's NOT completed, check if the previous lesson ID is in completedLessons.
                    // This assumes sequential IDs which we have (1, 2, 3, 4, 5).

                    // Check if previous lesson is completed to unlock this one
                    // For the very first lesson of the course (Unit 1, Lesson 1), it's always unlocked.
                    // For others, check if the previous lesson in the list (or previous unit's last lesson) is completed.

                    // Correct logic:
                    // A lesson is unlocked if:
                    // 1. It is the first lesson of the entire course (id === 1)
                    // 2. OR the previous lesson (id - 1) is completed.

                    const previousLessonId = lesson.id - 1;
                    const isUnlocked = lesson.id === 1 || (isMounted && completedLessons.includes(previousLessonId));

                    // A lesson is current if:
                    // 1. It is unlocked AND
                    // 2. It is NOT completed.
                    const isCurrent = isUnlocked && !isCompleted;

                    // A lesson is locked if:
                    // 1. It is NOT unlocked AND
                    // 2. It is NOT completed.
                    const isLocked = !isUnlocked && !isCompleted;

                    console.log(`Lesson ${lesson.id}: completed=${isCompleted}, unlocked=${isUnlocked}, current=${isCurrent}, locked=${isLocked}`);

                    return (
                        <LessonButton
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length}
                            current={isCurrent}
                            locked={isLocked}
                            percentage={activeLessonPercentage}
                            title={lesson.title}
                        />
                    );
                })}
            </div>
        </>
    );
};
