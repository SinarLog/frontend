export default function CarouselSlideInfo({ children }) {
  return <div className="carousel w-full relative">{children}</div>;
}

/**
 * @param {{no: number, children: React.Component, withNext: boolean}} param
 * @returns
 */
export function Slide({ no = 1, children, withNext = true }) {
  return (
    <div id={`slide${no}`} className="carousel-item relative w-full">
      {children}
    </div>
  );
}

export function SlideButton({
  currentSlide = 1,
  totalSlides,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="absolute flex justify-between transform -translate-y-1/2 -left-8 -right-8 top-1/2">
      {currentSlide !== 1 ? (
        <a
          href={`#slide${currentSlide - 1}`}
          defaultValue={-1}
          className="btn btn-secondary-normal btn-circle text-white animate__animated animate__fadeInLeft animate__faster"
          onClick={handlePrev}
        >
          ❮
        </a>
      ) : (
        <div></div>
      )}
      {currentSlide !== totalSlides ? (
        <a
          href={`#slide${currentSlide + 1}`}
          defaultValue={1}
          className="btn btn-secondary-normal btn-circle text-white animate__animated animate__fadeInRight animate__faster"
          onClick={handleNext}
        >
          ❯
        </a>
      ) : (
        <div></div>
      )}
    </div>
  );
}
