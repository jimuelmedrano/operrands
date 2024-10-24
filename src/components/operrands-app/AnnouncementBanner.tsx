const AnnouncementBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-5 bg-primary flex-center">
      <div className="flex-center">
        <span className="text-xs text-primary-foreground">
          Note: This website is currently a work in progress.
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
