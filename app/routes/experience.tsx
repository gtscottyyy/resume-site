import CustomNav from "~/components/customnav";
import sharedStyles from "~/styles/shared.css";
import styles from "~/styles/experience.css";

export function links() {
  return [
    { rel: "stylesheet", href: sharedStyles },
    { rel: "stylesheet", href: styles },
  ];
}

export default function Experience() {
  return (
    <div>
      <CustomNav />
      <div className="experience-container">
        <div className="experience-content">
          <div className="experience-subtitle">stuff ive built</div>
          <div className="experience-title">Aka Experience</div>
          <p className="experience-paragraph">
            With the core of my experience being in mobile development (native
            and cross platform), I have also worked on multiple web projects, as
            well as webOS. Projects in fields like fintech, healthcare, AI/LLM
            and e-commerce.
          </p>
          <div className="list-container">
            <ul className="experience-list">
              <li className="experience-listItem">
                <span className="experience-listIcon">&#10003;</span>
                <div>
                  <h3 className="experience-listTitle">Native Mobile</h3>
                  <p className="experience-listDescription">
                    Working in both UI Kit and SwiftUI. Some experiences Ive
                    contributed to: enabling private location based payments
                    safely and securely, enabling users to leverage shopping
                    habits to make informed grocery purchases and earn rewards
                    in their insurance app, specialized chatgpt instance based
                    on proprietary information.
                  </p>
                </div>
              </li>
              <li className="experience-listItem">
                <span className="experience-listIcon">&#10003;</span>
                <div>
                  <h3 className="experience-listTitle">
                    Cross Platform Mobile
                  </h3>
                  <p className="experience-listDescription">
                    Contributed to a highly engaging welcome experience focused
                    on educating and responding to new users intuitively.
                  </p>
                </div>
              </li>
              <li className="experience-listItem">
                <div className="experience-listIcon">&#10003;</div>
                <div>
                  <h3 className="experience-listTitle">Web</h3>
                  <p className="experience-listDescription">
                    Contributed to an internal LLM chatbot POC pre-gpt era that
                    was early experimenting with conversational nodes and
                    pre-determined responses based on conversational flows.
                  </p>
                </div>
              </li>
              <li className="experience-listItem">
                <span className="experience-listIcon">&#10003;</span>
                <div>
                  <h3 className="experience-listTitle">webOS</h3>
                  <p className="experience-listDescription">
                    Contributed to a companion app in webOS for a large online
                    and on-air commerce brand. Applicated enabled users to watch
                    live programming, browse products while removing friction to
                    purchase.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
