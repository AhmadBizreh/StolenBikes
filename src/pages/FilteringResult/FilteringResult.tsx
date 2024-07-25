import HomeCard from "../../components/HomeCard";

import SearchBar from "../../components/SearchBar";
import { useLocation } from 'react-router-dom';

const FilteringResult = () => {

    const location = useLocation();
    const { selectedItem } = location.state;

    const Bike = selectedItem;

    return (
        <>
            <div className="px-5 pt-5">
                <SearchBar />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 p-5">
                {Bike &&
                    <HomeCard data={Bike} key={Bike.id} />
                }
            </div>
        </>
    );
};

export default FilteringResult;
