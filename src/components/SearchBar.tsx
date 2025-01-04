import React, { useState, useEffect, useRef, useCallback } from 'react';
import EmptyImage from '../assets/EmptyImage.svg';
import { GetByTitleOrDescription } from '../Hooks/useBikes';
import { Avatar } from '@nextui-org/react';
import '../style/searchBar.css';
import { BikesResponse, IBike } from '../types/Ibike';
import { useNavigate } from 'react-router-dom';
import { UseInfiniteQueryResult } from 'react-query';

const SearchBar: React.FC = () => {
  const [initialFilters, setInitialFilters] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<IBike | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = GetByTitleOrDescription(initialFilters) as UseInfiniteQueryResult<BikesResponse, unknown>;

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const value = e.target.value;
    setInitialFilters(value);
    refetch();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
    }
  };

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
      <div className="autocomplete mt-10">
        <label htmlFor="searchInput" className='mb-2'>Find Bikes By Name</label>
        <div className="autocomplete-input">
          <input
            type="text"
            id="searchInput"
            value={initialFilters}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for Bikes..."
          />
        </div>
        {isLoading ? (
          <div className="loading-search-bar">Loading...</div>
        ) : (
          initialFilters && data && (
            <div ref={suggestionsRef} className="autocomplete-suggestions">
              {data.pages.map((page) =>
                page.bikes.map((item: IBike) => (
                  <div className="suggestion" key={item.id} onClick={() => handleSelectItem(item)}>
                    <Avatar
                      alt={item.title}
                      className="flex-shrink-0 mr-2"
                      size="sm"
                      src={item.large_img ? item.large_img : EmptyImage}
                    />
                    <div className="flex flex-col">
                      <span className="text-small clickable">{item.title}</span>
                      <span className="text-tiny text-default-400">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))
              )}
              {isFetchingNextPage && <div className='load-more-search-bar'>Loading more...</div>}
            </div>
          )
        )}

      </div>
    </>
  );
};

export default SearchBar;
