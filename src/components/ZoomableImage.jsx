/**
 * 클릭하면 확대 보기가 열리는 이미지.
 * 기존에는 <img onClick>이라 키보드로 열 수 없었으므로 button으로 감싸 접근성을 확보했습니다.
 * href가 있으면 확대 대신 외부 링크로 이동합니다.
 */
function ZoomableImage({ src, alt, className, href, onZoom }) {
  const image = <img src={src} alt={alt} className={className} />;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="image-link">
        {image}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="image-zoom-button"
      aria-label={`${alt} 이미지 크게 보기`}
      onClick={() => onZoom(src, alt)}
    >
      {image}
    </button>
  );
}

export default ZoomableImage;
