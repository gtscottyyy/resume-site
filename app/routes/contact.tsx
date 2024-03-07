import CustomNav from "~/components/customnav";
import sharedStyles from "~/styles/shared.css";
import styles from "~/styles/contact.css";

export function links() {
  return [
    { rel: "stylesheet", href: sharedStyles },
    { rel: "stylesheet", href: styles },
  ];
}

export default function Contact() {
  return (
    <div>
      <CustomNav />
      <div className="container">
        <div className="content">
          <div className="subtitle">Get in Touch</div>
          <div className="title">Contact Me</div>
          <p className="description">
            If you have any questions or would like to discuss potential
            opportunities, please dont hesitate to reach out. Ill be happy to
            connect with you.
          </p>
          <div className="contactInfo">
            <div className="contactItem">
              <div className="contactIcon">📧</div>
              <p className="contactText">scottyhenryy@me.com</p>
            </div>
            <div className="contactItem">
              <div className="contactIcon">☎️</div>
              <p className="contactText">123 456-7890</p>
            </div>
            <div className="contactItem">
              <div className="contactIcon">📍</div>
              <p className="contactText">city, state, country</p>
            </div>
            <div className="contactItem">
              <div className="contactIcon">🔗</div>
              <p className="contactText">linkedin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
