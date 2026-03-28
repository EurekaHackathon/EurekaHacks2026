import { Icon } from "@iconify/react";

const PX_PER_HOUR = 80;
const PX_PER_MINUTE = PX_PER_HOUR / 60;

function at(day, hour, minute = 0) {
    const year = 2025;
    const month = 0; // January
    const date = day === "fri" ? 3 : 4; // Fri Jan 3, Sat Jan 4
    return new Date(year, month, date, hour, minute, 0, 0);
}

const SCHEDULE_START = at("fri", 16, 0);
const SCHEDULE_END = at("sat", 22, 0);
const TOTAL_MINUTES = (SCHEDULE_END.getTime() - SCHEDULE_START.getTime()) / 60000;
const TOTAL_HEIGHT = TOTAL_MINUTES * PX_PER_MINUTE;

const columns = [
    {
        id: "food",
        label: "Food",
        eventClasses: "bg-emerald-500/15 border-emerald-400/40 text-emerald-100",
        headerClasses: "text-emerald-300",
    },
    {
        id: "workshops",
        label: "Workshops",
        eventClasses: "bg-sky-500/15 border-sky-400/40 text-sky-100",
        headerClasses: "text-sky-300",
    },
    {
        id: "events",
        label: "Events",
        eventClasses: "bg-violet-500/15 border-violet-400/40 text-violet-100",
        headerClasses: "text-violet-300",
    },
];

const scheduleItems = [
    // Food
    { id: 1, column: "food", title: "Dinner", location: "Main Hall", start: at("fri", 17, 30), end: at("fri", 19, 0) },
    { id: 2, column: "food", title: "Midnight Snacks", location: "Main Hall", start: at("fri", 23, 45), end: at("sat", 1, 15) },
    { id: 3, column: "food", title: "Breakfast", location: "Main Hall", start: at("sat", 8, 30), end: at("sat", 10, 0) },
    { id: 4, column: "food", title: "Lunch", location: "Main Hall", start: at("sat", 13, 0), end: at("sat", 14, 0) },
    { id: 5, column: "food", title: "Dinner", location: "Main Hall", start: at("sat", 18, 30), end: at("sat", 20, 0) },

    // Workshops
    { id: 6, column: "workshops", title: "Intro to Hardware", location: "Room A", start: at("fri", 19, 15), end: at("fri", 20, 45) },
    { id: 7, column: "workshops", title: "React Sprint", location: "Room B", start: at("sat", 10, 30), end: at("sat", 12, 15) },
    { id: 8, column: "workshops", title: "Figma Jam", location: "Room C", start: at("sat", 11, 5), end: at("sat", 11, 50) },
    { id: 9, column: "workshops", title: "AI Lab", location: "Lab 1", start: at("sat", 14, 5), end: at("sat", 15, 35) },

    // Events
    { id: 10, column: "events", title: "Opening Ceremony", location: "Auditorium", start: at("fri", 17, 0), end: at("fri", 18, 0) },
    { id: 11, column: "events", title: "Team Formation", location: "Main Hall", start: at("fri", 18, 10), end: at("fri", 19, 0) },
    { id: 12, column: "events", title: "Mini Games", location: "Courtyard", start: at("fri", 21, 0), end: at("fri", 22, 0) },
    { id: 13, column: "events", title: "Midnight Challenge", location: "Main Hall", start: at("sat", 0, 20), end: at("sat", 1, 30) },
    { id: 14, column: "events", title: "Project Expo", location: "Exhibition Hall", start: at("sat", 19, 30), end: at("sat", 21, 0) },
    { id: 15, column: "events", title: "Closing Ceremony", location: "Auditorium", start: at("sat", 21, 15), end: at("sat", 22, 0) },
];

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function minutesBetween(start, end) {
    return (end.getTime() - start.getTime()) / 60000;
}

function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function formatTimelineLabel(date, includeDay = false) {
    if (!includeDay) return formatTime(date);

    return date.toLocaleString([], {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
    });
}

// Simple overlap layout within a single column
function layoutColumnEvents(items) {
    const sorted = [...items].sort((a, b) => a.start - b.start);
    const positioned = [];

    let cluster = [];
    let clusterEnd = -Infinity;

    function flushCluster() {
        if (!cluster.length) return;

        const laneEndTimes = [];
        const withLanes = cluster.map((item) => {
            const startTime = item.start.getTime();

            let lane = laneEndTimes.findIndex((endTime) => startTime >= endTime);
            if (lane === -1) {
                lane = laneEndTimes.length;
                laneEndTimes.push(item.end.getTime());
            } else {
                laneEndTimes[lane] = item.end.getTime();
            }

            return { ...item, lane };
        });

        const laneCount = laneEndTimes.length;

        positioned.push(
            ...withLanes.map((item) => ({
                ...item,
                laneCount,
            }))
        );

        cluster = [];
        clusterEnd = -Infinity;
    }

    for (const item of sorted) {
        const startTime = item.start.getTime();
        const endTime = item.end.getTime();

        if (!cluster.length) {
            cluster = [item];
            clusterEnd = endTime;
            continue;
        }

        if (startTime < clusterEnd) {
            cluster.push(item);
            clusterEnd = Math.max(clusterEnd, endTime);
        } else {
            flushCluster();
            cluster = [item];
            clusterEnd = endTime;
        }
    }

    flushCluster();
    return positioned;
}

export default function SchedulePage() {
    const hourLines = Array.from({ length: TOTAL_MINUTES / 60 + 1 }, (_, i) =>
        addMinutes(SCHEDULE_START, i * 60)
    );

    const halfHourLines = Array.from({ length: TOTAL_MINUTES / 30 + 1 }, (_, i) =>
        addMinutes(SCHEDULE_START, i * 30)
    );

    return (
        <div className="p-6 pt-16 lg:pt-6">
            <h1 className="text-3xl font-bold text-secondary-50 mb-2">Schedule</h1>
            <p className="text-secondary-300 mb-6">Friday 5:00 PM - Saturday 10:00 PM</p>

            <div className="overflow-x-auto">
                <div className="min-w-[950px]">
                    <div className="grid grid-cols-[88px_repeat(3,minmax(0,1fr))] mb-2">
                        <div />
                        {columns.map((column) => (
                            <div
                                key={column.id}
                                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide ${column.headerClasses}`}
                            >
                                {column.label}
                            </div>
                        ))}
                    </div>

                    <div className="grid px-2 grid-cols-[88px_repeat(3,minmax(0,1fr))] border border-secondary-800 rounded-xl overflow-hidden bg-secondary-950/70">
                        {/* Time labels */}
                        <div
                            className="relative bg-secondary-950/80 border-r border-secondary-800"
                            style={{ height: TOTAL_HEIGHT }}
                        >
                            {hourLines.map((time, index) => {
                                const top = index * PX_PER_HOUR;
                                const showDay = false;
                                const isFirst = index === 0;

                                return (
                                    <div
                                        key={time.toISOString()}
                                        className="absolute left-0 right-0"
                                        style={{ top }}
                                    >
                                        <div
                                            className={`pr-3 text-right text-xs text-secondary-400 whitespace-nowrap -translate-y-1/2 ${isFirst ? "hidden" : ""}`}
                                        >
                                            {formatTimelineLabel(time, showDay)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Schedule columns */}
                        {columns.map((column) => {
                            const items = layoutColumnEvents(
                                scheduleItems.filter((item) => item.column === column.id)
                            );

                            return (
                                <div
                                    key={column.id}
                                    className="relative border-r last:border-r-0 border-secondary-800"
                                    style={{ height: TOTAL_HEIGHT }}
                                >
                                    {/* Grid lines */}
                                    {halfHourLines.map((time, index) => {
                                        const top = index * 30 * PX_PER_MINUTE;
                                        const isHour = index % 2 === 0;
                                        const isMidnight =
                                            time.getHours() === 0 && time.getMinutes() === 0;

                                        return (
                                            <div
                                                key={time.toISOString()}
                                                className={`absolute left-0 right-0 ${isMidnight
                                                    ? "border-t-2 border-secondary-500/60"
                                                    : isHour
                                                        ? "border-t border-secondary-800"
                                                        : "border-t border-secondary-800/50"
                                                    }`}
                                                style={{ top }}
                                            />
                                        );
                                    })}

                                    {/* Events */}
                                    {items.map((item) => {
                                        const top = Math.max(
                                            0,
                                            minutesBetween(SCHEDULE_START, item.start) * PX_PER_MINUTE
                                        );
                                        const bottom = Math.min(
                                            TOTAL_HEIGHT,
                                            minutesBetween(SCHEDULE_START, item.end) * PX_PER_MINUTE
                                        );
                                        const height = Math.max(1, bottom - top);

                                        const widthPct = 100 / item.laneCount;
                                        const leftPct = item.lane * widthPct;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`absolute rounded-lg border px-3 py-2 shadow-sm overflow-hidden ${column.eventClasses}`}
                                                style={{
                                                    top,
                                                    height,
                                                    left: `calc(${leftPct}% + 4px)`,
                                                    width: `calc(${widthPct}% - 8px)`,
                                                }}
                                            >
                                                <div className="text-sm font-semibold leading-tight">
                                                    {item.title}
                                                </div>
                                                <div className="mt-1 flex items-center gap-1 text-xs opacity-80">
                                                    <Icon icon="fluent:clock-16-filled" className="w-3 h-3" />
                                                    {formatTime(item.start)} – {formatTime(item.end)}
                                                </div>
                                                <div className="mt-0.5 flex items-center gap-1 text-xs opacity-60">
                                                    <Icon icon="fluent:location-16-filled" className="w-3 h-3" />
                                                    {item.location}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}