import React from 'react';
import LegalPage from './LegalPage';

export default function Cookies() {
  return (
    <LegalPage
      path="/cookies"
      title="Cookie Settings"
      updated="June 2026"
      intro="Dear Akka takes a deliberately minimal approach to cookies and similar technologies. This page explains what we use and why — and what we promise never to do."
      blocks={[
        { t: 'h2', x: 'Our approach' },
        { t: 'p', x: 'We believe a health app should not follow you around the internet. Dear Akka does not use advertising cookies or third-party tracking pixels. The only storage we rely on is what makes the app work for you.' },
        { t: 'h2', x: 'What we use' },
        { t: 'h3', x: 'Essential local storage' },
        { t: 'p', x: 'Dear Akka uses your device’s local storage to keep your cycle data, logs and settings on your device. This is what allows the app to work offline and to remember your information between visits. Without it, the app cannot function.' },
        { t: 'h3', x: 'Preference storage' },
        { t: 'p', x: 'We remember small preferences, such as whether you are reading in English or Tamil, so the experience feels consistent each time you return.' },
        { t: 'h2', x: 'What we do not use' },
        { t: 'ul', items: [
          'No advertising or marketing cookies.',
          'No third-party behavioural trackers.',
          'No cross-site profiling of your activity.',
          'No selling of any browsing or usage data.',
        ] },
        { t: 'h2', x: 'Managing storage' },
        { t: 'p', x: 'You are always in control. You can clear Dear Akka’s local data at any time through the app’s settings or through your browser’s controls. Please note that clearing this storage will also remove the cycle history kept on your device, as we do not hold a copy elsewhere by default.' },
        { t: 'h2', x: 'Analytics' },
        { t: 'p', x: 'If we ever introduce privacy-respecting, aggregated analytics to understand how the app is used and improve it, we will update this page first and ensure such data cannot identify you personally.' },
        { t: 'h2', x: 'Questions' },
        { t: 'p', x: 'If you would like to know more about how Dear Akka handles storage, please contact Sundaram Medical Foundation using the details on our website.' },
      ]}
    />
  );
}
