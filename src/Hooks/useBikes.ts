import toast from "react-hot-toast";
import { useInfiniteQuery, useQuery } from "react-query";
import { UseInfiniteQueryResult } from 'react-query';
import { BikeInstance } from "../services/APIs/Bikes";
import handleError from "../utils/handleFetchError";
import { BikesResponse } from "../types/Ibike";

const CACHE_TIME = 240000; // 4 minutes in milliseconds

const Get = (params: any) => {
    return useQuery({
        queryKey: ["Bikes"],
        queryFn: async () => await BikeInstance.Get(params).then(res => res?.data.bikes),
        onSuccess: () => toast.success('Bikes fetched successfully'),
        onError: handleError,
        refetchOnWindowFocus: false,
        cacheTime: CACHE_TIME,
    })
}

const GetByTitleOrDescription = (query: string): UseInfiniteQueryResult<BikesResponse, unknown> => {
    return useInfiniteQuery<BikesResponse, unknown>(
        ['Bikes', query],
        async ({ pageParam = 1 }) => {
            const res = await BikeInstance.Get({ query, page: pageParam });
            return {
                bikes: res?.data.bikes,
                nextPage: pageParam + 1,
                hasMore: res?.data.bikes.length > 0,
            };
        },
        {
            getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
            onError: (error) => {
                console.error('Error fetching bikes:', error);
            },
            refetchOnWindowFocus: false,
            enabled: !!query,
            cacheTime: CACHE_TIME,
        }
    );
};

const GetById = (id: number) => {
    return useQuery({
        retry: false,
        queryKey: ["Bikes", id],
        queryFn: async () => await BikeInstance.GetById(id).then(res => res?.data.bike),
        onError: handleError,
        refetchOnWindowFocus: false,
        cacheTime: CACHE_TIME,
    })
}

const GetCounts = () => {
    return useQuery({
        retry: false,
        queryKey: ["BikeCounts"],
        queryFn: async () => await BikeInstance.Get_Counts().then(res => res?.data),
        onSuccess: () => toast.success('Bike counts fetched successfully'),
        onError: handleError,
        refetchOnWindowFocus: false
    })
}

export { Get, GetById, GetByTitleOrDescription, GetCounts };
