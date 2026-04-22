// Mock data for local development without a database
// Set MOCK_MODE=true in .env.local to use this

import type { GetApplicationByIdRow } from "@/lib/sqlc/admin_sql";
import type { GetApplicationsPaginatedRow } from "@/lib/sqlc/admin_sql";

export const MOCK_USER = {
    id: 1,
    firstName: "Dev",
    lastName: "User",
    email: "dev@eurekahacks.ca",
    isAdmin: true,
    isEmailVerified: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
};

export const MOCK_APPLICATIONS: GetApplicationByIdRow[] = [
    {
        id: 1,
        userId: 2,
        status: "submitted",
        firstName: "Alice",
        lastName: "Zhang",
        email: "alice@example.com",
        age: 17,
        school: "A.B. Lucas Secondary School",
        yearOfGraduation: 2027,
        city: "London",
        dietaryRestrictions: ["vegetarian"],
        numberOfHackathonsAttended: 3,
        githubLink: "https://github.com/alice",
        linkedinLink: null,
        portfolioLink: null,
        resumeLink: null,
        emergencyContactFullName: "Bob Zhang",
        emergencyContactPhoneNumber: "(519) 555-0101",
        shortAnswerResponse: "I want to build something that helps people.",
        tshirtSize: "S",
        createdAt: new Date("2026-03-10T14:00:00"),
        updatedAt: new Date("2026-03-10T14:00:00"),
        rsvped: false,
    },
    {
        id: 2,
        userId: 3,
        status: "accepted",
        firstName: "Marcus",
        lastName: "Okafor",
        email: "marcus@example.com",
        age: 18,
        school: "London Central Secondary School",
        yearOfGraduation: 2026,
        city: "London",
        dietaryRestrictions: null,
        numberOfHackathonsAttended: 1,
        githubLink: "https://github.com/marcus",
        linkedinLink: "https://linkedin.com/in/marcus",
        portfolioLink: "https://marcus.dev",
        resumeLink: null,
        emergencyContactFullName: "Grace Okafor",
        emergencyContactPhoneNumber: "(519) 555-0202",
        shortAnswerResponse: "I've always loved building things from scratch.",
        tshirtSize: "M",
        createdAt: new Date("2026-03-12T10:30:00"),
        updatedAt: new Date("2026-03-14T09:00:00"),
        rsvped: true,
    },
    {
        id: 3,
        userId: 4,
        status: "rejected",
        firstName: "Sofia",
        lastName: "Patel",
        email: "sofia@example.com",
        age: 16,
        school: "Sir Frederick Banting Secondary School",
        yearOfGraduation: 2028,
        city: "London",
        dietaryRestrictions: ["gluten-free"],
        numberOfHackathonsAttended: 0,
        githubLink: null,
        linkedinLink: null,
        portfolioLink: null,
        resumeLink: null,
        emergencyContactFullName: "Raj Patel",
        emergencyContactPhoneNumber: "(519) 555-0303",
        shortAnswerResponse: "This would be my first hackathon!",
        tshirtSize: "XS",
        createdAt: new Date("2026-03-15T16:45:00"),
        updatedAt: new Date("2026-03-16T11:00:00"),
        rsvped: false,
    },
    {
        id: 4,
        userId: 5,
        status: "waitlisted",
        firstName: "Jordan",
        lastName: "Kim",
        email: "jordan@example.com",
        age: 17,
        school: "Westminster Secondary School",
        yearOfGraduation: 2027,
        city: "London",
        dietaryRestrictions: [],
        numberOfHackathonsAttended: 2,
        githubLink: "https://github.com/jordankim",
        linkedinLink: null,
        portfolioLink: "https://jordankim.ca",
        resumeLink: "https://jordankim.ca/resume.pdf",
        emergencyContactFullName: "Casey Kim",
        emergencyContactPhoneNumber: "(519) 555-0404",
        shortAnswerResponse: "I want to learn from other hackers.",
        tshirtSize: "L",
        createdAt: new Date("2026-03-18T09:15:00"),
        updatedAt: new Date("2026-03-19T08:00:00"),
        rsvped: false,
    },
];

export const MOCK_APPLICATIONS_PAGINATED: GetApplicationsPaginatedRow[] = MOCK_APPLICATIONS.map(a => ({
    id: a.id,
    firstName: a.firstName,
    lastName: a.lastName,
    school: a.school,
    status: a.status,
    createdAt: a.createdAt,
    githubLink: a.githubLink,
    linkedinLink: a.linkedinLink,
    portfolioLink: a.portfolioLink,
    resumeLink: a.resumeLink,
    rsvped: a.rsvped,
}));

export const MOCK_STATS = {
    registeredUsers: "12",
    applications: "4",
    accepted: "1",
    rejected: "1",
    pending: "1",
    rsvpCount: "1",
};

export const MOCK_APP_COUNT_PER_DAY = [
    { date: new Date("2026-03-10"), count: "1" },
    { date: new Date("2026-03-12"), count: "1" },
    { date: new Date("2026-03-15"), count: "1" },
    { date: new Date("2026-03-18"), count: "1" },
];

export const MOCK_SCORES: Record<number, number> = {
    // applicationId -> score for the mock admin user
};

export function isMockMode() {
    return process.env.MOCK_MODE === "true";
}
