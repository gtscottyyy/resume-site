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
            opportunities, please don't hesitate to reach out. I'll be happy to
            connect with you.
          </p>
          <div className="contactInfo">
            <div className="contactItem">
              <span className="contactIcon">📧</span>
              <div>
                <h3 className="contactTitle">Email</h3>
                <p className="contactText">your@email.com</p>
              </div>
            </div>
            <div className="contactItem">
              <span className="contactIcon">☎️</span>
              <div>
                <h3 className="contactTitle">Phone</h3>
                <p className="contactText">+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="contactItem">
              <span className="contactIcon">📍</span>
              <div>
                <h3 className="contactTitle">Location</h3>
                <p className="contactText">City, State, Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
