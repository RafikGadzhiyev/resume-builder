import { IResume } from "../interfaces/resume.interface";

export const InitialResume: IResume = {
  _id: "",
  title: "Draft",
  createdAt: "",
  personalData: {
    name: "",
    surname: "",
    age: 0,
    gender: "other",
    email: "",
    phoneNumber: "",
  },
  socials: {
    facebook: "",
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },
  skills: [],
  extraData: {
    bio: "",
    location: "",
  },
  awards: [],
  certificates: [],
  languages: [],
  hobbies: [],
  education: [],
  works: [],
};
