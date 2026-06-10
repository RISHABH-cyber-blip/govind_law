import BlogPost from '@/components/blog/BlogPost'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to File a Civil Case in Delhi: Step-by-Step Legal Guide',
  description:
    'Learn how to file a civil case in Delhi — documents needed, courts involved, fees, and timelines explained clearly.',
}

export default function CivilCasePage() {
  return (
    <BlogPost
      category="Civil Law"
      title="How to File a Civil Case in Delhi: Step-by-Step Legal Guide"
      date="March 22, 2026"
      readTime="1 min read"
    >
      {/* REPLACE: Update article body with your own content before going live */}

      <p className="lead">
        Filing a civil case in Delhi can feel overwhelming, especially if you are navigating the
        legal system for the first time. Whether your matter involves a property dispute, a recovery
        claim, or a contractual disagreement, understanding the process is the first step toward
        asserting your rights effectively.
      </p>

      <h2>Step 1 — Determine the Correct Court</h2>
      <p>
        The first and most important step is identifying which court has jurisdiction over your
        matter. In Delhi, civil cases are filed before the District Courts (such as Dwarka, Saket,
        Tis Hazari, Rohini, Karkardooma, or Patiala House) based on where the cause of action arose
        or where the defendant resides. Cases involving larger claims may be filed directly before the
        Delhi High Court. An experienced advocate will advise you on the correct forum for maximum
        efficiency.
      </p>

      <h2>Step 2 — Gather Your Documents</h2>
      <p>
        Documentation is the foundation of any civil case. Common documents required include:
      </p>
      <ul>
        <li>Identity and address proof of all parties involved</li>
        <li>Title documents, sale deeds, agreements, or contracts relevant to the dispute</li>
        <li>All correspondence (emails, letters, legal notices) exchanged between the parties</li>
        <li>Previous court orders or prior agreements, if any</li>
        <li>Financial records, receipts, or proof of payment (for recovery suits)</li>
        <li>Witness details and supporting affidavits</li>
      </ul>

      <h2>Step 3 — Draft and File the Plaint</h2>
      <p>
        A plaint is the formal written statement filed by the plaintiff (the person initiating the
        case) setting out the facts, the legal basis for the claim, and the relief sought. The plaint
        must be carefully drafted to cover all relevant facts, avoid contradictions, and comply with
        the provisions of the Code of Civil Procedure, 1908. It is filed along with a court fee
        (calculated on the value of the suit), process fees, and certified copies of all supporting
        documents.
      </p>
      <p>
        Any error in the plaint — whether in framing the relief, the jurisdiction, or the cause of
        action — can result in delays or dismissal of the suit. This is precisely why professional
        drafting by an experienced advocate is not optional; it is essential.
      </p>

      <h2>Step 4 — Service of Summons &amp; First Hearing</h2>
      <p>
        Once the plaint is accepted by the court, summons are issued to the defendant directing them
        to appear on a specified date. The first hearing involves a preliminary check of the plaint
        and documents. Subsequent hearings involve the filing of a written statement by the
        defendant, framing of issues by the court, evidence recording, and finally, arguments before
        the judgment is delivered.
      </p>

      <h2>Step 5 — Evidence Stage and Trial</h2>
      <p>
        After issues are framed, both parties lead their evidence — through witnesses, documents, and
        affidavits. This stage is critical: evidence that is not properly brought on record cannot
        generally be relied upon later. Your advocate will conduct cross-examination of the
        opponent&apos;s witnesses and present your case with precision.
      </p>

      <h2>Step 6 — Final Arguments and Judgment</h2>
      <p>
        After evidence is complete, both sides submit written arguments and deliver oral arguments
        before the court. The judge then delivers a judgment. If either party is dissatisfied, they
        may appeal to a higher court within the prescribed limitation period.
      </p>

      <h2>Why You Need an Expert Advocate</h2>
      <p>
        Civil litigation in Delhi can be complex and time-sensitive. Missing a filing deadline,
        submitting incomplete documents, or filing in the wrong court can significantly delay justice
        or even result in your case being dismissed. An experienced advocate ensures that every
        procedural step is handled correctly, and that your interests are robustly represented at
        every stage of the proceedings.
      </p>
      <p>
        Do not navigate this alone. Reach out to us today for a confidential consultation — we will
        assess your matter and give you a clear, honest picture of where you stand.
      </p>
    </BlogPost>
  )
}
