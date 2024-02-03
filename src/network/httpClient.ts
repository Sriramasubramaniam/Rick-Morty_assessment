import axios, { AxiosError, AxiosResponse } from "axios";
import { FilterDeps } from "../render/DisplayCharacters";

type ImageUrl = string;
export type CharacterStatus = "Alive" | "Dead" | "unknown";
export interface CharacterDetail {
    name: string;
    status: CharacterStatus;
    image: ImageUrl;
}
interface PageInfo {
    count: number;
    pages: number;
}
interface Response {
    info: PageInfo;
    results: CharacterDetail[];
}

export const genericGetCall = async (url: string, filters: FilterDeps) => {
    try {
        const { data }: AxiosResponse<Response> = await axios.get(url, {
            params: {
                page: 1,
                name: filters.name,
                status: filters.alive ? "alive" : filters.dead ? "dead" : "",
            },
        });
        const pageInfo = data.info as PageInfo;
        const charactersData: CharacterDetail[] = data.results as CharacterDetail[]; // this can be further tightened to allow only required fields
        return { info: pageInfo, charactersData };
    } catch (err) {
        console.error("Error fetching data:", (err as AxiosError).message);
        return false;
    }
};

