import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";

type Props = {
    title: string;
    description: string;
};

export const UnitHeader = ({ title, description }: Props) => {
    return (
        <div className="flex items-center justify-between relative bg-green-500 p-5 rounded-xl text-white overflow-hidden mb-10">
            <div className="space-y-1">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-lg">{description}</p>
            </div>
            <Link href="/guidebook">
                <Button size="lg" variant="secondaryOutline" className="hidden lg:flex border-2 border-b-4 active:border-b-2">
                    <NotebookText className="mr-2" />
                    Guidebook
                </Button>
            </Link>
        </div>
    );
};
