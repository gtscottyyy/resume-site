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
  const titles: string[] = expCopy?.exp_list_titles ?? [];
  const bodies: string[] = expCopy?.exp_list_bodies ?? [];

  return (
    <div>
      <CustomNav />
      <div className="experience-container">
        <div className="experience-content">
          <div className="experience-subtitle">{expCopy?.exp_blurb}</div>
          <div className="experience-title">{expCopy?.exp_title}</div>
          <p className="experience-body">{expCopy?.exp_body}</p>
          <ul className="experience-listContainer">
            {titles.map((title, index) => (
              <li key={index} className="experience-listItem">
                <span className="experience-listIcon">&#10003;</span>
                <div>
                  <h3 className="experience-listTitle">{title}</h3>
                  <p className="experience-listDescription">{bodies[index]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
