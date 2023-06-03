import { Degrees, Genders, LanguageLevels, SocialsWithGithub } from "../types";
import { IDescription } from "./steps.interface";

interface IPersonalData {
  name: string;
  surname: string;
  age: number;
  gender: Genders;
  phoneNumber: string;
  email: string;
}

export interface ISkill {
  id: string;
  value: string;
}

interface IExtraData {
  bio: string;
  location: string;
}

export interface ILanguage {
  id: string;
  language: string;
  level: LanguageLevels;
}

export interface IHobby {
  id: string;
  value: string;
}

export interface IEducation {
  id: string;
  university: string;
  degree: Degrees;
  faculty: string;
  year: {
    start: number;
    end: number;
  };
}

interface IAchievement {
  id: string;
  value: string;
}

export interface IWork {
  id: string;
  position: string;
  company: string;
  location: string;
  work_period: {
    start: string;
    end: null | string;
  };
  achievements: IAchievement[];
}

export interface IResume {
  _id: string;
  createdAt: string;
  title: string;
  personalData: IPersonalData;
  socials: Record<SocialsWithGithub, string>;
  skills: ISkill[];
  extraData: IExtraData;
  awards: IDescription[];
  certificates: IDescription[];
  languages: ILanguage[];
  hobbies: IHobby[];
  education: IEducation[];
  works: IWork[];
}

export interface IInitActionPayload {
  full_name: string;
  email: string;
}

export interface RequestData{
  title: string;
  user_id: string;
  name: string;
  surname: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  skills: string[];
  bio: string;
  location: string;
  awards: (Omit<IDescription, "id" | "type"> & { _key: string })[];
  certificates: (Omit<IDescription, "id" | "type"> & { _key: string })[];
  languages: (Omit<ILanguage, "id"> & { _key: string })[];
  hobby: string[];
  education: (Omit<IEducation, "id"> & { _key: string })[];
  work: (Omit<IWork, "id" | "achievements"> & {
    _key: string;
    achievements: string[];
  })[];
}

export interface IRecordResumeRequest {
  resume: IResume;
  title: string;
  owner: string;
}
