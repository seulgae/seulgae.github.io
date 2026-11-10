import education from "../../data/education";
import awards from "../../data/awards";
import licenses from "../../data/licenses";
import ExternalLinks from "../ExternalLinks";
import Lightbox from "../Lightbox";
import ZoomableImage from "../ZoomableImage";
import { useLightbox } from "../../hooks/useLightbox";
import { assetUrl } from "../../utils/text";
import PosterHeading from "./PosterHeading";

function CredentialsPoster() {
  const { zoomed, open, close } = useLightbox();

  return (
    <section
      id="credentials"
      className="poster-section"
      aria-labelledby="credentials-poster-title"
    >
      <PosterHeading
        index="03"
        titleId="credentials-poster-title"
        title="Credentials"
        helpText="학력 및 교육 이수, 수상 증빙, 보유 자격증과 관련 프로젝트 산출물입니다. 이미지를 누르면 크게 볼 수 있습니다."
      />

      <div className="credentials-group">
        <h3 className="credentials-group-title">🎓 Education</h3>
        <div className="education-poster-grid">
          {education.filter((edu) => edu.showInPortfolio !== false).map((edu) => (
            <article key={edu.id} className="credential-rich-card">
              {edu.image ? (
                <ZoomableImage
                  src={assetUrl(edu.image)}
                  alt={edu.school}
                  className="credential-thumb"
                  href={edu.imageLink}
                  onZoom={open}
                />
              ) : (
                <div className="credential-thumb-placeholder" aria-hidden="true">
                  🎓
                </div>
              )}

              <div className="credential-rich-body">
                <span className="credential-period">{edu.period}</span>
                <h4 className="credential-rich-title">{edu.degree}</h4>
                <p className="credential-org">
                  {edu.school} · {edu.summary}
                </p>
                {edu.curriculum?.length ? (
                  <p className="credential-extra">{edu.curriculum.join(", ")}</p>
                ) : null}
                {/* <ExternalLinks links={edu.links} label="관련 산출물" /> */}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="credentials-two-col">
        <div>
          <h3 className="credentials-group-title">🏆 Awards</h3>
          <div className="credential-stack">
            {awards.map((award) => (
              <article key={award.id} className="credential-rich-card">
                {award.image ? (
                  <ZoomableImage
                    src={assetUrl(award.image)}
                    alt={award.title}
                    className="credential-thumb"
                    onZoom={open}
                  />
                ) : (
                  <div className="credential-thumb-placeholder" aria-hidden="true">
                    🏆
                  </div>
                )}

                <div className="credential-rich-body">
                  <span className="credential-period">{award.date} · 수상</span>
                  <h4 className="credential-rich-title">{award.title}</h4>
                  <p className="credential-org">{award.description}</p>
                  <ExternalLinks links={award.links} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3 className="credentials-group-title">📜 Licenses</h3>
          <div className="credential-stack">
            {licenses.map((lic) => (
              <article key={lic.id} className="credential-rich-card">
                {lic.image ? (
                  <ZoomableImage
                    src={assetUrl(lic.image)}
                    alt={lic.title}
                    className="credential-thumb"
                    onZoom={open}
                  />
                ) : (
                  <div className="credential-thumb-placeholder" aria-hidden="true">
                    📜
                  </div>
                )}

                <div className="credential-rich-body">
                  <span className="credential-period">{lic.date} · 자격증</span>
                  <h4 className="credential-rich-title">{lic.title}</h4>
                  <p className="credential-org">{lic.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {zoomed ? <Lightbox src={zoomed.src} alt={zoomed.alt} onClose={close} /> : null}
    </section>
  );
}

export default CredentialsPoster;
