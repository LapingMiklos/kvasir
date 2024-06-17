import { Component, Show, createSignal } from "solid-js";
import { FormApi, createForm } from "@tanstack/solid-form";
import BackButton from "../components/util/BackButton";
import {
  AREA_SHAPES,
  AreaShape,
  CAST_TIMES,
  CastTimeName,
  DURATIONS,
  DurationType,
  SPELL_RANGES,
  SPELL_SCHOOL_NAMES,
  SpellRange,
  SpellSchoolName,
} from "../utils/constants";
import TextInput from "../components/util/form/TextInput";
import NumericInput from "../components/util/form/NumericInput";
import Selector from "../components/util/form/Selector";
import Checkbox from "../components/util/form/Checkbox";

type SpellFormData = {
  name: string; // text -- req
  description: string; // text -- req
  isScaling: boolean; // checkbox
  atHigherLevel?: string; // text if prev true
  level: number; // select -- req
  schoolName: SpellSchoolName; // select -- req
  customSchoolName?: string; // text if prev == custom
  rangeType: SpellRange; // select -- req
  rangeDistance?: number; // number -- req if prev == ranged
  area: boolean; // checkbox
  areaSize?: number; // number -- req if prev true
  areaShape?: AreaShape; // select -- req if prev is true
  customAreaShape?: string; // text -- req if prev == custom
  isVerbal: boolean; // checkbox
  isSomatic: boolean; // checkbox
  isMaterial: boolean; // checkbox
  materials?: string; // req if prev is true
  castTime: CastTimeName;
  customCastTime?: string;
  durationType: DurationType;
  duration?: number;
  customDuration?: string;
  effect: string;
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
  const [visible, setVisible] = createSignal(
    props.form.getFieldValue("isScaling")
  );

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
          value={field().state.value}
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
  const [visible, setVisible] = createSignal(
    props.form.getFieldValue("schoolName") === "custom"
  );

  return (
    <>
      <props.form.Field name="schoolName">
        {(field) => (
          <>
            <Selector
              field={field}
              options={SPELL_SCHOOL_NAMES}
              value={SPELL_SCHOOL_NAMES.indexOf(field().state.value)}
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
  const [visible, setVisible] = createSignal(
    props.form.getFieldValue("rangeType") === "ranged"
  );

  return (
    <>
      <props.form.Field name="rangeType">
        {(field) => (
          <Selector
            field={field}
            options={SPELL_RANGES}
            value={SPELL_RANGES.indexOf(field().state.value)}
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
  const [visible, setVisible] = createSignal(props.form.getFieldValue("area"));
  const [customShapeFieldVisible, setCustomShapeFieldVisible] = createSignal(
    props.form.getFieldValue("areaShape") === "custom"
  );

  return (
    <>
      <props.form.Field name="area">
        {(field) => (
          <Checkbox
            field={field}
            onCheck={() => {
              const isChecked = !field().state.value;
              field().handleChange(isChecked);
              setVisible(isChecked);
              if (isChecked) {
                props.form.setFieldValue("areaShape", "cone");
                setCustomShapeFieldVisible(
                  props.form.getFieldValue("areaShape") === "custom"
                );
              }
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
                value={AREA_SHAPES.indexOf(field().state.value ?? "cone")}
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

const VerbalField: Component<FormFieldProps> = (props) => {
  return (
    <props.form.Field name="isVerbal">
      {(field) => <Checkbox field={field} label="Verbal" />}
    </props.form.Field>
  );
};

const SomaticField: Component<FormFieldProps> = (props) => {
  return (
    <props.form.Field name="isSomatic">
      {(field) => <Checkbox field={field} label="Somatic" />}
    </props.form.Field>
  );
};

const MaterialField: Component<FormFieldProps> = (props) => {
  const [visible, setVisible] = createSignal(
    props.form.getFieldValue("isMaterial")
  );
  return (
    <>
      <props.form.Field name="isMaterial">
        {(field) => (
          <Checkbox
            field={field}
            label="Material"
            onCheck={() => {
              const isChecked = field().state.value;
              field().handleChange(!isChecked);
              setVisible(!isChecked);
            }}
          />
        )}
      </props.form.Field>
      <Show when={visible()}>
        <props.form.Field name="materials">
          {(field) => (
            <TextInput field={field} value={field().state.value ?? ""} />
          )}
        </props.form.Field>
      </Show>
    </>
  );
};

const CastTimeField: Component<FormFieldProps> = (props) => {
  const [visible, setVisible] = createSignal(
    props.form.getFieldValue("castTime") === "custom"
  );

  return (
    <>
      <props.form.Field name="castTime">
        {(field) => (
          <Selector
            field={field}
            options={CAST_TIMES}
            value={CAST_TIMES.indexOf(field().state.value)}
            label="Cast time"
            handleSelect={(i) => {
              const value = CAST_TIMES[i];
              field().handleChange(value);
              if (value === "custom") {
                setVisible(true);
              } else {
                setVisible(false);
              }
            }}
          />
        )}
      </props.form.Field>
      <Show when={visible()}>
        <props.form.Field name="customCastTime">
          {(field) => (
            <TextInput field={field} value={field().state.value ?? ""} />
          )}
        </props.form.Field>
      </Show>
    </>
  );
};

const DurationField: Component<FormFieldProps> = (props) => {
  const [durationVisible, setDurationVisible] = createSignal(
    props.form.getFieldValue("durationType") === "min" ||
      props.form.getFieldValue("durationType") === "day" ||
      props.form.getFieldValue("durationType") === "hour"
  );
  const [customVisible, setCustomVisible] = createSignal(
    props.form.getFieldValue("durationType") === "custom"
  );

  return (
    <>
      <props.form.Field name="durationType">
        {(field) => (
          <Selector
            field={field}
            options={DURATIONS}
            value={DURATIONS.indexOf(field().state.value)}
            label="Duration"
            handleSelect={(i) => {
              const value = DURATIONS[i];
              field().handleChange(value);
              if (value === "min" || value === "hour" || value === "day") {
                setDurationVisible(true);
                if (props.form.getFieldValue("duration") === undefined) {
                  props.form.setFieldValue("duration", 1);
                }
              } else {
                setDurationVisible(false);
              }

              if (value === "custom") {
                setCustomVisible(true);
              } else {
                setCustomVisible(false);
              }
            }}
          />
        )}
      </props.form.Field>
      <Show when={durationVisible()}>
        <props.form.Field name="duration">
          {(field) => <NumericInput field={field} minVal={0} />}
        </props.form.Field>
      </Show>
      <Show when={customVisible()}>
        <props.form.Field name="customDuration">
          {(field) => (
            <TextInput field={field} value={field().state.value ?? ""} />
          )}
        </props.form.Field>
      </Show>
    </>
  );
};

const EffectField: Component<FormFieldProps> = (props) => (
  <props.form.Field name="effect">
    {(field) => <TextInput field={field} label="Main effect" />}
  </props.form.Field>
);

const SpellForm: Component = () => {
  const form = createForm<SpellFormData>(() => ({
    defaultValues: {
      name: "default name",
      description: "default description",
      isScaling: false,
      level: 4,
      schoolName: "custom",
      rangeType: "self",
      area: false,
      isVerbal: false,
      isSomatic: false,
      isMaterial: false,
      materials: "some material",
      castTime: "action",
      durationType: "instantaneous",
      effect: "",
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
          <VerbalField form={form} />
          <SomaticField form={form} />
          <MaterialField form={form} />
          <CastTimeField form={form} />
          <DurationField form={form} />
          <EffectField form={form} />

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
