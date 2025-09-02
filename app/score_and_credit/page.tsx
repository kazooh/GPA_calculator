//score and credit
import ScoreAndCreditForm from "./score_and_credit";
import { redirect } from "next/navigation";

export default function ScoreAndCreditPage({ searchParams }: { searchParams: { count?: string } }) {
    const count = parseInt(searchParams.count || "0");

    if (!count || count < 1) {
        redirect("/")
    }

    return <ScoreAndCreditForm subjectCount={count}/>
}//