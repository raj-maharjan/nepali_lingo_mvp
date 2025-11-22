import { getUnits, getCourseById } from "@/db/queries";
import { UnitList } from "@/components/learn/UnitList";
import { StickyWrapper } from "@/components/layout/StickyWrapper";
import { FeedWrapper } from "@/components/layout/FeedWrapper";
import { UserProgress } from "@/components/learn/UserProgress";

const LearnPage = async () => {
    const units = await getUnits(1); // Hardcoded course ID 1 for now
    const course = await getCourseById(1);

    // Mock active lesson logic for now
    // In a real app, we'd check user progress
    // For MVP, let's say the first incomplete lesson is active
    let activeLesson = undefined;
    let activeLessonPercentage = 0;

    for (const unit of units) {
        for (const lesson of unit.lessons) {
            if (!lesson.completed) {
                activeLesson = lesson;
                break;
            }
        }
        if (activeLesson) break;
    }

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
                <UnitList
                    units={units}
                    activeLesson={activeLesson}
                    activeLessonPercentage={activeLessonPercentage}
                />
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
