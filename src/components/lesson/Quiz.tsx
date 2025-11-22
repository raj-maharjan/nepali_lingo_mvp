"use client";

import { useState, useTransition } from "react";
import { Challenge as ChallengeType, ChallengeOption, Lesson } from "@/db/schema";
import { Header } from "./Header";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./Challenge";
import { Footer } from "./Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useSounds } from "@/hooks/use-sounds";

type Props = {
    initialLessonId: number;
    initialLessonChallenges: (ChallengeType & {
        challengeOptions: ChallengeOption[];
    })[];
    initialHearts: number;
    initialPercentage: number;
    userSubscription: any;
};

export const Quiz = ({
    initialLessonId,
    initialLessonChallenges,
    initialHearts,
    initialPercentage,
    userSubscription,
}: Props) => {
    console.log("Quiz initialLessonId:", initialLessonId);
    console.log("Quiz initialLessonChallenges:", initialLessonChallenges);
    const router = useRouter();
    const { width, height } = useWindowSize();
    const { playSound } = useSounds();

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | undefined>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none" | "completed">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        const currentChallenge = challenges[activeIndex];
        const currentOption = options.find((option) => option.id === selectedOption);

        if (!currentOption) return;

        if (status === "none") {
            if (currentOption.correct) {
                setStatus("correct");
                setPercentage((prev) => prev + 100 / challenges.length);
                playSound("correct");
            } else {
                setStatus("wrong");
                if (!userSubscription) {
                    setHearts((prev) => Math.max(prev - 1, 0));
                }
                playSound("wrong");
            }
            return;
        }

        if (status === "correct") {
            if (activeIndex === challenges.length - 1) {
                setStatus("completed");
                playSound("finish");
                // Save progress to localStorage
                const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
                if (!completedLessons.includes(initialLessonId)) {
                    completedLessons.push(initialLessonId);
                    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
                }
                return;
            }
            setActiveIndex((prev) => prev + 1);
            setSelectedOption(undefined);
            setStatus("none");
            return;
        }

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
    };

    const onSelect = (id: number) => {
        if (status !== "none") return;
        setSelectedOption(id);
    };

    if (!challenge || status === "completed") {
        return (
            <>
                {status === "completed" && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} tweenDuration={10000} />}
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/assets/finish.svg"
                        alt="Finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/assets/finish.svg"
                        alt="Finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br /> You&apos;ve completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <div className="rounded-xl border-2 bg-green-500 text-white p-4 font-bold w-full">
                            Total XP: 10
                        </div>
                        <div className="rounded-xl border-2 bg-orange-500 text-white p-4 font-bold w-full">
                            Hearts: {hearts}
                        </div>
                    </div>
                </div>
                <Footer
                    lessonId={initialLessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }

    const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question;

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={status !== "none"}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={!selectedOption && status === "none"}
                status={status}
                onCheck={onNext}
                lessonId={initialLessonId}
            />
        </>
    );
};
