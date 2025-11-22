import { StickyWrapper } from "@/components/layout/StickyWrapper";
import { FeedWrapper } from "@/components/layout/FeedWrapper";
import { UserProgress } from "@/components/learn/UserProgress";
import { getCourseById } from "@/db/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GuidebookPage = async () => {
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
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Guidebook
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Key concepts for learning Nepali.
                    </p>

                    <div className="w-full space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>The Alphabet (Devanagari)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Nepali uses the Devanagari script, same as Hindi. It has 36 consonants and 12 vowels.</p>
                                <div className="mt-4 grid grid-cols-4 gap-2 text-center font-bold text-xl">
                                    <div className="p-2 border rounded">क (ka)</div>
                                    <div className="p-2 border rounded">ख (kha)</div>
                                    <div className="p-2 border rounded">ग (ga)</div>
                                    <div className="p-2 border rounded">घ (gha)</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Grammar</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Nepali sentence structure is Subject-Object-Verb (SOV).</p>
                                <p className="mt-2 italic">Example: "I rice eat" (Ma bhaat khanchu)</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Greetings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Namaste</strong>: Hello / I bow to you</li>
                                    <li><strong>Dhanyabad</strong>: Thank you</li>
                                    <li><strong>Subha Ratri</strong>: Good night</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Numbers (1-10)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex justify-between border-b p-2"><span>1</span> <span className="font-bold">Ek (एक)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>2</span> <span className="font-bold">Dui (दुई)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>3</span> <span className="font-bold">Teen (तीन)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>4</span> <span className="font-bold">Chaar (चार)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>5</span> <span className="font-bold">Paanch (पाँच)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>6</span> <span className="font-bold">Chha (छ)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>7</span> <span className="font-bold">Saat (सात)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>8</span> <span className="font-bold">Aath (आठ)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>9</span> <span className="font-bold">Nau (नौ)</span></div>
                                    <div className="flex justify-between border-b p-2"><span>10</span> <span className="font-bold">Das (दश)</span></div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Common Phrases</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex flex-col"><span className="font-bold">What is your name?</span> <span className="text-muted-foreground">Tapai ko naam ke ho?</span></li>
                                    <li className="flex flex-col"><span className="font-bold">My name is...</span> <span className="text-muted-foreground">Mero naam ... ho.</span></li>
                                    <li className="flex flex-col"><span className="font-bold">How are you?</span> <span className="text-muted-foreground">Tapai lai kasto chha?</span></li>
                                    <li className="flex flex-col"><span className="font-bold">I am fine.</span> <span className="text-muted-foreground">Ma sanchai chhu.</span></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default GuidebookPage;
