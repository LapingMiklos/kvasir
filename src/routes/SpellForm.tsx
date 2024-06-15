import { Component, For, Show, createSignal } from "solid-js";
import BackButton from "../components/util/BackButton";
import { FormApi, createForm } from "@tanstack/solid-form";
import {
  AREA_SHAPES,
  SPELL_RANGES,
  SPELL_SCHOOL_NAMES,
} from "../utils/constants";
import TextInput from "../components/util/form/TextInput";
import NumericInput from "../components/util/form/NumericInput";
import Selector from "../components/util/form/Selector";

/* FIX TO THE UNDEFINED HOT REFRESH IS MOVING THE FIELD COMPONENTS WITHIN THE FORM COMPONENT */

type SpellFormData = {
  name: string;
  description: string;
  atHigherLevel: string;
  level: number;
  schoolName: string;
  customSchoolName?: string;
  rangeType: string;
  rangeDistance?: number;
  area: boolean;
  areaSize?: number;
  areaShape?: string;
  customAreaShape?: string;
};

type FormFieldProps = {
  form: FormApi<SpellFormData>;
};
// --- done
const NameField: Component<FormFieldProps> = ({ form }) => (
  <form.Field
    name="name"
    validators={{
      onChange: ({ value }) => {
        return value.length === 0 ? "Name is required" : undefined;
      },
    }}
  >
    {(field) => <TextInput field={field} label="Spell name" />}
  </form.Field>
);

// --- done
const DescriptionField: Component<FormFieldProps> = ({ form }) => (
  <form.Field
    name="description"
    validators={{
      onChange: ({ value }) => {
        return value.length === 0 ? "Description is required" : undefined;
      },
    }}
  >
    {(field) => <TextInput field={field} label="Description" />}
  </form.Field>
);

// --- change to use checkbox
const AtHigherLevelField: Component<FormFieldProps> = ({ form }) => (
  <form.Field name="atHigherLevel">
    {(field) => <TextInput field={field} label="At higher level" />}
  </form.Field>
);

// --- selector
const LevelField: Component<FormFieldProps> = ({ form }) => (
  <form.Field name="level">
    {(field) => (
      <>
        <Selector
          label="Spell Level"
          field={field}
          options={[
            "cantrip",
            ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `level ${i}`),
          ]}
          handleSelect={(i) => field().handleChange(i)}
        />
      </>
    )}
  </form.Field>
);

// --- selector
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
            <TextInput
              field={field}
              label="Custom spell school name"
              value={field().state.value ?? ""}
            />
          )}
        </form.Field>
      </Show>
    </>
  );
};

const RangeField: Component<FormFieldProps> = ({ form }) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <form.Field name="rangeType">
        {(field) => (
          <>
            <label for={field().name}>Range:</label>
            <select
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => {
                const { value } = e.target;
                field().handleChange(value);
                if (value === "ranged") {
                  setVisible(true);
                } else {
                  setVisible(false);
                }
              }}
            >
              <For each={SPELL_RANGES}>
                {(school) => <option value={school}>{`${school}`}</option>}
              </For>
            </select>
          </>
        )}
      </form.Field>
      <Show when={visible()}>
        <form.Field name="rangeDistance">
          {(field) => <NumericInput field={field} minVal={0} />}
        </form.Field>
      </Show>
    </>
  );
};

const AreaField: Component<FormFieldProps> = ({ form }) => {
  const [visible, setVisible] = createSignal(false);
  const [customShapeFieldVisible, setCustomShapeFieldVisible] =
    createSignal(false);

  return (
    <>
      <form.Field name="area">
        {(field) => (
          <>
            <label for={field().name}>Area:</label>
            <input
              id={field().name}
              type="checkbox"
              checked={field().state.value}
              name={field().name}
              onBlur={field().handleBlur}
              onChange={() => {
                field().handleChange(!field().state.value);
                setVisible(field().state.value);
              }}
            />
          </>
        )}
      </form.Field>
      <Show when={visible()}>
        <form.Field name="areaSize">
          {(field) => (
            <NumericInput field={field} label="Area size" minVal={0} />
          )}
        </form.Field>
        <form.Field name="areaShape">
          {(field) => (
            <>
              <label for={field().name}>Area shape</label>
              <select
                id={field().name}
                name={field().name}
                value={field().state.value ?? "cone"}
                onBlur={field().handleBlur}
                onInput={(e) => {
                  const { value } = e.target;
                  field().handleChange(value);
                  if (value === "custom") {
                    setCustomShapeFieldVisible(true);
                  } else {
                    setCustomShapeFieldVisible(false);
                  }
                }}
              >
                <For each={AREA_SHAPES}>
                  {(item) => <option value={item}>{`${item}`}</option>}
                </For>
              </select>
            </>
          )}
        </form.Field>
        <Show when={customShapeFieldVisible()}>
          <form.Field name="customAreaShape">
            {(field) => (
              <TextInput
                field={field}
                label="Custom area shape"
                value={field().state.value ?? ""}
              />
            )}
          </form.Field>
        </Show>
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
      rangeType: "self",
      rangeDistance: 0,
      area: false,
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
          <RangeField form={form} />
          <AreaField form={form} />
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
