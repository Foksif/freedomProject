import {apiConfig} from "../configs/api.config.ts";
import {IProfile} from "../types/profile.type.ts";
import axios from "../utils/axios.ts";

class ProfileService {
    private readonly url: string = `${apiConfig.baseURL}${apiConfig.user}`;

    getMe() {
        return axios.get<IProfile>(`${this.url}/get/me`);
    }

    changeAvatar() {
    }

    changeSkin() {
    }

    changePassword() {
    }

    changeCape()  {
    }

}

export const profileService = new ProfileService();