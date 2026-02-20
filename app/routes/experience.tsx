import { useState } from "react";
import CustomNav from "~/components/customnav";
import sharedStyles from "~/styles/shared.css";
import styles from "~/styles/experience.css";
import { connectToDatabase } from "~/utils/db.server";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

export const meta: MetaFunction = () => {
  return [
    { title: "Experience — Scotty Henry" },
    { name: "description", content: "6+ years across fintech, healthcare, AI/LLM, e-commerce, and enterprise SaaS. Native iOS, React Native, React, and full-stack." },
    { property: "og:title", content: "Experience — Scotty Henry" },
    { property: "og:description", content: "6+ years across fintech, healthcare, AI/LLM, e-commerce, and enterprise SaaS. Native iOS, React Native, React, and full-stack." },
    { property: "og:image", content: "https://res.cloudinary.com/dwbtwz6ux/image/upload/v1771536953/headshot_uijqhm.jpg" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Experience — Scotty Henry" },
    { name: "twitter:description", content: "6+ years across fintech, healthcare, AI/LLM, e-commerce, and enterprise SaaS. Native iOS, React Native, React, and full-stack." },
    { name: "twitter:image", content: "https://res.cloudinary.com/dwbtwz6ux/image/upload/v1771536953/headshot_uijqhm.jpg" },
  ];
};

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
  useScrollAnimation();
  const { copy } = useLoaderData<typeof loader>();
  const roles: ExpRole[] = (copy as any)?.experience ?? [];

  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  // Collect unique tags in order of first appearance across all roles
  const allTags: string[] = [];
  const seen = new Set<string>();
  roles.forEach((role) => {
    role.tags.forEach((tag) => {
      if (!seen.has(tag)) {
        seen.add(tag);
        allTags.push(tag);
      }
    });
  });

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <div>
      <CustomNav />
      <div className="experience-container">
        <div className="experience-content">
          <div data-animate>
            <div className="experience-subtitle">{(copy as any)?.exp_blurb}</div>
            <div className="experience-title">{(copy as any)?.exp_title}</div>
            <p className="experience-body">{(copy as any)?.exp_body}</p>
          </div>

          <div
            className="filter-bar"
            data-animate
            style={{ "--animate-delay": "0.1s" } as React.CSSProperties}
          >
            <button
              className={`filter-pill${activeFilters.size === 0 ? " filter-pill-active" : ""}`}
              onClick={() => setActiveFilters(new Set())}
            >
              all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`filter-pill${activeFilters.has(tag) ? " filter-pill-active" : ""}`}
                onClick={() => toggleFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="timeline">
            {roles.map((item, index) => {
              const visible =
                activeFilters.size === 0 ||
                item.tags.some((tag) => activeFilters.has(tag));
              return (
                <div
                  key={index}
                  className="timeline-item"
                  data-animate
                  style={{
                    "--animate-delay": `${index * 0.1}s`,
                    display: visible ? "" : "none",
                  } as React.CSSProperties}
                >
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
                        <span
                          key={i}
                          className={`timeline-tag${activeFilters.has(tag) ? " timeline-tag-active" : ""}`}
                          onClick={() => toggleFilter(tag)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === "Enter" && toggleFilter(tag)
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
