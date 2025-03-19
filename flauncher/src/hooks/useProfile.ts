import {useQuery} from "@tanstack/react-query";
import {profileService} from "../services/profile.service.ts";
import {IProfile} from "../types/profile.type.ts";

export function useProfile() {
    const { data } = useQuery<IProfile>({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await profileService.getMe();
            return response.data;
        }
    })

    return { data }
}