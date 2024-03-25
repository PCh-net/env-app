import Image from 'next/image';

const Footer = () => {
  return (
    <nav className="absolute bottom-0 z-50 w-screen bg-gray-200 opacity-95 shadow dark:bg-gray-900 sm:sticky sm:top-0">
      <div className="container mx-auto px-6 py-2">
        <div className="justify-between md:flex md:items-center">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-rose-400">
              {/* Zmiana <svg> na JSX i używanie Image z Next.js dla obrazu logo */}
              <a className="mx-2 mt-2 hidden transform rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 sm:block md:mt-0 md:text-2xl">TocinoCode</a>
            </div>
            {/* Menu i inne elementy */}
            <div className="mx-4 hidden sm:block md:justify-between">
              <div className="listmenu max-mx-4 flex md:mx-8 md:items-center lg:flex-row">
                {/* Linki menu */}
                <a className="mx-2 mt-2 hidden transform rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-rose-400 hover:text-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 sm:block md:mt-0">Chats</a>
                {/* Inne linki */}
              </div>
            </div>
            {/* Avatar użytkownika */}
            <div className="mt-2 flex items-center sm:absolute sm:right-4">
              <div className="relative">
                <button type="button" className="items-center focus:outline-none" aria-label="toggle profile dropdown">
                  <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-gray-700 duration-150 hover:scale-105 hover:border-rose-400">
                    <Image src="https://cdn.imagecomics.com/assets/img/default-user-square.svg" alt="avatar" width={32} height={32} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden" id="userNamesession"></h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
