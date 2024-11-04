interface SectionTitleProps {
  title: string;
  count?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, count }) => {
  return (
    <div className="section-title">
      <div className="section-title-text">
        <h3>{title}</h3>
        <span className="count">{count}</span>
      </div>

      <span className="section-title-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#fff"
          className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </span>
    </div>
  );
};

export default SectionTitle;
