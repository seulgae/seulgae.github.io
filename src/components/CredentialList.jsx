import ExternalLinks from "./ExternalLinks";
import Lightbox from "./Lightbox";
import ZoomableImage from "./ZoomableImage";
import { useLightbox } from "../hooks/useLightbox";
import { assetUrl } from "../utils/text";
import "../styles/credentials.css";

/**
 * 이미지 + 제목 + 일자 + 설명 + 링크 형태의 카드 목록.
 * Awards와 Licenses가 거의 같은 컴포넌트였으므로 dateLabel만 다르게 받아 하나로 합쳤습니다.
 *
 * items: [{ id, title, date, description, image, links? }]
 */
function CredentialList({ items = [], dateLabel = "일자" }) {
  const { zoomed, open, close } = useLightbox();

  return (
    <div className="credential-list">
      {items.map((item) => {
        const imageSrc = assetUrl(item.image);

        return (
          <article key={item.id} className="credential-card">
            <ZoomableImage
              src={imageSrc}
              alt={item.title}
              className="credential-image"
              onZoom={open}
            />
            <div className="credential-details">
              <h2>{item.title}</h2>
              <p className="credential-date">
                <strong>{dateLabel}</strong> {item.date}
              </p>
              <p>{item.description}</p>
              <ExternalLinks links={item.links} />
            </div>
          </article>
        );
      })}

      {zoomed ? <Lightbox src={zoomed.src} alt={zoomed.alt} onClose={close} /> : null}
    </div>
  );
}

export default CredentialList;
