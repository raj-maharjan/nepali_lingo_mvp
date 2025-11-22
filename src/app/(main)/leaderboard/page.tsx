import Image from "next/image";
import { StickyWrapper } from "@/components/layout/StickyWrapper";
import { FeedWrapper } from "@/components/layout/FeedWrapper";
import { UserProgress } from "@/components/learn/UserProgress";
import { getCourseById } from "@/db/queries";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const LeaderboardPage = async () => {
    const course = await getCourseById(1);

    const leaderboardData = [
        {
            userId: "user-1",
            userName: "Ram Bahadur",
            userImageSrc: "/assets/man.svg",
            points: 120,
        },
        {
            userId: "user-2",
            userName: "Sita Kumari",
            userImageSrc: "/assets/woman.svg", // Placeholder, might not exist yet
            points: 90,
        },
        {
            userId: "user-me",
            userName: "You",
            userImageSrc: "/assets/mascot.svg",
            points: 100,
        },
        {
            userId: "user-3",
            userName: "Hari Krishna",
            userImageSrc: null,
            points: 85,
        },
    ].sort((a, b) => b.points - a.points);

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
                        src="/assets/leaderboard.svg" // Placeholder
                        alt="Leaderboard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        See where you stand among other learners in the community.
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {leaderboardData.map((user, index) => (
                        <div
                            key={user.userId}
                            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                        >
                            <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                            <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                                <AvatarImage
                                    src={user.userImageSrc || ""}
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-white font-bold">
                                    {user.userName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <p className="font-bold text-neutral-800 flex-1">
                                {user.userName}
                            </p>
                            <p className="text-muted-foreground">
                                {user.points} XP
                            </p>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardPage;
