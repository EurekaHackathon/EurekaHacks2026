export default function ResumePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
            <div>
                <h1 className="text-4xl font-bold text-[var(--neon-yellow)]">You found the secret page!</h1>
                <h2 className="text-3xl font-semibold text-gray-100 mt-2">congratulations I guess.</h2>
            </div>
            <p className="text-gray-400 text-lg">jamie was here!</p>
            <p className="text-[#0a0a0a] text-sm select-text" aria-hidden="true">eurekahacks.ca/pink</p>
        </div>
    );
}
