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
          <div className="experience-subtitle">Subtitle</div>
          <h1 className="experience-title">My Experience</h1>
          <p className="experience-paragraph">
            This is a paragraph where you can provide a brief overview or
            introduction to your experience.
          </p>
          <ul className="experience-list">
            <li className="experience-listItem">
              <span className="experience-listIcon">&#10003;</span>
              <div>
                <h3 className="experience-listTitle">Experience Title 1</h3>
                <p className="experience-listDescription">
                  Description for experience item 1 goes here.
                </p>
              </div>
            </li>
            <li className="experience-listItem">
              <span className="experience-listIcon">&#10003;</span>
              <div>
                <h3 className="experience-listTitle">Experience Title 2</h3>
                <p className="experience-listDescription">
                  Description for experience item 2 goes here.
                </p>
              </div>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}
