import Link from "next/link";
export default function Failure() {

    return (
        <div className="flex items-center flex-col min-h-screen">
            <h1 className="text-white font-bold">YOUR PAYMENT FAILED</h1>
            <Link href="/courses" className="bg-primary-green text-white p-3 rounded-lg no-underline font-bold hover:drop-shadow-lg">Courses</Link>
        </div>
    )
}