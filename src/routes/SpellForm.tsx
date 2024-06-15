import { Component, For, Show, createSignal } from "solid-js";
import { FormApi, createForm } from "@tanstack/solid-form";
import BackButton from "../components/util/BackButton";
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
const NameField: Component<FormFieldProps> = (props) => (
  <props.form.Field
    name="name"
    validators={{
      onChange: ({ value }) => {
        return value.length === 0 ? "Name is required" : undefined;
      },
    }}
  >
    {(field) => <TextInput field={field} label="Spell name" />}
  </props.form.Field>
);

// --- done
const DescriptionField: Component<FormFieldProps> = (props) => (
  <props.form.Field
    name="description"
    validators={{
      onChange: ({ value }) => {
        return value.length === 0 ? "Description is required" : undefined;
      },
    }}
  >
    {(field) => <TextInput field={field} label="Description" />}
  </props.form.Field>
);

// --- change to use checkbox
const AtHigherLevelField: Component<FormFieldProps> = (props) => (
  <props.form.Field name="atHigherLevel">
    {(field) => <TextInput field={field} label="At higher level" />}
  </props.form.Field>
);

// --- selector
const LevelField: Component<FormFieldProps> = (props) => (
  <props.form.Field name="level">
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
  </props.form.Field>
);

// --- selector
const SchoolField: Component<FormFieldProps> = (props) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <props.form.Field name="schoolName">
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
      </props.form.Field>
      <Show when={visible()}>
        <props.form.Field name="customSchoolName">
          {(field) => (
            <TextInput
              field={field}
              label="Custom spell school name"
              value={field().state.value ?? ""}
            />
          )}
        </props.form.Field>
      </Show>
    </>
  );
};

const RangeField: Component<FormFieldProps> = (props) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <props.form.Field name="rangeType">
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
      </props.form.Field>
      <Show when={visible()}>
        <props.form.Field name="rangeDistance">
          {(field) => <NumericInput field={field} minVal={0} />}
        </props.form.Field>
      </Show>
    </>
  );
};

const AreaField: Component<FormFieldProps> = (props) => {
  const [visible, setVisible] = createSignal(false);
  const [customShapeFieldVisible, setCustomShapeFieldVisible] =
    createSignal(false);

  return (
    <>
      <props.form.Field name="area">
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
      </props.form.Field>
      <Show when={visible()}>
        <props.form.Field name="areaSize">
          {(field) => (
            <NumericInput field={field} label="Area size" minVal={0} />
          )}
        </props.form.Field>
        <props.form.Field name="areaShape">
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
        </props.form.Field>
        <Show when={customShapeFieldVisible()}>
          <props.form.Field name="customAreaShape">
            {(field) => (
              <TextInput
                field={field}
                label="Custom area shape"
                value={field().state.value ?? ""}
              />
            )}
          </props.form.Field>
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
    onSubmit: ({ value }) => {
      // eslint-disable-next-line no-console
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
          form.handleSubmit().catch(() => {});
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
