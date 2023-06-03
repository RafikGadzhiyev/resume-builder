import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import {
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaLocationArrow,
} from "react-icons/fa";
import { AppDispatch, RootState } from "../../state/store";
import { useDebounce } from "../../hooks/useDebounce";
import { Socials } from "../../types";
import { updateResume } from "../../state/slices/resume.slice";
import { Input } from "../../elements/Inputs";
import { StepContainer, StepTitle } from "../../elements/StepsUI";


const ContactForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 0.5rem;
  justify-content: space-between;
  padding-inline: 1rem;
  margin-top: 2rem;
`;

const ContactBlock = styled.div`
  display: flex;
  align-items: center;
  width: 48%;
  gap: .5rem;
  justify-content: space-between;
`;

const ContactInput = styled(Input)`
  align-self: center;
  margin: 0;
`;

export const StepTwo = () => {
  const resumeData = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [socials, setSocials] = useState<
    Record<Exclude<Socials, "twitter" | "facebook">, string>
  >({
    instagram: "",
    linkedin: "",
  });

  const [
    debouncedEmailValue,
    debouncedPhoneValue,
    debouncedInstagramValue,
    debouncedLinkedinValue,
    debouncedLocationValue,
  ] = [
    useDebounce(email, 500, true),
    useDebounce(phone, 500, true),
    useDebounce(socials.instagram, 500, true),
    useDebounce(socials.linkedin, 500, true),
    useDebounce(location, 500, true),
  ];

  useEffect(() => {
    setEmail(() => resumeData.personalData.email);
    setPhone(() => resumeData.personalData.phoneNumber);
    setLocation(() => resumeData.extraData.location);
  }, [
    resumeData.personalData.email,
    resumeData.personalData.phoneNumber,
    resumeData.extraData.location,
  ]);

  useEffect(() => {
    dispatch(
      updateResume({
        ...resumeData,
        personalData: {
          ...resumeData.personalData,
          email: debouncedEmailValue,
          phoneNumber: debouncedPhoneValue,
        },
        socials: {
          ...resumeData.socials,
          ...socials,
        },
        extraData: {
          ...resumeData.extraData,
          location: debouncedLocationValue,
        },
      })
    );
  }, [
    debouncedEmailValue,
    debouncedPhoneValue,
    debouncedInstagramValue,
    debouncedLinkedinValue,
    debouncedLocationValue,
    dispatch,
    socials,
  ]);

  return (
    <StepContainer>
      <StepTitle>
        Now we&apos;d like to know your contact information
        <ContactForm>
          <ContactBlock>
            <FaEnvelope />
            <ContactInput
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
              tabIndex={-1}
            />
          </ContactBlock>
          <ContactBlock>
            <FaPhoneAlt />
            <ContactInput
              placeholder="Your Phone number"
              value={phone}
              onChange={(e) => setPhone(() => e.target.value)}
            />
          </ContactBlock>
          <ContactBlock>
            <FaLocationArrow />
            <ContactInput
              placeholder="Your Location"
              value={location}
              onChange={(e) => setLocation(() => e.target.value)}
            />
          </ContactBlock>
          <ContactBlock>
            <FaLinkedinIn />
            <ContactInput
              placeholder="Your Linkedin"
              name="linkedin"
              value={socials.linkedin}
              onChange={(e) =>
                setSocials((prev) => ({
                  ...prev,
                  linkedin: e.target.value,
                }))
              }
            />
          </ContactBlock>
          <ContactBlock>
            <FaInstagram />
            <ContactInput
              placeholder="Your Instagram"
              name="instagram"
              value={socials.instagram}
              onChange={(e) =>
                setSocials((prev) => ({
                  ...prev,
                  instagram: e.target.value,
                }))
              }
            />
          </ContactBlock>
        </ContactForm>
      </StepTitle>
    </StepContainer>
  );
};
