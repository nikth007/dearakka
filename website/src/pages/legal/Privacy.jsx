import React from 'react';
import LegalPage from './LegalPage';

export default function Privacy() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy Policy"
      updated="June 2026"
      intro="At Dear Akka, your privacy is not a feature we advertise — it is the foundation we built on. This policy explains, in plain language, what information the app handles and the promises we make about it."
      blocks={[
        { t: 'h2', x: 'Our core promise' },
        { t: 'p', x: 'Dear Akka is designed so that your personal health information stays on your own device. We do not run advertising, we do not sell data, and we have no business model that depends on knowing your private details. Sundaram Medical Foundation is a not-for-profit hospital, and this app carries that same spirit.' },
        { t: 'h2', x: 'What information the app handles' },
        { t: 'p', x: 'The health information you enter — such as your period dates, cycle length, symptoms, moods and notes — is stored locally on your device using your browser or device storage. By default, this information is not transmitted to us.' },
        { t: 'ul', items: [
          'Cycle and period data you log yourself.',
          'Symptoms, moods and personal notes you choose to record.',
          'App settings such as your preferred language.',
          'If you choose to create an account, the email address and name you provide.',
        ] },
        { t: 'h2', x: 'When you create an account' },
        { t: 'p', x: 'Creating an account is optional. If a future version offers account sign-in to back up or sync your data, we will only collect the minimum needed to provide that service — such as your email address — and we will protect it with appropriate security. Even then, the essentials of Dear Akka will remain usable without an account, fully on your device.' },
        { t: 'h2', x: 'What we never do' },
        { t: 'ul', items: [
          'We never sell your data to anyone.',
          'We never share your identifiable health information with advertisers or data brokers.',
          'We do not place advertising trackers inside the app.',
          'We do not require you to hand over personal details to use the core features.',
        ] },
        { t: 'h2', x: 'Your control' },
        { t: 'p', x: 'Because your data lives on your device, you remain in control of it. You can view, export or delete your information at any time from within the app. Clearing the app’s storage removes your local data permanently.' },
        { t: 'h2', x: 'Children' },
        { t: 'p', x: 'Dear Akka is intended for people who menstruate and those caring for them. Where a young person uses the app, we encourage a parent, guardian or elder sister to support them. We do not knowingly collect identifiable data from children through accounts.' },
        { t: 'h2', x: 'Changes to this policy' },
        { t: 'p', x: 'If we update this policy, we will revise the date above and, for significant changes, make a clear note in the app. Continued use after an update means you accept the revised policy.' },
        { t: 'h2', x: 'Contact us' },
        { t: 'p', x: 'If you have any questions about your privacy, you can reach Sundaram Medical Foundation through the contact details on our website. We will always treat your concerns with the seriousness they deserve.' },
      ]}
    />
  );
}
