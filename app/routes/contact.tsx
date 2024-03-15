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
          <div className="title">Contact Me</div>
          <p className="description">
            If you have any questions or would like to discuss potential
            opportunities, please dont hesitate to reach out. Ill be happy to
            connect.
          </p>
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
