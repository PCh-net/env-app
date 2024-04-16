import { useState } from 'react';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MiniButton from './MiniButton';

interface Category {
  name: string;
  path: string;
}

interface GroupedCategories {
  [key: string]: Category[];
}

interface AccordionProps {
  categories: Category[];
  baseUrl: string;
}

const Accordion = ({ categories, baseUrl }: AccordionProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const groupCategories = (categories: Category[]): GroupedCategories => {
    const grouped: GroupedCategories = {};
    categories.forEach(category => {
      const rootPath = category.path.split('/')[0];
      if (!grouped[rootPath]) {
        grouped[rootPath] = [];
      }
      grouped[rootPath].push(category);
    });
    return grouped;
  };

  const groupedCategories = groupCategories(categories);

  const toggleAccordion = (rootPath: string) => {
    setOpenAccordion(openAccordion === rootPath ? null : rootPath);
  };

  function replaceSlashes(inputString: string): string {
    return inputString
        .replace(/\//g, ', ')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

  return (
    <div className="p-4">
      {Object.entries(groupedCategories).map(([rootPath, items]) => (
        <div key={rootPath} className="mb-4">
          <h2
            className="cursor-pointer text-lg md:text-lg lg:text-xl text-lime-800 underline hover:no-underline flex items-center py-2"
            onClick={() => toggleAccordion(rootPath)}
          >
            {openAccordion === rootPath ? (
              <KeyboardArrowDownIcon className="text-lg md:text-lg lg:text-xl text-lime-800 mr-2" />
            ) : (
              <KeyboardArrowRightIcon className="text-lg md:text-lg lg:text-xl text-lime-800 mr-2" />
            )}
            {replaceSlashes(rootPath)}
          </h2>
          {openAccordion === rootPath && (
            <div className='ml-2'>
              {items.map((item) => (
                <Link href={`/${baseUrl}/category/${item.path}`} key={item.path} className="py-2">
                  <MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false}>{item.name}</MiniButton>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
