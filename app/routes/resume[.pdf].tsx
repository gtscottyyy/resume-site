import { connectToDatabase } from "~/utils/db.server";
import { renderResumePDF } from "~/utils/resume-pdf.server";

export async function loader() {
  const { copy } = await connectToDatabase();
  const buffer = await renderResumePDF(copy);
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="scotty-henry-resume.pdf"',
    },
  });
}
