function Navbar() {

  return (
    <>
      <div className="flex flex-wrap rounded-lg shadow-md my-5">

        <div className="px-3 mb-6  mx-auto w-11/12 bg-white rounded-xl">

          <div className="sm:flex items-stretch justify-between grow lg:mb-0 py-5 px-5">

            <div className="flex my-2 flex-col flex-wrap justify-center mb-5 mr-3 lg:mb-0">

              <span className="my-0 flex text-dark font-semibold text-[1.35rem]/[1.2] flex-col justify-center">
                Web Scrapy
              </span>

              <span className="pt-1 text-secondary-dark text-[0.95rem] font-medium">
                App For Web Scraping
              </span>

            </div>

            <div className="flex items-center lg:shrink-0 lg:flex-nowrap">

              <div className="relative flex items-center lg:ml-4 sm:mr-0 mr-2">

                <span className="absolute ml-4 leading-none -translate-y-1/2 top-1/2 text-muted">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                  </svg>

                </span>

                <input className="block w-full min-w-[70px] py-3 pl-12 pr-4 text-base font-medium leading-normal bg-white border border-solid outline-none appearance-none placeholder:text-secondary-dark peer text-stone-500 border-stone-200 bg-clip-padding rounded-2xl" placeholder="Search..." type="text" />

              </div>

            </div>

          </div>

        </div>

      </div>
    </>

  );

}

export default Navbar;