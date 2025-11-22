import Image from "next/image";
import { StickyWrapper } from "@/components/layout/StickyWrapper";
import { FeedWrapper } from "@/components/layout/FeedWrapper";
import { UserProgress } from "@/components/learn/UserProgress";
import { getCourseById } from "@/db/queries";
import { Progress } from "@/components/ui/progress";

const QuestsPage = async () => {
    const course = await getCourseById(1);

    const quests = [
        {
            title: "Earn 20 XP",
            value: 20,
            max: 20,
            imageSrc: "/assets/points.svg",
        },
        {
            title: "Complete 1 Lesson",
            value: 1,
            max: 1,
            imageSrc: "/assets/finish.svg",
        },
        {
            title: "Maintain a 3-day streak",
            value: 1,
            max: 3,
            imageSrc: "/assets/finish.svg", // Placeholder
        },
        {
            title: "Learn 5 new words",
            value: 3,
            max: 5,
            imageSrc: "/assets/nepal_flag.svg",
        },
    ];

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={course!}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/assets/quests.svg" // Placeholder
                        alt="Quests"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Quests
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete quests by earning points and learning new things!
                    </p>

                    <ul className="w-full">
                        {quests.map((quest) => {
                            const progress = (quest.value / quest.max) * 100;

                            return (
                                <div
                                    className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                    key={quest.title}
                                >
                                    <Image
                                        src={quest.imageSrc}
                                        alt={quest.title}
                                        width={60}
                                        height={60}
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">
                                            {quest.title}
                                        </p>
                                        <Progress value={progress} className="h-3" />
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsPage;
