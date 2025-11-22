import { getLesson, getCourseById } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "@/components/lesson/Quiz";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const LessonPage = async ({ params }: Props) => {
    const { id } = await params;
    const lessonId = Number(id);
    const lesson = await getLesson(lessonId);
    console.log("LessonPage lessonId:", lessonId);
    console.log("LessonPage lesson:", lesson);
    console.log("LessonPage challenges:", lesson?.challenges);

    // Mock user progress
    const userProgress = {
        hearts: 5,
        points: 100,
        hasActiveSubscription: false,
    };

    if (!lesson) {
        redirect("/learn");
    }

    const initialPercentage = 0;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={null} // Mock subscription
        />
    );
};

export default LessonPage;
