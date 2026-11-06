import "../styles/brandSignature.css";

function BrandSignature({ blog = false }) {
  return (
    <span className="brand-signature" aria-hidden="true">
      <span>
        gth<span className="brand-signature-brackets">(</span><span className="brand-signature-context">{blog ? "blog" : "portfolio"}</span><span className="brand-signature-brackets">);</span>
      </span>
    </span>
  );
}

export default BrandSignature;
