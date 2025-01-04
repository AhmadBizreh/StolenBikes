import React, { useState, useEffect, useRef, useCallback } from 'react';
import EmptyImage from '../assets/EmptyImage.svg';
import { GetByTitleOrDescription } from '../Hooks/useBikes';
import { Avatar } from '@nextui-org/react';
import { BikesResponse, IBike } from '../types/Ibike';
import { useNavigate } from 'react-router-dom';
import { UseInfiniteQueryResult } from 'react-query';

const SearchBar = () => {
  const [initialFilters, setInitialFilters] = useState<string>('');
  const [filtersData, setFiltersData] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<IBike | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = GetByTitleOrDescription(filtersData) as UseInfiniteQueryResult<BikesResponse, unknown>;

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInitialFilters(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setFiltersData(value);
    }, 1500);

    if (value.trim() === '') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const handleSelectItem = (item: IBike) => {
    setSelectedItem(item);
    setInitialFilters('');
  };

  useEffect(() => {
    if (selectedItem) {
      navigate(`/Case/${selectedItem.id}`);
    }
  }, [selectedItem, navigate]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setInitialFilters('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (
      suggestionsRef.current &&
      suggestionsRef.current.scrollHeight - suggestionsRef.current.scrollTop <=
      suggestionsRef.current.clientHeight + 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const suggestionsEl = suggestionsRef.current;
    if (suggestionsEl) {
      suggestionsEl.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (suggestionsEl) {
        suggestionsEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <div className="relative mt-10">
        <label htmlFor="searchInput" className='mb-2 block text-center'>Find Bikes By Name</label>
        <input
          type="text"
          id="searchInput"
          value={initialFilters}
          onChange={handleInputChange}
          placeholder="Search for Bikes..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
        />
        {isLoading && initialFilters.trim() !== '' ? (
          <div className="absolute bottom-[-50%] left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded text-lg z-50">Loading...</div>
        ) : (
          initialFilters && data && (
            <div ref={suggestionsRef} className="absolute top-full left-0 w-full bg-white border border-gray-300 max-h-72 overflow-y-auto z-50">
              {data.pages.map((page) => (
                page.bikes.length === 0 ? (
                  <div className='flex justify-center items-center bg-gray-200 text-gray-700 p-2 mt-2 rounded'>
                    No matching data to display
                  </div>
                ) : (
                  page.bikes.map((item: IBike) => (
                    <div className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer" key={item.id} onClick={() => handleSelectItem(item)}>
                      <Avatar
                        alt={item.title}
                        className="flex-shrink-0 mr-2"
                        size="sm"
                        src={item.large_img ? item.large_img : EmptyImage}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{item.title}</span>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </div>
                    </div>
                  ))
                )
              ))}
              {isFetchingNextPage && <div className='flex justify-center items-center bg-gray-200 text-gray-700 p-2 mt-2 rounded'>Loading more...</div>}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SearchBar;