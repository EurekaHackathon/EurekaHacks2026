"use client";

import { Input } from "@/components/Input";
import { SchoolSelect } from "@/components/SchoolSelect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { CitySelect } from "@/components/CitySelect";
import { dietaryRestrictionsList } from "@/app/(dashboard)/dashboard/application/data";
import { Checkbox } from "@/components/Checkbox";
import { Icon } from "@iconify/react";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { apply } from "@/lib/actions/application";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/Dialog";

const initialState = {
  error: "",
  fieldErrors: {} as Record<string, string>,
  payload: new FormData(),
};

export default function ApplicationForm() {
  const [state, formAction, pending] = useActionState(apply, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const defaultYears = ["2026", "2027", "2028", "2029", "other"];
  const [graduationYear, setGraduationYear] = useState(
    defaultYears.includes(
      (state.payload?.get("graduation-year") as string | undefined) ?? "",
    )
      ? (state.payload?.get("graduation-year") ?? undefined)
      : undefined,
  );
  const initialDietaryRestrictions: Record<string, boolean> = {};
  dietaryRestrictionsList.forEach(
    (name) => (initialDietaryRestrictions[name] = false),
  );
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    initialDietaryRestrictions,
  );
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    setClientErrors({});
    setGraduationYear(
      defaultYears.includes(
        (state.payload?.get("graduation-year") as string | undefined) ?? "",
      )
        ? (state.payload?.get("graduation-year") ?? undefined)
        : undefined,
    );
    if (state.error) {
      toast({
        variant: "error",
        title: "Error",
        description: state.error,
      });
    }
    dietaryRestrictionsList.forEach((name) => {
      if (state.payload?.get(name)) {
        setDietaryRestrictions({
          ...dietaryRestrictions,
          [name]: true,
        });
      }
    });
  }, [state]);

  const isValidUrl = (url: string) => {
    try { new URL(url); return true; } catch { return false; }
  };

  const validateForm = (): Record<string, string> => {
    if (!formRef.current) return {};
    const fd = new FormData(formRef.current);
    const errors: Record<string, string> = {};

    const firstName = (fd.get("first-name") as string)?.trim();
    if (!firstName) errors["first-name"] = "First name is required.";
    else if (firstName.length > 128) errors["first-name"] = "First name must be less than 128 characters.";

    const lastName = (fd.get("last-name") as string)?.trim();
    if (!lastName) errors["last-name"] = "Last name is required.";
    else if (lastName.length > 128) errors["last-name"] = "Last name must be less than 128 characters.";

    const email = (fd.get("email") as string)?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors["email"] = "Invalid email address.";

    const age = parseInt(fd.get("age") as string, 10);
    if (isNaN(age) || age < 1 || age > 150) errors["age"] = "Please enter a valid age.";

    const school = (fd.get("school") as string)?.trim();
    if (!school) errors["school"] = "School is required.";

    let gradYear = fd.get("graduation-year") as string;
    if (gradYear === "other") gradYear = fd.get("graduation-year-other") as string;
    const gradYearNum = parseInt(gradYear, 10);
    if (isNaN(gradYearNum) || gradYearNum < 2000 || gradYearNum > 2030)
      errors["graduation-year"] = "Please enter a valid graduation year.";

    const city = (fd.get("city") as string)?.trim();
    if (!city) errors["city"] = "City is required.";

    const hackathons = parseInt(fd.get("number-hackathons-attended") as string, 10);
    if (isNaN(hackathons) || hackathons < 0)
      errors["number-hackathons-attended"] = "Invalid number of hackathons attended.";

    const github = (fd.get("github") as string)?.trim();
    if (github && !isValidUrl(github)) errors["github"] = "Invalid GitHub URL";

    const linkedin = (fd.get("linkedin") as string)?.trim();
    if (linkedin && !isValidUrl(linkedin)) errors["linkedin"] = "Invalid LinkedIn URL";

    const portfolio = (fd.get("portfolio") as string)?.trim();
    if (portfolio && !isValidUrl(portfolio)) errors["portfolio"] = "Invalid portfolio URL";

    const resume = (fd.get("resume") as string)?.trim();
    // any value accepted for resume/website link

    const emergencyName = (fd.get("emergency-contact-full-name") as string)?.trim();
    if (!emergencyName) errors["emergency-contact-full-name"] = "Emergency contact full name is required.";

    const emergencyPhone = (fd.get("emergency-contact-phone") as string)?.trim();
    if (!emergencyPhone || emergencyPhone.replace(/\D/g, "").length < 10)
      errors["emergency-contact-phone"] = "Please enter a valid phone number.";

    const tshirt = fd.get("tshirt-size") as string;
    if (!tshirt) errors["tshirt-size"] = "Please select a t-shirt size.";

    const shortAnswer = (fd.get("short-answer") as string)?.trim();
    if (!shortAnswer) errors["short-answer"] = "Short answer is required.";
    else if (shortAnswer.split(/\s+/).filter(Boolean).length > 200)
      errors["short-answer"] = "Short answer must be 200 words or less.";

    if (dietaryRestrictions["Other"]) {
      const otherDietary = (fd.get("other-dietary-restrictions") as string)?.trim();
      if (!otherDietary) errors["other-dietary-restrictions"] = "Please specify a dietary restriction for other.";
    }

    return errors;
  };

  return (
    <form className="mt-8" action={formAction} ref={formRef}>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mt-8 text-[var(--neon-yellow)]">
          Personal information
        </h2>
      </div>

      <div className="grid gap-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Input
            type="text"
            label="First name"
            name="first-name"
            placeholder="John"
            defaultValue={state.payload?.get("first-name")}
            error={clientErrors["first-name"] || state.fieldErrors?.["first-name"]}
            required
          />
          <Input
            type="text"
            label="Last name"
            name="last-name"
            placeholder="Smith"
            defaultValue={state.payload?.get("last-name")}
            error={clientErrors["last-name"] || state.fieldErrors?.["last-name"]}
            required
          />
        </div>
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="hello@eurekahacks.ca"
          defaultValue={state.payload?.get("email")}
          error={clientErrors["email"] || state.fieldErrors?.["email"]}
          required
        />
        <Input
          type="number"
          label="Age"
          name="age"
          placeholder="18"
          defaultValue={state.payload?.get("age")}
          error={clientErrors["age"] || state.fieldErrors?.["age"]}
          required
        />
        <div>
          <label className="block text-lg font-medium">
            School <span className="text-error-600">*</span>
          </label>
          <SchoolSelect payload={state.payload} error={clientErrors["school"] || state.fieldErrors?.["school"]} />
        </div>
        <div>
          <label className="block text-lg font-medium">
            Graduation year <span className="text-error-600">*</span>
          </label>
          <Select
            defaultValue={graduationYear as string | undefined}
            value={graduationYear as string | undefined}
            onValueChange={(val) => setGraduationYear(val)}
            required
            name="graduation-year"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="2028">2028</SelectItem>
                <SelectItem value="2029">2029</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {graduationYear !== "other" && (clientErrors["graduation-year"] || state.fieldErrors?.["graduation-year"]) && (
            <p className="text-error-400 text-sm mt-1">{clientErrors["graduation-year"] || state.fieldErrors?.["graduation-year"]}</p>
          )}
        </div>
        {graduationYear === "other" && (
          <Input
            defaultValue={state.payload?.get("graduation-year-other")}
            label="Graduation year (other)"
            className="mt-4"
            required
            type="number"
            name="graduation-year-other"
            error={clientErrors["graduation-year"] || state.fieldErrors?.["graduation-year"]}
          />
        )}
        <div>
          <label className="block text-lg font-medium">
            City <span className="text-error-600">*</span>
          </label>
          <CitySelect payload={state.payload} error={clientErrors["city"] || state.fieldErrors?.["city"]} />
        </div>

        <div>
          <Input
            defaultValue={state.payload?.get("number-hackathons-attended")}
            label="Number of hackathons attended"
            type="number"
            min={0}
            required
            name="number-hackathons-attended"
            placeholder={0}
            error={clientErrors["number-hackathons-attended"] || state.fieldErrors?.["number-hackathons-attended"]}
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mt-8 text-[var(--neon-yellow)]">
            Dietary Restrictions
          </h2>
          <h3 className="font-medium text-gray-400">Select all that apply</h3>
        </div>

        <div className="border rounded-md border-secondary-700 py-4 px-6 flex flex-col gap-2">
          {dietaryRestrictionsList.map((name, key) => (
            <div key={key} className="flex items-center gap-4">
              <Checkbox
                defaultChecked={dietaryRestrictions[name]}
                checked={dietaryRestrictions[name]}
                onCheckedChange={(checked) =>
                  setDietaryRestrictions({
                    ...dietaryRestrictions,
                    [name]: checked as boolean,
                  })
                }
                name={name}
              />
              <label>{name}</label>
            </div>
          ))}
          {dietaryRestrictions["Other"] && (
            <>
              <Input
                defaultValue={state.payload?.get("other-dietary-restrictions")}
                type="text"
                required
                label="Other dietary restrictions"
                name="other-dietary-restrictions"
                placeholder="Please specify"
                error={clientErrors["other-dietary-restrictions"] || state.fieldErrors?.["other-dietary-restrictions"]}
              />
            </>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-semibold mt-8 text-[var(--neon-yellow)]">
            Socials
          </h2>
          <h3 className="font-medium text-gray-400">(Optional)</h3>
        </div>

        <Input
          type="url"
          label="GitHub"
          name="github"
          placeholder="https://github.com/torvalds"
          defaultValue={state.payload?.get("github")}
          error={clientErrors["github"] || state.fieldErrors?.["github"]}
        />

        <Input
          type="url"
          label="LinkedIn"
          name="linkedin"
          placeholder="https://www.linkedin.com/in/williamhgates/"
          defaultValue={state.payload?.get("linkedin")}
          error={clientErrors["linkedin"] || state.fieldErrors?.["linkedin"]}
        />

        <Input
          type="url"
          label="Portfolio"
          name="portfolio"
          placeholder="https://eurekahacks.ca"
          defaultValue={state.payload?.get("portfolio")}
          error={clientErrors["portfolio"] || state.fieldErrors?.["portfolio"]}
        />

        <Input
          type="text"
          label="Link to website or resume"
          name="resume"
          placeholder="https://eurekahacks.ca/resume.pdf"
          defaultValue={state.payload?.get("resume")}
          error={clientErrors["resume"] || state.fieldErrors?.["resume"]}
        />

        <div className="mb-6">
          <h2 className="text-3xl font-semibold mt-8 text-[var(--neon-yellow)]">
            Emergency Contact Information
          </h2>
          <h3 className="font-medium text-gray-400">
            Include your parent/guardian's information here
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Input
            type="text"
            label="Full name"
            name="emergency-contact-full-name"
            placeholder="John Smith"
            defaultValue={state.payload?.get("emergency-contact-full-name")}
            error={clientErrors["emergency-contact-full-name"] || state.fieldErrors?.["emergency-contact-full-name"]}
            required
          />
          <PhoneInput
            label="Phone number"
            name="emergency-contact-phone"
            prev={state.payload?.get("emergency-contact-phone")}
            error={clientErrors["emergency-contact-phone"] || state.fieldErrors?.["emergency-contact-phone"]}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-3xl font-semibold mt-8 text-[var(--neon-yellow)]">
          T-Shirt Size
        </h2>
        <h3 className="font-medium text-gray-400 mb-4">
          Select your preferred t-shirt size{" "}
          <span className="text-error-600">*</span>
        </h3>
        <Select
          defaultValue={state.payload?.get("tshirt-size") as string | undefined}
          name="tshirt-size"
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="XS">XS</SelectItem>
              <SelectItem value="S">S</SelectItem>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
              <SelectItem value="XXL">XXL</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {(clientErrors["tshirt-size"] || state.fieldErrors?.["tshirt-size"]) && (
          <p className="text-error-400 text-sm mt-1">{clientErrors["tshirt-size"] || state.fieldErrors?.["tshirt-size"]}</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-3xl font-semibold mt-8 mb-4 text-[var(--neon-yellow)]">
          Short Answer
        </h2>
        <label className="block text-lg font-medium text-gray-100 mb-1">
          If aliens landed tomorrow and asked you to show them one piece of
          human culture, what would you show them?{" "}
          <span className="text-error-600">*</span>
        </label>
        <p className="text-gray-400 text-sm mb-2">200 words max</p>
        <WordLimiter
          name="short-answer"
          maxWords={200}
          defaultValue={state.payload?.get("short-answer")}
          error={clientErrors["short-answer"] || state.fieldErrors?.["short-answer"]}
        />
      </div>

      <button
        className="bg-secondary-50 text-secondary-900 font-medium py-2 px-4 rounded-lg mt-8 hover:bg-secondary-200 duration-200 relative"
        type="button"
        disabled={pending}
        onClick={() => {
          const errors = validateForm();
          if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
            requestAnimationFrame(() => {
              formRef.current?.querySelector(".text-error-400")?.scrollIntoView({ behavior: "smooth", block: "center" });
            });
            return;
          }
          setClientErrors({});
          setShowConfirm(true);
        }}
      >
        <span className={pending ? "text-transparent" : ""}>Submit</span>
        {pending && (
          <Icon
            className="text-2xl md:text-3xl lg:text-4xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            icon="codex:loader"
          />
        )}
      </button>

      <button ref={submitBtnRef} type="submit" className="hidden" aria-hidden />

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="bg-[#0d1117] border-gray-700 text-secondary-50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-secondary-50">Ready to submit?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400 text-sm">Double-check everything looks right — you won&apos;t be able to edit your application after this.</p>
          <DialogFooter className="gap-2 mt-2">
            <DialogClose asChild>
              <button className="px-4 py-2 rounded-lg border border-gray-600 text-secondary-50 hover:bg-white/5 duration-150">
                Go back
              </button>
            </DialogClose>
            <button
              type="button"
              onClick={() => { submitBtnRef.current?.click(); setShowConfirm(false); }}
              className="px-4 py-2 rounded-lg font-semibold bg-secondary-50 text-secondary-900 hover:bg-secondary-200 duration-150"
            >
              Submit application
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}

function PhoneInput({ label, error, prev, ...props }: any) {
  const [value, setValue] = useState(prev ?? "");

  return (
    <div className="flex-1">
      <label className="block text-lg font-medium text-gray-100">
        {label} {props.required && <span className="text-error-600">*</span>}
      </label>
      <input
        {...props}
        type="tel"
        className={`border hover:border-secondary-500 focus:outline-none rounded-lg w-full py-2 px-4 mt-2 bg-[#030712] text-gray-100 placeholder-gray-500 ${error ? "border-error-600" : "border-secondary-700"}`}
        placeholder="(555) 555-555"
        value={value}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
          let format = "";

          if (digits.length > 0) format = digits.slice(0, 3);
          if (digits.length > 3) format = `(${format}) ${digits.slice(3, 6)}`;
          if (digits.length > 6) format = `${format}-${digits.slice(6)}`;

          setValue(format);
        }}
      />
      {error && <p className="text-error-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

function WordLimiter({
  maxWords,
  defaultValue,
  name,
  error,
}: {
  maxWords: number;
  name: string;
  defaultValue: undefined | null | FormDataEntryValue;
  error?: string;
}) {
  const [value, setValue] = useState(
    (defaultValue as string | undefined) ?? "",
  );

  const countWords = (text: string) =>
    text.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (
      countWords(inputValue) <= maxWords ||
      inputValue.length < value.length
    ) {
      setValue(inputValue);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Type your answer here..."
        name={name}
        value={value}
        onChange={handleChange}
        className={`resize-none h-40 border hover:border-secondary-500 focus:outline-none rounded-lg w-full py-2 px-4 mt-2 bg-[#030712] text-gray-100 placeholder-gray-500 ${error ? "border-error-600" : "border-secondary-700"}`}
      />
      {error && <p className="text-error-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
