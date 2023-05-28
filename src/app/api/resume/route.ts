import { NextApiResponse } from "next";
import axios from "axios";
import { ParseRawResume } from "../../../../utils/parse";
import { NextResponse } from "next/server";
import { client } from "../../../../utils/sanity";

const CMS_BASE_URL = process.env.SANITY_BASE_URL;
const CMS_DATASET = process.env.SANITY_DATASET;
const CMS_ACCESS_TOKEN = process.env.SANITY_TEST_TOKEN;

export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    const parsedURL = new URL(req.url || "");
    const id = parsedURL.searchParams.get("id");
    const user_id = parsedURL.searchParams.get("user_id");
    if (id !== null) {
      const request = await axios.get(
        `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[_id == "${id}"][0]`
      );
      const result = request.data.result;
      const parsedResume = ParseRawResume(result);
      return new NextResponse(
        JSON.stringify({
          resume: parsedResume,
        }),
        { status: 200 }
      );
    } else {
      let url = "";
      if (user_id) {
        url = `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[owner == "${user_id}"]`;
      } else {
        url = `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[_type == "resume"]`;
      }

      const request = await axios.get(url);
      const result = request.data.result;
      // parse each resume record into IResume
      const parsedResult = [];
      for (let resumeRecord of result) {
        const parsedResume = ParseRawResume(resumeRecord);
        // console.log(resumeRecord.education);
        parsedResult.push(parsedResume);
      }

      return new NextResponse(
        JSON.stringify({
          result: parsedResult,
        }),
        { status: 200 }
      );
    }
  } catch (e) {
    // console.log(e.message);
  }
};
export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const data = await req.json();
    const constructedData = {
      mutations: [
        {
          create: {
            _type: "resume",
            title: data.title,
            owner: data.user_id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            age: data.age,
            gender: data.gender,
            phone: data.phone,
            skills: data.skills,
            bio: data.bio,
            location: data.location,
            languages: data.languages,
            hobby: data.hobby,
            education: data.education,
            work: data.work,
            certificates: data.certificates,
            awards: data.awards,
          },
        },
      ],
    };
    const create_resume = await axios.post(
      `${CMS_BASE_URL}mutate/${CMS_DATASET}?returnIds=true`,
      JSON.stringify(constructedData),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CMS_ACCESS_TOKEN}`,
        },
      }
    );
    const resumeId = create_resume.data.results[0].id;
    const userData = await axios.get(
      `${CMS_BASE_URL}query/${CMS_DATASET}?query=*[_id == "${data.user_id}"]`
    );
    const user = userData.data.result[0];

    user.resumes.push(resumeId);
    const dr = await axios.post(
      `${CMS_BASE_URL}mutate/${CMS_DATASET}`,
      JSON.stringify({
        mutations: [
          {
            createOrReplace: {
              ...user,
            },
          },
        ],
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CMS_ACCESS_TOKEN}`,
        },
      }
    );
    return new NextResponse(
      JSON.stringify({
        id: resumeId,
        status: "Ok",
        message: "Successfully created!",
      }),
      { status: 200 }
    );
  } catch (e) {}
};
export const PATCH = async (req: Request, res: NextApiResponse) => {
  try {
    const parsedRequest = await req.json();
    const { resumeId, newData } = parsedRequest;

    return await client
      .patch(resumeId)
      .set(newData)
      .commit()
      .then(
        () =>
          new NextResponse(JSON.stringify({ message: "Updated" }), {
            status: 200,
          })
      )
      .catch(
        (e) =>
          new NextResponse(JSON.stringify({ message: e.message }), {
            status: e.status,
          })
      );
  } catch (e) {
    // console.log(e.message);
  }
};

export const DELETE = async (req: Request, res: NextApiResponse) => {
  try {
    const parsedURL = new URL(req.url || "");
    const resumeId = parsedURL.searchParams.get("resume_id");
    const userId = parsedURL.searchParams.get("user_id");
    if (resumeId === null || userId === null) {
      return new NextResponse(
        JSON.stringify({
          message: "Some data was not provided!",
        }),
        { status: 403 }
      );
    }
    client
      .delete(resumeId)
      .then(() => console.log("Resume successfully deleted!"))
      .catch((err) => console.log(err.message));

    client
      .patch(userId)
      .unset([`resumes[@ == "${resumeId}"]`])
      .commit()
      .then((result) => console.log("pushed"))
      .catch((err) => console.log(err.message));

    return new NextResponse(JSON.stringify({ message: "Resume deleted!" }), {
      status: 200,
    });
  } catch (e: any) {
    console.log(e.message);
  }
};

export const PUT = async (req: Request, res: NextApiResponse) => {
  try {
    const parsedRequest = await req.json();
    const { resume, userId } = parsedRequest;
    let data: any;
    await client
      .create({
        _type: "resume",
        title: resume.title,
        owner: resume.user_id,
        name: resume.name,
        surname: resume.surname,
        email: resume.email,
        age: resume.age,
        gender: resume.gender,
        phone: resume.phone,
        skills: resume.skills,
        bio: resume.bio,
        location: resume.location,
        languages: resume.languages,
        hobby: resume.hobby,
        education: resume.education,
        work: resume.work,
        certificates: resume.certificates,
        awards: resume.awards,
      })
      .then((result) => {
        data = result;
      })
      .catch((error) =>
        res.status(500).json({
          message: error.message,
          status: error.status,
        })
      );
    const result = await client
      .patch(userId)
      .insert("after", "resumes[-1]", [data._id])
      .commit()
      .then(
        () =>
          new NextResponse(
            JSON.stringify({
              message: "Duplicated!",
              result: ParseRawResume(data),
            }),
            { status: 200 }
          )
      )
      .catch(
        (error) =>
          new NextResponse(
            JSON.stringify({
              message: error.message,
              status: error.status,
            }),
            { status: 500 }
          )
      );
    if (!result.ok) {
      return new NextResponse(
        JSON.stringify({
          message: "Did not duplicate!",
        }),
        {
          status: 500,
        }
      );
    }

    return result;
  } catch (e) {}
};
