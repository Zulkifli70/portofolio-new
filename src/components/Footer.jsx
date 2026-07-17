function Footer() {
  return (
    <footer className="w-full lg:min-h-80 px-5 flex flex-col font-neuton">
      <div className="w-full flex flex-col flex-1 border-t border-t-gray-500 gap-5 md:p-5 lg:gap-0 pt-3 lg:pt-0">
        <div className="flex lg:flex-1 justify-between lg:items-center h-2/3">
          <h2 className="text-xl lg:text-7xl">Let's Get in Touch</h2>
          <a
            href="mailto:firdausi.zulkifli@gmail.com"
            className="text-xl lg:text-6xl border-b-2 border-b-gray-500"
          >
            firdausi.zulkifli@gmail.com
          </a>
        </div>
        <div className="flex lg:flex-1 justify-between items-center lg:p-2">
          <h2 className="md:text-xl">
            {new Date().getFullYear()} - Zulkifli Firdausi
          </h2>
          <div className="flex gap-10">
            <a
              href="https://github.com/Zulkifli70"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center"
            >
              <p>Github</p>
              <img
                src="/techIcons/github.png"
                alt="zulkifli github account"
                className="w-7 object-cover"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/zulkifli-firdausi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center"
            >
              <p>LinkedIn</p>
              <img
                src="/techIcons/linkedin.png"
                alt="zulkifli linked in account"
                className="w-7 object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
