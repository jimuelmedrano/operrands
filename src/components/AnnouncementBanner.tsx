const AnnouncementBanner = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-5 bg-primaryDark flex-center">
      <div className="flex-center">
        <span className="text-xs dark:text-black">
          Note: This website is currently a work in progress.
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
