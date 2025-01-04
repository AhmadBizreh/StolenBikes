export interface IBike {
    id: number;
    title: string;
    description: string;
    large_img: string | null;
};


export interface BikesResponse {
    bikes: IBike[];
    nextPage: number;
    hasMore: boolean;
};