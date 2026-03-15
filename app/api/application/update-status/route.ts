import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { updateApplicationStatus } from "@/lib/sqlc/application_sql";
import { getApplicationById } from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";
import NodeMailer from "nodemailer";
import { render } from "@react-email/components";
import { AcceptanceEmailTemplate } from "@/lib/emails/acceptance";
import { RejectionEmailTemplate } from "@/lib/emails/rejection";
import { WaitlistEmailTemplate } from "@/lib/emails/waitlist";
import { sendMailAsync } from "@/lib/actions/auth";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");

    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) {
        return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const applicationId = formData.get("applicationId");
    const status = formData.get("status");

    if (!applicationId || typeof applicationId !== "string" || isNaN(parseInt(applicationId))) {
        return new Response("Invalid application ID", { status: 400 });
    }

    if (!status || typeof status !== "string") {
        return new Response("Invalid status", { status: 400 });
    }

    try {
        const application = await getApplicationById(db, { id: parseInt(applicationId) });

        if (!application) {
            return new Response("Application not found", { status: 404 });
        }

        await updateApplicationStatus(db, {
            id: parseInt(applicationId),
            status: status,
        });

        const emailStatuses = ["accepted", "rejected", "waitlisted"];
        if (emailStatuses.includes(status)) {
            const transporter = NodeMailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
                tls: { rejectUnauthorized: false },
            });

            let html: string;
            let subject: string;

            if (status === "accepted") {
                html = await render(AcceptanceEmailTemplate({ firstName: application.firstName }));
                subject = "Congratulations 🎉 — You're in at EurekaHACKS 2026!";
            } else if (status === "rejected") {
                html = await render(RejectionEmailTemplate({ firstName: application.firstName }));
                subject = "Your EurekaHACKS 2026 Application Update";
            } else {
                html = await render(WaitlistEmailTemplate({ firstName: application.firstName }));
                subject = "Your EurekaHACKS 2026 Application Update";
            }

            await sendMailAsync(transporter, {
                to: application.email,
                from: `"EurekaHACKS" hello@eurekahacks.ca`,
                subject,
                html,
            });
        }

        return new Response("Success", { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response("Error", { status: 500 });
    }
}