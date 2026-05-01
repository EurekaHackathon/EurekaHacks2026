export const MEAL_EVENTS = [
    { key: "dinner-day-1", label: "Dinner Day 1" },
    { key: "breakfast-day-2", label: "Breakfast Day 2" },
    { key: "lunch-day-2", label: "Lunch Day 2" },
    { key: "dinner-day-2", label: "Dinner Day 2" },
    { key: "custom-event-1", label: "Custom Event 1" },
    { key: "custom-event-2", label: "Custom Event 2" },
    { key: "custom-event-3", label: "Custom Event 3" },
] as const;

export type MealEventKey = typeof MEAL_EVENTS[number]["key"];

export const MEAL_EVENT_KEYS: ReadonlySet<string> = new Set(MEAL_EVENTS.map(e => e.key));

export const SCAN_EVENTS = [
    { key: "check-in", label: "Hacker check-in" },
    ...MEAL_EVENTS,
] as const;

export const SCAN_EVENT_KEYS: ReadonlySet<string> = new Set(SCAN_EVENTS.map(e => e.key));
