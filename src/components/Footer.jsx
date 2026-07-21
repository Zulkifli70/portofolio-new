function Footer() {
  return (
    <footer className="w-full lg:min-h-60 px-5 flex flex-col font-space">
      <div className="w-full flex flex-col flex-1 border-t-2 border-t-gray-500 gap-5 md:p-5 lg:gap-0 pt-3 lg:pt-0">
        <div className="flex lg:flex-1 justify-between lg:items-center h-2/3">
          <h2 className="text-xl lg:text-4xl xl:text-7xl">
            Let's Get in Touch
          </h2>
          <a
            href="mailto:firdausi.zulkifli@gmail.com"
            className="text-xl lg:text-4xl xl:text-6xl border-b-2 border-b-gray-500"
          >
            firdausi.zulkifli@gmail.com
          </a>
        </div>
        <div className="flex lg:flex-1 justify-between items-center py-5 lg:p-2">
          <h2 className="md:text-xl lg:text-2xl">
            {new Date().getFullYear()} - Zulkifli Firdausi
          </h2>
          <div className="flex gap-3 xl:gap-10">
            <a
              href="https://github.com/Zulkifli70"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center"
            >
              <img
                src="/techIcons/github.png"
                alt="zulkifli github account"
                className="w-10 xl:w-15 object-cover"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/zulkifli-firdausi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center"
            >
              <img
                src="/techIcons/linkedin.png"
                alt="zulkifli linked in account"
                className="w-10 xl:w-15 object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
