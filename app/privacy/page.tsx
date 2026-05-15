import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — PlaylistSorter for YouTube",
};

const PrivacyPage = () => {
  return (
    <div className="page-section privacy-page">
      <h1 className="section-heading">Privacy Policy</h1>
      <p className="privacy-updated">Last updated: May 14, 2026</p>

      <section className="privacy-section">
        <h2>Overview</h2>
        <p>
          PlaylistSorter for YouTube (&ldquo;the app&rdquo;) lets you view,
          search, and sort your YouTube playlists. This policy explains what
          data we access and how we use it.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Data We Access</h2>
        <p>
          When you sign in with Google, we request read-only access to your
          YouTube account data via the{" "}
          <code>https://www.googleapis.com/auth/youtube.readonly</code> scope.
          This allows us to:
        </p>
        <ul>
          <li>Display your YouTube playlists</li>
          <li>Display the videos within those playlists</li>
          <li>
            Show video metadata (title, duration, view count, upload date)
          </li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>How We Use Your Data</h2>
        <p>
          Your YouTube data is used exclusively to display and sort your
          playlists within the app interface. Specifically:
        </p>
        <ul>
          <li>
            Data is fetched directly from the YouTube Data API on your behalf
          </li>
          <li>
            Data is cached temporarily in your browser&apos;s session storage to
            reduce API calls
          </li>
          <li>
            Data is never sent to our servers, stored in a database, or shared
            with third parties
          </li>
          <li>
            Data is never used for advertising, analytics, or any purpose beyond
            displaying it to you
          </li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>Data Retention</h2>
        <p>
          We do not store your YouTube data. Any cached data lives only in your
          browser&apos;s session storage and is cleared when you close your
          browser tab. Revoking access to the app from your{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Account permissions
          </a>{" "}
          will immediately remove our access.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Google API Services</h2>
        <p>
          PlaylistSorter for YouTube&apos;s use of information received from
          Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Third-Party Services</h2>
        <p>
          We use{" "}
          <a
            href="https://next-auth.js.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            NextAuth.js
          </a>{" "}
          for authentication and Google OAuth for sign-in. We do not have access
          to your Google account password. Authentication tokens are stored
          securely in an encrypted session cookie and never shared with third
          parties.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, you can reach us via
          the{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            project repository
          </a>
          .
        </p>
      </section>

      <div className="privacy-back">
        <Link href="/">← Back to home</Link>
      </div>
    </div>
  );
};

export default PrivacyPage;
