import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Seo from '../../components/Seo';
import Reveal, { RevealGroup, RevealItem } from '../../components/Reveal';
import { getCategory } from './categories';
import { ALL_ARTICLES } from './articles';
import { ArticleCard, DisclaimerStrip } from './Library';
import { useLang } from '../../content/i18n';
import { ArrowIcon } from '../../components/icons/Icons';

export default function Category() {
  const { categoryId } = useParams();
  const { t } = useLang();
  const cat = getCategory(categoryId);
  if (!cat) return <Navigate to="/health-library" replace />;
  const articles = ALL_ARTICLES.filter((a) => a.categoryId === categoryId);

  return (
    <>
      <Seo title={cat.title[0]} path={`/health-library/${categoryId}`} description={cat.blurb[0]} />
      <section style={{ background: `linear-gradient(180deg,${cat.soft},#fbfcfe)`, padding: '52px 0 40px' }}>
        <div className="container">
          <Reveal>
            <Link to="/health-library" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: cat.accent, fontWeight: 600, fontSize: 14.5, marginBottom: 18 }}>
              <span style={{ transform: 'rotate(180deg)' }}><ArrowIcon size={15} c={cat.accent} /></span> {t('Health Library', 'ஆரோக்கிய நூலகம்')}
            </Link>
            <h1 style={{ fontSize: 'clamp(30px,4.4vw,46px)', marginBottom: 14 }}>{t(cat.title[0], cat.title[1])}</h1>
            <p style={{ fontSize: 18.5, color: '#52617a', maxWidth: 620, lineHeight: 1.6 }}>{t(cat.blurb[0], cat.blurb[1])}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="feat-grid">
            {articles.map((a) => <RevealItem key={a.id}><ArticleCard a={a} /></RevealItem>)}
          </RevealGroup>
        </div>
      </section>
      <DisclaimerStrip t={t} />
      <style>{`@media (max-width:880px){ .feat-grid{ grid-template-columns:1fr 1fr !important; } }
        @media (max-width:560px){ .feat-grid{ grid-template-columns:1fr !important; } }`}</style>
    </>
  );
}
