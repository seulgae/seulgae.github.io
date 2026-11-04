import "../styles/brandSignature.css";

function BrandSignature({ blog = false }) {
  return (
    <span className="brand-signature" aria-hidden="true">
      <span>gth<span className="brand-signature-brackets">();</span></span>
      {blog && <span className="brand-signature-context">/ blog</span>}
    </span>
  );
}

export default BrandSignature;
