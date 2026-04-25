export const APPLICATIONS_CLOSE_AT = new Date("2026-04-24T23:59:59-04:00");

export const applicationsClosed = () =>
    Date.now() > APPLICATIONS_CLOSE_AT.getTime();
