import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Seo from '../../components/Seo';
import Reveal from '../../components/Reveal';
import { getCategory } from './categories';
import { ALL_ARTICLES, getArticle } from './articles';
import { ArticleCard } from './Library';
import { LogoMark } from '../../components/Logo';
import { useLang } from '../../content/i18n';
import { ArrowIcon } from '../../components/icons/Icons';

function Block({ b }) {
  if (b.t === 'h2') return <h2>{b.x}</h2>;
  if (b.t === 'h3') return <h3>{b.x}</h3>;
  if (b.t === 'quote') return <blockquote>{b.x}</blockquote>;
  if (b.t === 'ul') return <ul>{b.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
  if (b.t === 'ol') return <ol>{b.items.map((it, i) => <li key={i}>{it}</li>)}</ol>;
  return <p>{b.x}</p>;
}

export default function Article() {
  const { categoryId, articleId } = useParams();
  const { t } = useLang();
  const article = getArticle(categoryId, articleId);
  const cat = getCategory(categoryId);
  if (!article || !cat) return <Navigate to="/health-library" replace />;

  const related = ALL_ARTICLES.filter((a) => a.categoryId === categoryId && a.id !== articleId).slice(0, 3);
  const relatedFill = related.length < 3
    ? [...related, ...ALL_ARTICLES.filter((a) => a.categoryId !== categoryId).slice(0, 3 - related.length)]
    : related;

  return (
    <>
      <Seo title={article.title} path={`/health-library/${categoryId}/${articleId}`} description={article.excerpt} />

      <article>
        <div style={{ background: `linear-gradient(180deg,${cat.soft},#fbfcfe)`, padding: '48px 0 36px' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <Reveal>
              <Link to={`/health-library/${categoryId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: cat.accent, fontWeight: 600, fontSize: 14, marginBottom: 18 }}>
                <span style={{ transform: 'rotate(180deg)' }}><ArrowIcon size={14} c={cat.accent} /></span> {cat.title[0]}
              </Link>
              <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.12, marginBottom: 16 }}>{article.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#52617a', fontSize: 14.5 }}>
                <span>{article.readTime}</span>
                <span>·</span>
                <span>{t('Updated', 'புதுப்பிக்கப்பட்டது')} {article.updated}</span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="container" style={{ maxWidth: 720, padding: '40px 24px 8px' }}>
          <div className="prose">
            {article.blocks.map((b, i) => <Block key={i} b={b} />)}
          </div>

          {/* review note */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#f4f9f8', border: '1px solid #e3efed', borderRadius: 18, padding: 22, margin: '36px 0' }}>
            <LogoMark size={42} />
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, color: '#1e3a5f', fontSize: 15.5, marginBottom: 4 }}>
                {t('Reviewed with care', 'அக்கறையுடன் சரிபார்க்கப்பட்டது')}
              </div>
              <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                {t('This article reflects the clinical grounding of Sundaram Medical Foundation. It is for general information and education only, and is not a substitute for personal medical advice. Please see a doctor about your own health.',
                   'இந்தக் கட்டுரை சுந்தரம் மெடிக்கல் ஃபவுண்டேஷனின் மருத்துவ அடிப்படையைப் பிரதிபலிக்கிறது. இது பொதுத் தகவலுக்கானது, தனிப்பட்ட மருத்துவ ஆலோசனைக்கு மாற்றாகாது.')}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '12px 0 40px' }}>
            <a href="https://nikth007.github.io/dearakka/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t('Ask Akka about this', 'இதைப் பற்றி Akka-விடம் கேள்')} <ArrowIcon size={16} c="#fff" />
            </a>
          </div>
        </div>

        {/* related */}
        <section className="section-tight" style={{ background: '#fff9f4' }}>
          <div className="container">
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>{t('Related articles', 'தொடர்புடைய கட்டுரைகள்')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="feat-grid">
              {relatedFill.map((a) => <ArticleCard key={a.id} a={a} />)}
            </div>
          </div>
        </section>
      </article>
      <style>{`@media (max-width:880px){ .feat-grid{ grid-template-columns:1fr 1fr !important; } }
        @media (max-width:560px){ .feat-grid{ grid-template-columns:1fr !important; } }`}</style>
    </>
  );
}
