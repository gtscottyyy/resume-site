import CustomNav from "~/components/customnav";
import TerminalContact from "~/components/terminalcontact";
import sharedStyles from "~/styles/shared.css";
import styles from "~/styles/contact.css";
import { connectToDatabase } from "~/utils/db.server";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Resend } from "resend";

export function links() {
  return [
    { rel: "stylesheet", href: sharedStyles },
    { rel: "stylesheet", href: styles },
  ];
}

export async function loader() {
  const { copy } = await connectToDatabase();
  return json({ copy });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const honeypot = String(formData.get("_hp") ?? "");
  if (honeypot) return json({ ok: false });

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: "missing fields" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],
      subject: `Portfolio message from ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "send failed" });
  }
}

export default function Contact() {
  const { copy } = useLoaderData<typeof loader>();
  const contactCopy = copy as any;

  return (
    <div>
      <CustomNav />
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <div className="contact-subtitle">get in touch</div>
            <div className="title">{contactCopy?.contact_title}</div>
            <p className="description">{contactCopy?.contact_body}</p>
          </div>
          <TerminalContact />
          <div className="contact-links">
            <a
              href={contactCopy?.linkedin_url}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 linkedin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
