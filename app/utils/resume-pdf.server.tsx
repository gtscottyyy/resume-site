import React from "react";
import {
  renderToBuffer,
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

const accent = "#1a6b45";
const textPrimary = "#111111";
const textSecondary = "#555555";
const borderColor = "#dedede";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 56,
    fontSize: 10,
    color: textPrimary,
  },
  // ── Header ──────────────────────────────
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 12,
    color: textSecondary,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    gap: 14,
    fontSize: 9,
    color: textSecondary,
    marginBottom: 20,
  },
  contactLink: {
    fontSize: 9,
    color: accent,
    textDecoration: "none",
  },
  // ── Divider ─────────────────────────────
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    marginBottom: 14,
  },
  // ── Section label ───────────────────────
  sectionLabel: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: accent,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  // ── Summary ─────────────────────────────
  summary: {
    fontSize: 9.5,
    color: textSecondary,
    lineHeight: 1.55,
    marginBottom: 18,
  },
  // ── Experience item ─────────────────────
  expItem: {
    marginBottom: 14,
  },
  expRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  expCompany: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: textPrimary,
    marginBottom: 2,
  },
  expDates: {
    fontSize: 9,
    color: textSecondary,
    fontFamily: "Helvetica-Oblique",
  },
  expRole: {
    fontSize: 9.5,
    color: accent,
    marginBottom: 5,
  },
  expDesc: {
    fontSize: 9.5,
    color: textSecondary,
    lineHeight: 1.5,
    marginBottom: 6,
  },
  // ── Tags ────────────────────────────────
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tag: {
    fontSize: 7.5,
    color: accent,
    borderWidth: 1,
    borderColor: accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

interface ExpRole {
  company: string;
  role: string;
  project: string;
  dates: string;
  description: string;
  tags: string[];
}

function ResumePDF({ copy }: { copy: any }) {
  const roles: ExpRole[] = copy?.experience ?? [];
  const name: string = copy?.home_title ?? "Scotty Henry";
  const roleTitle: string = copy?.home_subtitle ?? "Software Developer";
  const linkedin: string = copy?.linkedin_url ?? "";
  const summary: string = copy?.about_body ?? copy?.home_body ?? "";

  const allSkills = Array.from(
    new Set(roles.flatMap((r) => r.tags))
  );

  return (
    <Document title={`${name} — Resume`} author={name}>
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <Text style={s.name}>{name}</Text>
        <Text style={s.roleTitle}>{roleTitle}</Text>
        <View style={s.contactRow}>
          <Text>Cincinnati, OH</Text>
          {linkedin ? (
            <Link src={linkedin} style={s.contactLink}>
              {linkedin.replace(/^https?:\/\//, "")}
            </Link>
          ) : null}
        </View>

        <View style={s.divider} />

        {/* Summary */}
        {summary ? (
          <>
            <Text style={s.sectionLabel}>Summary</Text>
            <Text style={s.summary}>{summary}</Text>
            <View style={s.divider} />
          </>
        ) : null}

        {/* Experience */}
        <Text style={s.sectionLabel}>Experience</Text>
        {roles.map((role, i) => (
          <View key={i} style={s.expItem}>
            <View style={s.expRow}>
              <Text style={s.expCompany}>{role.company}</Text>
              <Text style={s.expDates}>{role.dates}</Text>
            </View>
            <Text style={s.expRole}>
              {role.role} — {role.project}
            </Text>
            <Text style={s.expDesc}>{role.description}</Text>
            <View style={s.tagRow}>
              {role.tags.map((tag, j) => (
                <Text key={j} style={s.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        ))}

        <View style={s.divider} />

        {/* Skills */}
        <Text style={s.sectionLabel}>Skills</Text>
        <View style={s.tagRow}>
          {allSkills.map((tag, i) => (
            <Text key={i} style={s.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export async function renderResumePDF(copy: unknown): Promise<Buffer> {
  return renderToBuffer(<ResumePDF copy={copy} />);
}
