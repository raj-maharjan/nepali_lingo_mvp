import Image from "next/image";
import { StickyWrapper } from "@/components/layout/StickyWrapper";
import { FeedWrapper } from "@/components/layout/FeedWrapper";
import { UserProgress } from "@/components/learn/UserProgress";
import { getCourseById } from "@/db/queries";
import { Button } from "@/components/ui/button";

const ShopPage = async () => {
    const course = await getCourseById(1);

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
                        src="/assets/shop.svg" // Placeholder
                        alt="Shop"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuff.
                    </p>
                    <div className="grid w-full grid-cols-1 gap-4 px-4">
                        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                            <Image
                                src="/assets/heart.svg" // Placeholder
                                alt="Heart"
                                height={60}
                                width={60}
                            />
                            <div className="flex-1">
                                <p className="text-neutral-700 text-base lg:text-xl font-bold">
                                    Refill Hearts
                                </p>
                            </div>
                            <Button>
                                <Image
                                    src="/assets/points.svg"
                                    alt="Points"
                                    height={20}
                                    width={20}
                                />
                                <span className="ml-2">50</span>
                            </Button>
                        </div>
                        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                            <Image
                                src="/assets/unlimited.svg" // Placeholder
                                alt="Unlimited"
                                height={60}
                                width={60}
                            />
                            <div className="flex-1">
                                <p className="text-neutral-700 text-base lg:text-xl font-bold">
                                    Unlimited Hearts
                                </p>
                            </div>
                            <Button variant="super">
                                Upgrade
                            </Button>
                        </div>
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopPage;
