import { Icon } from "@iconify/react";
import scheduleData from "@/lib/schedule.json";

const PX_PER_HOUR = 80;
const PX_PER_MINUTE = PX_PER_HOUR / 60;

const SCHEDULE_START = new Date("2026-05-01T16:00:00");
const SCHEDULE_END = new Date("2026-05-02T23:00:00");
const TOTAL_MINUTES = (SCHEDULE_END.getTime() - SCHEDULE_START.getTime()) / 60000;
const TOTAL_HEIGHT = TOTAL_MINUTES * PX_PER_MINUTE;

type ColumnId = "food" | "workshops" | "events";

interface ScheduleItem {
    id: number;
    column: ColumnId;
    title: string;
    location: string;
    start: Date;
    end: Date;
}

interface ScheduleJsonItem {
    id: number;
    column: ColumnId;
    title: string;
    location: string;
    start: string;
    end: string;
}

const columns: Array<{ id: ColumnId; label: string; eventClasses: string; headerClasses: string }> = [
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

function parseScheduleItems(data: ScheduleJsonItem[]): ScheduleItem[] {
    return data.map((item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
    }));
}

const scheduleItems: ScheduleItem[] = parseScheduleItems(scheduleData as ScheduleJsonItem[]);

function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
}

function minutesBetween(start: Date, end: Date): number {
    return (end.getTime() - start.getTime()) / 60000;
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function formatTimelineLabel(date: Date, includeDay = false): string {
    if (!includeDay) return formatTime(date);

    return date.toLocaleString([], {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
    });
}

interface PositionedItem extends ScheduleItem {
    lane: number;
    laneCount: number;
}

// Simple overlap layout within a single column
function layoutColumnEvents(items: ScheduleItem[]): PositionedItem[] {
    const sorted = [...items].sort((a, b) => a.start.getTime() - b.start.getTime());
    const positioned: PositionedItem[] = [];

    let cluster: ScheduleItem[] = [];
    let clusterEnd = -Infinity;

    function flushCluster() {
        if (!cluster.length) return;

        const laneEndTimes: number[] = [];
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
                                                    <Icon icon="fluent:location-16-filled" className="w-3 h-3" />
                                                    {item.location}
                                                </div>
                                                <div className="mt-0.5 flex items-center gap-1 text-xs opacity-60">
                                                    <Icon icon="fluent:clock-16-filled" className="w-3 h-3" />
                                                    {formatTime(item.start)} – {formatTime(item.end)}
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