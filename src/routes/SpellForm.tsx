import { Component, For, Show, createSignal } from "solid-js";
import BackButton from "../components/util/BackButton";
import { FormApi, createForm } from "@tanstack/solid-form";
import { SPELL_SCHOOL_NAMES } from "../utils/constants";

/* FIX TO THE UNDEFINED HOT REFRESH IS MOVING THE FIELD COMPONENTS WITHIN THE FORM COMPONENT */

type SpellFormData = {
  name: string;
  description: string;
  atHigherLevel: string;
  level: number;
  schoolName: string | "custom";
  customSchoolName: string;
};

type FormFieldProps = {
  form: FormApi<SpellFormData>;
};

const NameField: Component<FormFieldProps> = ({ form }) => (
  <form.Field
    name="name"
    validators={{
      onChange: ({ value }) => {
        return value.length === 0 ? "Name is required" : undefined;
      },
    }}
  >
    {(field) => (
      <>
        <label for={field().name}>Spell Name:</label>
        <input
          id={field().name}
          name={field().name}
          value={field().state.value}
          onBlur={field().handleBlur}
          onInput={(e) => field().handleChange(e.target.value)}
        />
      </>
    )}
  </form.Field>
);

const DescriptionField: Component<FormFieldProps> = ({ form }) => (
  <form.Field
    name="description"
    validators={{
      onChange: ({ value }) => {
        return value.length === 0 ? "Description is required" : undefined;
      },
    }}
  >
    {(field) => (
      <>
        <label for={field().name}>Description:</label>
        <input
          id={field().name}
          name={field().name}
          value={field().state.value}
          onBlur={field().handleBlur}
          onInput={(e) => field().handleChange(e.target.value)}
        />
      </>
    )}
  </form.Field>
);

const AtHigherLevelField: Component<FormFieldProps> = ({ form }) => (
  <form.Field name="atHigherLevel">
    {(field) => (
      <>
        <label for={field().name}>At higher level:</label>
        <input
          id={field().name}
          name={field().name}
          value={field().state.value}
          onBlur={field().handleBlur}
          onInput={(e) => field().handleChange(e.target.value)}
        />
      </>
    )}
  </form.Field>
);

const LevelField: Component<FormFieldProps> = ({ form }) => (
  <form.Field name="level">
    {(field) => (
      <>
        <label for={field().name}>Spell Level:</label>
        <select
          id={field().name}
          name={field().name}
          value={field().state.value}
          onBlur={field().handleBlur}
          onInput={(e) => field().handleChange(Number(e.target.value))}
        >
          <option value={0}>Cantrip</option>
          <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9]}>
            {(i) => <option value={i}>{`Level ${i}`}</option>}
          </For>
        </select>
      </>
    )}
  </form.Field>
);

const SchoolField: Component<FormFieldProps> = ({ form }) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <form.Field name="schoolName">
        {(field) => (
          <>
            <label for={field().name}>Spell School:</label>
            <select
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => {
                const { value } = e.target;
                field().handleChange(value);
                if (value === "custom") {
                  setVisible(true);
                } else {
                  setVisible(false);
                }
              }}
            >
              <For each={SPELL_SCHOOL_NAMES}>
                {(school) => <option value={school}>{`${school}`}</option>}
              </For>
            </select>
          </>
        )}
      </form.Field>
      <Show when={visible()}>
        <form.Field name="customSchoolName">
          {(field) => (
            <>
              <label for={field().name}>Custom spell school name:</label>
              <input
                id={field().name}
                name={field().name}
                value={field().state.value ?? ""}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.target.value)}
              />
            </>
          )}
        </form.Field>
      </Show>
    </>
  );
};

const SpellForm: Component = () => {
  const form = createForm<SpellFormData>(() => ({
    defaultValues: {
      name: "",
      description: "",
      atHigherLevel: "",
      level: 0,
      schoolName: "abjuration",
      customSchoolName: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  }));

  return (
    <div>
      <BackButton />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            "align-items": "flex-start",
          }}
        >
          <NameField form={form} />
          <DescriptionField form={form} />
          <AtHigherLevelField form={form} />
          <LevelField form={form} />
          <SchoolField form={form} />
          <form.Subscribe>
            {(state) => (
              <button type="submit" disabled={!state().canSubmit}>
                {state().isSubmitting ? "..." : "Submit"}
              </button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default SpellForm;
