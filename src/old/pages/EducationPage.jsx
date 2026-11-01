import ExternalLinks from "../components/ExternalLinks";
import Lightbox from "../components/Lightbox";
import ZoomableImage from "../components/ZoomableImage";
import { useLightbox } from "../hooks/useLightbox";
import education from "../data/education";
import { assetUrl } from "../utils/text";
import "../styles/pageShell.css";
import "../styles/education.css";

function EducationPage() {
  const { zoomed, open, close } = useLightbox();

  return (
    <div className="page-shell">
      <h1>학력 및 교육</h1>
      <div className="education-list">
        {education.map((item) => (
          <article key={item.id} className="education-card">
            <ZoomableImage
              src={assetUrl(item.image)}
              alt={item.school}
              className="education-image"
              href={item.imageLink}
              onZoom={open}
            />
            <div className="education-details">
              <h2>{item.degree}</h2>
              <h3>{item.school}</h3>
              <p>
                <strong>기간:</strong> {item.period}
              </p>
              <p>{item.summary}</p>

              {item.curriculum?.length ? (
                <div className="education-curriculum">
                  <p className="education-curriculum-label">상세 교육 내용</p>
                  <ul>
                    {item.curriculum.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <ExternalLinks links={item.links} label="프로젝트 항목" />
            </div>
          </article>
        ))}
      </div>

      {zoomed ? <Lightbox src={zoomed.src} alt={zoomed.alt} onClose={close} /> : null}
    </div>
  );
}

export default EducationPage;
