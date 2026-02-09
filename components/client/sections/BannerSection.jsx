import Link from "next/link";

const BannerSection = ({ section }) => {
  return (
    <section className="w-full">
      {section.data_source !== "none" ? (
        <Link href={`/${section.data_source}/${section.reference_id}`}>
          <img
            src={section.secure_url}
            alt="banner image"
            className="w-full h-[12rem] lg:h-[45rem] object-cover"
          />
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default BannerSection;
