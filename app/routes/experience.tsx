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

interface ExpRole {
  company: string;
  role: string;
  project: string;
  dates: string;
  description: string;
  tags: string[];
}

export async function loader() {
  const { copy } = await connectToDatabase();
  return json({ copy });
}

export default function Experience() {
  const { copy } = useLoaderData<typeof loader>();
  const roles: ExpRole[] = (copy as any)?.experience ?? [];

  return (
    <div>
      <CustomNav />
      <div className="experience-container">
        <div className="experience-content">
          <div className="experience-subtitle">{(copy as any)?.exp_blurb}</div>
          <div className="experience-title">{(copy as any)?.exp_title}</div>
          <p className="experience-body">{(copy as any)?.exp_body}</p>
          <div className="timeline">
            {roles.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-header">
                    <span className="timeline-dates">{item.dates}</span>
                    {item.dates === "Current" && (
                      <span className="timeline-badge">CURRENT</span>
                    )}
                  </div>
                  <div className="timeline-company">{item.company}</div>
                  <div className="timeline-role">
                    {item.role} — {item.project}
                  </div>
                  <p className="timeline-description">{item.description}</p>
                  <div className="timeline-tags">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="timeline-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
