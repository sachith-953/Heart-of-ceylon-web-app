import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CategoryLevel1Skeliton from './CategoryLevel1Skeliton';

// Define the interface for the category objects
interface Category {
  categoryName: string;
}

const CategoryLevel1 = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([]); // Use the interface here

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("request sending to nextjs API");

      const res = await fetch('http://localhost:3000/api/product/category-level-1', { cache: 'no-store' });

      console.log("res" + res);

      const responseData = await res.json();

      setIsLoading(false)

      console.log(responseData);

      console.log("img test");
      console.log(responseData[5].categoryName);

      setCategories(responseData);
    };

    fetchCategories();
  }, []);

  return (

    <>

        {isLoading
          ?
          <div className='w-full'>
            <CategoryLevel1Skeliton />
          </div>
          :
          <div>
            <div className="p-4">
              <h2 className="text-lg font-semibold underline mb-2">All Categories</h2>
              <ul className="list-none">
                {categories.map((category, index) => (
                  <li key={index} className="p-2 border-b border-gray-300 hover:bg-gray-200">
                    <Link
                      href={`/category/${category.categoryName.toLowerCase().replace(/ /g, '-')}`}
                      className="cursor-pointer"
                    >
                      <strong>{category.categoryName}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }

    </>

  );
};

export default CategoryLevel1;
