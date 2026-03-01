import * as React from "react";
import { Email, Header, Paragraph, A } from "./components";

interface InfoTemplateProps {
    firstName: string;
}

export const InfoEmailTemplate = ({firstName}: InfoTemplateProps) => (
    <Email previewText="EurekaHACKS is tomorrow!">
        <Paragraph>Hey {firstName}!</Paragraph>
        <Paragraph>
            EurekaHACKS kicks off tomorrow! 🚀 We're thrilled to have you join us for an
            action-packed day of creativity, innovation, and problem-solving alongside other passionate high
            school students. Be sure to check out the info below so you're fully prepared to make the most of
            your EurekaHACKS experience!
        </Paragraph>
        <Header>Registration</Header>
        <Paragraph>
            Registration will be open from 7:30 AM to 8:00 AM, at the front entrance of the school. Please have
            your <A href="https://eurekahacks.ca/dashboard/qrcode">QR code</A> ready to be
            scanned. If you cannot make it to registration, please reach out to us through our <A
            href="https://discord.gg/ApEmE7g7GB">Discord server</A> or email us at <A
            href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</A>.
        </Paragraph>
        <Header>Discord</Header>
        <Paragraph>
            Discord will be our main way of communicating during the event. We will be send out important
            updates through the event, so please make sure to join if you haven't already! You can join using
            this link: <A href="https://discord.gg/ApEmE7g7GB">https://discord.gg/ApEmE7g7GB</A>.
        </Paragraph>
        <Header>EurekaHACKS packing list</Header>
        <Paragraph>
            Don't know what to bring? Here's a list of things you should consider bringing:
        </Paragraph>
        <Paragraph>
            • Laptop and charger<br/>
            • Water bottle<br/>
            • Extension cord<br/>
            • Hardware, if you plan to use any
        </Paragraph>
        <Paragraph>
            We will be providing lunch, dinner, and snacks, so no need to worry about food! 🍕
        </Paragraph>
        <Header>Prizes</Header>
        <Paragraph>
            Here's a sneak peek into this years prizes, worth over $11,000:
        </Paragraph>
        <Paragraph>
            • Bambu Lab A1 Minis<br/>
            • Mechanical keyboards<br/>
            • $500 and $300 of ICP tokens<br/>
            • Jane Street cards<br/>
            • Escape room passes
        </Paragraph>
        <Header>Important information</Header>
        <Paragraph>
            Date: Saturday April 5th<br/>
            Time: 8:00 AM - 9:30 PM (registration opens at 7:30 AM)<br/>
            Venue address: <A
            href="https://www.google.com/maps/place/Abbey+Park+High+School/@43.4368035,-79.7364156,20.21z/data=!4m14!1m7!3m6!1s0x882b5d865fd5349d:0x9fa1f7dc58c021e5!2sAbbey+Park+High+School!8m2!3d43.4365665!4d-79.7359694!16s%2Fm%2F02wz16b!3m5!1s0x882b5d865fd5349d:0x9fa1f7dc58c021e5!8m2!3d43.4365665!4d-79.7359694!16s%2Fm%2F02wz16b?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D">
            1455 Glen Abbey Gate, Oakville</A>
        </Paragraph>
        <Header>Hacker package</Header>
        <Paragraph>
            The hacker package can be accessed <A href="https://eurekahacks.ca/hacker-package.pdf"
           >here</A>. It contains all the information you
            need to know about the event, including the schedule, rules, and more! Please take a moment to
            review it before the event.
        </Paragraph>
        <Header>RSVP</Header>
        <Paragraph>
            If you haven't already, please do so <A
            href="https://eurekahacks.ca/dashboard">here</A>.
        </Paragraph>
        <Paragraph>
            Can't wait to see what you'll create!
            <br/>
            Best,
            <br/>
            The EurekaHACKS Team
        </Paragraph>
    </Email>
);

InfoEmailTemplate.PreviewProps = {
    firstName: "John",
} as InfoTemplateProps;

export default InfoEmailTemplate;
