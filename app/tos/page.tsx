import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — PlaylistSorter for YouTube",
};

const TosPage = () => {
  return (
    <div className="page-section privacy-page">
      <h1 className="section-heading">Terms of Service</h1>
      <p className="privacy-updated">Last updated: May 14, 2026</p>

      <section className="privacy-section">
        <h2>Acceptance of Terms</h2>
        <p>
          By using PlaylistSorter for YouTube (&ldquo;the app&rdquo;), you agree
          to these Terms of Service. If you do not agree, do not use the app.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Description of Service</h2>
        <p>
          PlaylistSorter for YouTube is a free web application that lets you
          view, search, and sort your YouTube playlists using the YouTube Data
          API. The app is provided as-is, without any warranty.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Google Account & YouTube Data</h2>
        <p>
          The app requests read-only access to your YouTube account data. You
          can revoke this access at any time from your{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Account permissions
          </a>
          . We do not store, sell, or share your YouTube data. See our{" "}
          <Link href="/privacy">Privacy Policy</Link> for full details.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the app for any unlawful purpose</li>
          <li>Attempt to circumvent YouTube API quotas or rate limits</li>
          <li>Reverse engineer or attempt to extract our source credentials</li>
          <li>
            Use the app in a way that violates{" "}
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube&apos;s Terms of Service
            </a>
          </li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>YouTube API Services</h2>
        <p>
          This app uses the YouTube API Services. By using this app, you also
          agree to be bound by the{" "}
          <a
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="privacy-section">
        <h2>Disclaimer of Warranties</h2>
        <p>
          The app is provided &ldquo;as is&rdquo; without warranties of any
          kind. We do not guarantee uninterrupted access, and we are not
          responsible for any YouTube API outages or quota limitations imposed
          by Google.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Changes to Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the app after
          changes are posted constitutes acceptance of the updated terms.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Contact</h2>
        <p>
          Questions about these terms can be directed to the{" "}
          <a
            href="https://github.com/CodeWalker94/playlist-sorter-for-youtube"
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

export default TosPage;
