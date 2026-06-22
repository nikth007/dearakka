import React from 'react';
import LegalPage from './LegalPage';

export default function Terms() {
  return (
    <LegalPage
      path="/terms"
      title="Terms of Use"
      updated="June 2026"
      intro="These terms explain the agreement between you and Sundaram Medical Foundation when you use the Dear Akka app and website. We have kept them as clear and fair as we can."
      blocks={[
        { t: 'h2', x: 'Acceptance of these terms' },
        { t: 'p', x: 'By using Dear Akka, you agree to these Terms of Use and to our Privacy Policy and Medical Disclaimer. If you do not agree, please do not use the app or website.' },
        { t: 'h2', x: 'What Dear Akka is' },
        { t: 'p', x: 'Dear Akka is a women’s health companion that helps you track your cycle, mood and symptoms, see personalised predictions, ask general health questions, and read educational articles. It is an informational and self-care tool, not a medical device or a clinical service.' },
        { t: 'h2', x: 'Not a substitute for medical care' },
        { t: 'p', x: 'Dear Akka does not diagnose, treat or prescribe. The guidance and predictions it offers are for general information and self-understanding only. Always consult a qualified doctor about your own health, and never delay seeking medical advice because of something you read in the app. Please read our Medical Disclaimer in full.' },
        { t: 'h2', x: 'Using the app responsibly' },
        { t: 'ul', items: [
          'Use Dear Akka for your own personal, non-commercial wellbeing.',
          'Provide accurate information so that predictions are meaningful.',
          'Do not attempt to disrupt, reverse-engineer or misuse the service.',
          'Understand that predictions are estimates and not guarantees.',
        ] },
        { t: 'h2', x: 'Predictions and fertility' },
        { t: 'p', x: 'Cycle and fertility predictions are based on the data you enter and on general patterns. They can be useful for awareness and planning, but they are not a reliable method of contraception and should not be used as one. Speak with a doctor about contraception and family planning.' },
        { t: 'h2', x: 'Your account' },
        { t: 'p', x: 'If you create an account, you are responsible for keeping your login details secure. Please tell us promptly if you believe your account has been accessed without your permission.' },
        { t: 'h2', x: 'Intellectual property' },
        { t: 'p', x: 'The Dear Akka name, logo, written content, illustrations and design are the property of Sundaram Medical Foundation and are protected by law. You may use the app for personal purposes but may not copy or redistribute its content without permission.' },
        { t: 'h2', x: 'Limitation of liability' },
        { t: 'p', x: 'Dear Akka is provided on an “as is” basis. To the fullest extent permitted by law, Sundaram Medical Foundation is not liable for decisions made solely on the basis of information from the app. Your health decisions should always be made together with a qualified professional.' },
        { t: 'h2', x: 'Changes to these terms' },
        { t: 'p', x: 'We may update these terms from time to time. When we do, we will revise the date above. Continued use of Dear Akka after changes means you accept the updated terms.' },
        { t: 'h2', x: 'Governing law' },
        { t: 'p', x: 'These terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts of Chennai, Tamil Nadu.' },
      ]}
    />
  );
}
