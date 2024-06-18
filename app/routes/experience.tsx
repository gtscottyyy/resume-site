import CustomNav from "~/components/customnav";
import sharedStyles from "~/styles/shared.css";
import styles from "~/styles/experience.css";
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

export default function Experience() {
  const copy = useLoaderData<typeof loader>();
  const expCopy = copy.copy;
  return (
    <div>
      <CustomNav />
      <div className="experience-container">
        <div className="experience-content">
          <div className="experience-subtitle">{expCopy?.exp_blurb}</div>
          <div className="experience-title">{expCopy?.exp_title}</div>
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
                  <h3 className="experience-listTitle">
                    {expCopy?.exp_list_titles[0]}
                  </h3>
                  <p className="experience-listDescription">
                    {expCopy?.exp_list_bodies[0]}
                  </p>
                </div>
              </li>
              <li className="experience-listItem">
                <span className="experience-listIcon">&#10003;</span>
                <div>
                  <h3 className="experience-listTitle">
                    {expCopy?.exp_list_titles[1]}
                  </h3>
                  <p className="experience-listDescription">
                    {expCopy?.exp_list_bodies[1]}
                  </p>
                </div>
              </li>
              <li className="experience-listItem">
                <div className="experience-listIcon">&#10003;</div>
                <div>
                  <h3 className="experience-listTitle">
                    {expCopy?.exp_list_titles[2]}
                  </h3>
                  <p className="experience-listDescription">
                    {expCopy?.exp_list_bodies[2]}
                  </p>
                </div>
              </li>
              <li className="experience-listItem">
                <span className="experience-listIcon">&#10003;</span>
                <div>
                  <h3 className="experience-listTitle">
                    {expCopy?.exp_list_titles[3]}
                  </h3>
                  <p className="experience-listDescription">
                    {expCopy?.exp_list_bodies[3]}
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
