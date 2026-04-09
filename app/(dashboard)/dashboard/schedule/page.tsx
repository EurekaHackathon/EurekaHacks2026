import { Icon } from "@iconify/react";
import scheduleData from "@/lib/schedule.json";

const PX_PER_HOUR = 80;
const PX_PER_MINUTE = PX_PER_HOUR / 60;
const SCHEDULE_START = new Date("2026-05-01T16:00:00");
const SCHEDULE_END = new Date("2026-05-02T23:00:00");
const TOTAL_MINUTES = (SCHEDULE_END.getTime() - SCHEDULE_START.getTime()) / 60000;
const TOTAL_HEIGHT = TOTAL_MINUTES * PX_PER_MINUTE;

const columns = [
    { id: "main-room", label: "Main Room" },
    { id: "conference-rm1", label: "Room 1" },
    { id: "conference-rm2", label: "Room 2" },
] as const;

const eventTypeStyles = {
    food: {
        eventClasses: "bg-emerald-500/15 border-emerald-400/40 text-emerald-100",
        headerClasses: "text-emerald-300",
    },
    workshop: {
        eventClasses: "bg-sky-500/15 border-sky-400/40 text-sky-100",
        headerClasses: "text-sky-300",
    },
    event: {
        eventClasses: "bg-violet-500/15 border-violet-400/40 text-violet-100",
        headerClasses: "text-violet-300",
    },
} as const;

type ColumnId = (typeof columns)[number]["id"];
type EventType = keyof typeof eventTypeStyles;

interface ScheduleItem {
    id: number;
    column: ColumnId;
    type: EventType;
    title: string;
    location: string;
    start: Date;
    end: Date;
}

interface ScheduleJsonItem {
    id: number;
    column: ColumnId;
    type: EventType;
    title: string;
    location: string;
    start: string;
    end: string;
}

interface PositionedItem extends ScheduleItem {
    lane: number;
    laneCount: number;
}

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

// Simple overlap layout within a single room column
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

    const gridTemplateColumns = `88px repeat(${columns.length}, minmax(0, 1fr))`;

    return (
        <div className="p-6 pt-16 lg:pt-6">
            <h1 className="mb-2 text-3xl font-bold text-secondary-50">Schedule</h1>
            <p className="mb-6 text-secondary-300">Friday 5:00 PM - Saturday 10:00 PM</p>

            <div className="overflow-x-auto">
                <div className="min-w-[1100px]">
                    <div
                        className="mb-2 grid"
                        style={{ gridTemplateColumns }}
                    >
                        <div />
                        {columns.map((column) => (
                            <div
                                key={column.id}
                                className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-secondary-200"
                            >
                                {column.label}
                            </div>
                        ))}
                    </div>

                    <div
                        className="grid rounded-xl border border-secondary-800 bg-secondary-950/70 px-2 overflow-hidden"
                        style={{ gridTemplateColumns }}
                    >
                        {/* Time labels */}
                        <div
                            className="relative border-r border-secondary-800 bg-secondary-950/80"
                            style={{ height: TOTAL_HEIGHT }}
                        >
                            {hourLines.map((time, index) => {
                                const top = index * PX_PER_HOUR;
                                const showDay = false;
                                const isTerminal = index === 0 || index === hourLines.length - 1;

                                return (
                                    <div
                                        key={time.toISOString()}
                                        className="absolute left-0 right-0"
                                        style={{ top }}
                                    >
                                        <div
                                            className={`-translate-y-1/2 whitespace-nowrap pr-3 text-right text-xs text-secondary-400 ${isTerminal ? "hidden" : ""
                                                }`}
                                        >
                                            {formatTimelineLabel(time, showDay)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Room columns */}
                        {columns.map((column, columnIndex) => {
                            const items = layoutColumnEvents(
                                scheduleItems.filter((item) => item.column === column.id)
                            );

                            return (
                                <div
                                    key={column.id}
                                    className={`relative border-secondary-800 ${columnIndex < columns.length - 1 ? "border-r" : ""
                                        }`}
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
                                        const typeStyle = eventTypeStyles[item.type];

                                        return (
                                            <div
                                                key={item.id}
                                                className={`absolute overflow-hidden rounded-lg border px-3 py-2 shadow-sm ${typeStyle.eventClasses}`}
                                                style={{
                                                    top,
                                                    height,
                                                    left: `calc(${leftPct}% + 4px)`,
                                                    width: `calc(${widthPct}% - 8px)`,
                                                }}
                                            >
                                                <div
                                                    className={`flex gap-1 ${height >= 80
                                                        ? "flex-col items-start"
                                                        : "items-center justify-between"
                                                        } text-xs opacity-80`}
                                                >
                                                    <div className="text-sm font-semibold leading-tight">
                                                        {item.title}
                                                    </div>

                                                    <div className="mt-1.5 flex items-center gap-1 text-xs leading-none opacity-80">
                                                        <Icon
                                                            icon="fluent:clock-16-filled"
                                                            className="h-3 w-3 shrink-0"
                                                        />
                                                        <span>
                                                            {formatTime(item.start)} – {formatTime(item.end)}
                                                        </span>
                                                    </div>
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