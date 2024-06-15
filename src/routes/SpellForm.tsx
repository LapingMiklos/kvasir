import { Component, Show, createSignal } from "solid-js";
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
import Checkbox from "../components/util/form/Checkbox";

/* FIX TO THE UNDEFINED HOT REFRESH IS MOVING THE FIELD COMPONENTS WITHIN THE FORM COMPONENT */

type SpellFormData = {
  name: string;
  description: string;
  isScaling: boolean;
  atHigherLevel?: string;
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

const NameField: Component<FormFieldProps> = (props) => (
  <props.form.Field
    name="name"
    // validators={{
    //   onChange: ({ value }) => {
    //     return value.length === 0 ? "Name is required" : undefined;
    //   },
    // }}
  >
    {(field) => <TextInput field={field} label="Spell name" />}
  </props.form.Field>
);

const DescriptionField: Component<FormFieldProps> = (props) => (
  <props.form.Field
    name="description"
    // validators={{
    //   onChange: ({ value }) => {
    //     return value.length === 0 ? "Description is required" : undefined;
    //   },
    // }}
  >
    {(field) => <TextInput field={field} label="Description" />}
  </props.form.Field>
);

const AtHigherLevelField: Component<FormFieldProps> = (props) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <props.form.Field name="isScaling">
        {(field) => (
          <Checkbox
            field={field}
            onCheck={() => {
              const isChecked = field().state.value;
              setVisible(!isChecked);
              field().handleChange(!isChecked);
            }}
            label="At higher level"
          />
        )}
      </props.form.Field>
      <Show when={visible()}>
        <props.form.Field name="atHigherLevel">
          {(field) => (
            <TextInput field={field} value={field().state.value ?? ""} />
          )}
        </props.form.Field>
      </Show>
    </>
  );
};

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

const SchoolField: Component<FormFieldProps> = (props) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <props.form.Field name="schoolName">
        {(field) => (
          <>
            <Selector
              field={field}
              options={SPELL_SCHOOL_NAMES}
              label="Spell School"
              handleSelect={(i) => {
                const value = SPELL_SCHOOL_NAMES[i];
                field().handleChange(value);
                if (value === "custom") {
                  setVisible(true);
                } else {
                  setVisible(false);
                }
              }}
            />
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
          <Selector
            field={field}
            options={SPELL_RANGES}
            label="Range"
            handleSelect={(i) => {
              const value = SPELL_RANGES[i];
              field().handleChange(value);
              if (value === "ranged") {
                setVisible(true);
              } else {
                setVisible(false);
              }
            }}
          />
        )}
      </props.form.Field>
      <Show when={visible()}>
        <props.form.Field name="rangeDistance">
          {(field) => <NumericInput field={field} minVal={0} maxVal={5000} />}
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
          <Checkbox
            field={field}
            onCheck={() => {
              const isChecked = field().state.value;
              field().handleChange(!isChecked);
              setVisible(!isChecked);
            }}
            label="Area"
          />
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
              <Selector
                field={field}
                options={AREA_SHAPES}
                label="Area shape"
                handleSelect={(i) => {
                  const value = AREA_SHAPES[i];
                  field().handleChange(value);
                  if (value === "custom") {
                    setCustomShapeFieldVisible(true);
                  } else {
                    setCustomShapeFieldVisible(false);
                  }
                }}
              />
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
      isScaling: false,
      level: 0,
      schoolName: "abjuration",
      rangeType: "self",
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
