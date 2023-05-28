import { v4 as uuid4 } from "uuid";

// TODO: ANY FOR RIGHT NOW
export const ParseRawResume = (rawResume: any) => ({
  _id: rawResume._id,
  createdAt: rawResume._createdAt,
  lastUpdate: rawResume._updatedAt,
  title: rawResume.title,
  personalData: {
    name: rawResume.name,
    surname: rawResume.surname,
    age: rawResume.age,
    gender: rawResume.gender,
    phoneNumber: rawResume.phone,
    email: rawResume.email,
  },
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    github: "",
  },
  skills: rawResume.skills.map((skill: string) => ({
    id: uuid4(),
    value: skill,
  })),
  extraData: {
    bio: rawResume.bio,
    location: rawResume.location,
  },
  awards: rawResume.awards.map((award: any) => ({
    id: award._key,
    title: award.title,
    description: award.description,
    from: award.from,
    year: award.year,
    type: "award",
  })),
  certificates: rawResume.certificates.map((certificates: any) => ({
    id: certificates._key,
    title: certificates.title,
    description: certificates.description,
    from: certificates.from,
    year: certificates.year,
    type: "award",
  })),
  languages: rawResume.languages.map(
    (language: { language: string; level: string }) => ({
      id: uuid4(),
      level: language.level,
      language: language.language,
    })
  ),
  hobbies: rawResume.hobby.map((h: string) => ({
    id: uuid4(),
    value: h,
  })),
  education: rawResume.education.map((education: any) => ({
    id: education._key,
    university: education.university,
    degree: education.degree,
    faculty: education.faculty,
    year: {
      start: education.year.start,
      end: education.year.end,
    },
  })),
  works: rawResume.work.map((work: any) => ({
    id: work._key,
    position: work.position,
    company: work.company,
    location: work.location,
    work_period: {
      start: work.work_period.start,
      end: work.work_period.end,
    },
    achievements: work.achievements.map((a: string) => ({
      id: uuid4(),
      value: a,
    })),
  })),
});

// TODO: REMOVE ANY
