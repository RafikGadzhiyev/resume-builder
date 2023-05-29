import { v4 as uuid4 } from "uuid";
import {
  IEducation,
  IRecordResumeRequest,
  IWork,
  RequestData,
} from "../interfaces/resume.interface";
import { IDescription } from "../interfaces/steps.interface";
import { SanityDocument } from "@sanity/client";
import { ILogin, IUserMutation } from "../interfaces/auth.interface";
import { Simulate } from "react-dom/test-utils";
import doubleClick = Simulate.doubleClick;

export const ConstructDataForRecordResume = (
  payload: IRecordResumeRequest
): RequestData => {
  return {
    title: payload.title,
    user_id: payload.owner,
    name: payload.resume.personalData.name,
    surname: payload.resume.personalData.surname,
    email: payload.resume.personalData.email,
    age: payload.resume.personalData.age,
    gender: payload.resume.personalData.gender,
    phone: payload.resume.personalData.phoneNumber,
    skills: payload.resume.skills.map((skill) => skill.value),
    bio: payload.resume.extraData.bio,
    location: payload.resume.extraData.location,
    languages: payload.resume.languages.map((language) => ({
      _key: uuid4(),
      language: language.language,
      level: language.level,
    })),
    awards: payload.resume.awards.map((award: IDescription) => ({
      _key: uuid4(),
      title: award.title,
      year: award.year,
      from: award.from,
      description: award.description,
    })),
    certificates: payload.resume.certificates.map(
      (certificate: IDescription) => ({
        _key: uuid4(),
        title: certificate.title,
        year: certificate.year,
        from: certificate.from,
        description: certificate.description,
      })
    ),
    hobby: payload.resume.hobbies.map((hobby) => hobby.value),
    education: payload.resume.education.map((education: IEducation) => ({
      _key: uuid4(),
      university: education.university,
      degree: education.degree,
      faculty: education.faculty,
      year: {
        _key: uuid4(),
        start: education.year.start,
        end: education.year.end,
      },
    })),
    work: payload.resume.works.map((work: IWork) => ({
      _key: uuid4(),
      position: work.position,
      company: work.company,
      location: work.location,
      work_period: {
        _key: uuid4(),
        start: work.work_period.start,
        end: work.work_period.end,
      },
      achievements: work.achievements.map((a) => a.value),
    })),
  };
};

export const ConstructDataFromSanityDocument = (
  document: SanityDocument<IUserMutation>
): ILogin => {
  return {
    id: document._id,
    given_name: document.first_name,
    age: document.age,
    email: document.email,
    created_at: Number(new Date(document._createdAt)),
    full_name: document.first_name + " " + (document.last_name || ""),
    exp: Number(new Date(document._createdAt)) + 4 * 60 * 60 * 1000,
    family_name: document.last_name || "",
  };
};
