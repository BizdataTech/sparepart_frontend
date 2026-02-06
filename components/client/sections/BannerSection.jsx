import Link from "next/link";

const BannerSection = ({ section }) => {
  return (
    <section>
      {section.data_source !== "none" ? (
        <Link href={`/${section.data_source}/${section.reference_id}`}>
          <img src={section.url} alt="" />
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default BannerSection;
