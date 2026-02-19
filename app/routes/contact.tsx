import CustomNav from "~/components/customnav";
import sharedStyles from "~/styles/shared.css";
import styles from "~/styles/contact.css";
import { connectToDatabase } from "~/utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

export default function Contact() {
  const copy = useLoaderData<typeof loader>();
  const contactCopy = copy.copy;
  return (
    // fix this fucking mess
    <div>
      <CustomNav />
      <div className="container">
        <div className="content">
          <div className="title">{contactCopy?.contact_title}</div>
          <p className="description">{contactCopy?.contact_body}</p>
          <div className="contactInfo">
            <div className="contactItem">
              <a
                href="mailto:scottyhenry@me.com?Subject=Looking to Connect"
                target="_top"
                className="contactLink"
              >
                <div className="contactIcon">📧</div>
              </a>
              <p className="contactText">scottyhenryy@me.com</p>
            </div>
            <div className="contactItem">
              <a href="tel:1-800-xxx-xxxx" className="contactIcon">
                ☎️
              </a>
              <p className="contactText">123 456-7890</p>
            </div>
            <div className="contactItem">
              <a
                className="contactIcon"
                href="http://maps.google.com/?q=1200 Pennsylvania Ave SE, Washington, District of Columbia, 20003"
              >
                📍
              </a>
              <p className="contactText">city, state, country</p>
            </div>
            <div className="contactItem">
              <a
                href="https://www.linkedin.com/in/scottyhenry/"
                className="contactIcon"
              >
                🔗
              </a>
              <p className="contactText">linkedin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
