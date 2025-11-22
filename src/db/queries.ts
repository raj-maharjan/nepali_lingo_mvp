import { courses } from "./seed";
import { Course, Unit, Lesson } from "./schema";

export const getCourses = async (): Promise<Course[]> => {
    return courses;
};

export const getCourseById = async (courseId: number): Promise<Course | undefined> => {
    return courses.find((c) => c.id === courseId);
};

export const getUnits = async (courseId: number): Promise<Unit[]> => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.units : [];
};

export const getLesson = async (lessonId: number): Promise<Lesson | undefined> => {
    for (const course of courses) {
        for (const unit of course.units) {
            const lesson = unit.lessons.find((l) => l.id === lessonId);
            if (lesson) {
                return lesson;
            }
        }
    }
    return undefined;
};
