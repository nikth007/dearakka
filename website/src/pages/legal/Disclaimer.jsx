import React from 'react';
import LegalPage from './LegalPage';

export default function Disclaimer() {
  return (
    <LegalPage
      path="/medical-disclaimer"
      title="Medical Disclaimer"
      updated="June 2026"
      intro="Dear Akka is made with genuine clinical care, but it is important to be clear about what it can and cannot do for your health. Please read this disclaimer carefully."
      blocks={[
        { t: 'h2', x: 'For information, not diagnosis' },
        { t: 'p', x: 'The content in Dear Akka — including articles, predictions, symptom insights and the Ask Akka companion — is provided for general information and education only. It reflects the clinical grounding of Sundaram Medical Foundation, but it is not a substitute for professional medical advice, diagnosis or treatment.' },
        { t: 'h2', x: 'Always consult a doctor' },
        { t: 'p', x: 'Dear Akka cannot examine you, run tests, or know the full picture of your health. For any concern about your body, please consult a qualified doctor or healthcare professional who can advise you on your individual situation. Never disregard professional medical advice, or delay seeking it, because of something you have read or been told in the app.' },
        { t: 'h2', x: 'Ask Akka is a companion, not a clinician' },
        { t: 'p', x: 'The Ask Akka feature offers warm, general, science-aware guidance. It is not a doctor, does not diagnose conditions, and does not prescribe medication. When a question needs real medical attention, Akka will encourage you to see a doctor — and you should.' },
        { t: 'h2', x: 'Predictions are estimates' },
        { t: 'p', x: 'Cycle, period and fertility predictions are estimates based on the information you enter and on general patterns. They will not always be correct, especially if your cycle is irregular. They are not a reliable method of contraception and must not be used as one.' },
        { t: 'h2', x: 'When to seek care promptly' },
        { t: 'p', x: 'Please see a doctor without delay if you experience any of the following:' },
        { t: 'ul', items: [
          'Very heavy bleeding, or bleeding between periods or after sex.',
          'Severe pelvic or abdominal pain that disrupts your daily life.',
          'Periods that suddenly become very irregular or stop unexpectedly.',
          'Signs of anaemia such as extreme tiredness, breathlessness or dizziness.',
          'Any new lump, unusual discharge, or symptom that worries you.',
        ] },
        { t: 'h2', x: 'Mental health' },
        { t: 'p', x: 'If you are struggling with low mood, anxiety or distress that feels overwhelming — and especially if you have any thoughts of harming yourself — please reach out to a doctor, a mental health professional, or a trusted helpline right away. You deserve real, human support, and it is always okay to ask for it.' },
        { t: 'h2', x: 'In an emergency' },
        { t: 'p', x: 'Dear Akka is not for emergencies. If you believe you are facing a medical emergency, contact your local emergency services or go to the nearest hospital immediately.' },
      ]}
    />
  );
}
