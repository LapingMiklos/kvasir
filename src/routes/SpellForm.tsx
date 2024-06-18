import { Component, Show, createSignal } from "solid-js";
import { createForm } from "@tanstack/solid-form";
import BackButton from "../components/util/BackButton";
import {
  AREA_SHAPES,
  ATTACK_SAVE_TYPES,
  AreaShape,
  AttackSaveType,
  CAST_TIMES,
  CastTimeName,
  DURATIONS,
  DurationType,
  SPELL_RANGES,
  SPELL_SCHOOL_NAMES,
  STATS,
  SpellRange,
  SpellSchoolName,
  Stat,
} from "../utils/constants";
import TextInput from "../components/util/form/TextInput";
import NumericInput from "../components/util/form/NumericInput";
import Selector from "../components/util/form/Selector";
import Checkbox from "../components/util/form/Checkbox";

export type SpellFormData = {
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
  attackSaveType: AttackSaveType;
  saveStat?: Stat;
};

const SpellForm: Component = () => {
  const form = createForm<SpellFormData>(() => ({
    defaultValues: {
      name: "",
      description: "",
      isScaling: false,
      level: 4,
      schoolName: "custom",
      rangeType: "user",
      area: false,
      isVerbal: false,
      isSomatic: false,
      isMaterial: false,
      castTime: "action",
      durationType: "instantaneous",
      effect: "",
      attackSaveType: "ranged",
    },
    onSubmit: ({ value }) => {
      // eslint-disable-next-line no-console
      console.log(value);
    },
  }));

  const NameField: Component = () => (
    <form.Field
      name="name"
      // validators={{
      //   onChange: ({ value }) => {
      //     return value.length === 0 ? "Name is required" : undefined;
      //   },
      // }}
    >
      {(field) => (
        <TextInput
          value={field().state.value}
          field={field}
          label="Spell name"
        />
      )}
    </form.Field>
  );

  const DescriptionField: Component = () => (
    <form.Field
      name="description"
      // validators={{
      //   onChange: ({ value }) => {
      //     return value.length === 0 ? "Description is required" : undefined;
      //   },
      // }}
    >
      {(field) => (
        <TextInput
          value={field().state.value}
          field={field}
          label="Description"
        />
      )}
    </form.Field>
  );

  const AtHigherLevelField: Component = () => {
    const [visible, setVisible] = createSignal(form.getFieldValue("isScaling"));

    return (
      <>
        <form.Field name="isScaling">
          {(field) => (
            <Checkbox
              value={field().state.value}
              field={field}
              onCheck={() => {
                const isChecked = field().state.value;
                setVisible(!isChecked);
                field().handleChange(!isChecked);
              }}
              label="At higher level"
            />
          )}
        </form.Field>
        <Show when={visible()}>
          <form.Field name="atHigherLevel">
            {(field) => (
              <TextInput field={field} value={field().state.value ?? ""} />
            )}
          </form.Field>
        </Show>
      </>
    );
  };

  const LevelField: Component = () => (
    <form.Field name="level">
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
    </form.Field>
  );

  const SchoolField: Component = () => {
    const [visible, setVisible] = createSignal(
      form.getFieldValue("schoolName") === "custom",
    );

    return (
      <>
        <form.Field name="schoolName">
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

  const RangeField: Component = () => {
    const [visible, setVisible] = createSignal(
      form.getFieldValue("rangeType") === "ranged",
    );

    return (
      <>
        <form.Field name="rangeType">
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
        </form.Field>
        <Show when={visible()}>
          <form.Field name="rangeDistance">
            {(field) => (
              <NumericInput
                value={field().state.value ?? 0}
                field={field}
                minVal={0}
                maxVal={5000}
              />
            )}
          </form.Field>
        </Show>
      </>
    );
  };

  const AreaField: Component = () => {
    const [visible, setVisible] = createSignal(form.getFieldValue("area"));
    const [customShapeFieldVisible, setCustomShapeFieldVisible] = createSignal(
      form.getFieldValue("areaShape") === "custom",
    );

    return (
      <>
        <form.Field name="area">
          {(field) => (
            <Checkbox
              value={field().state.value}
              field={field}
              onCheck={() => {
                const isChecked = !field().state.value;
                field().handleChange(isChecked);
                setVisible(isChecked);
                if (isChecked) {
                  form.setFieldValue("areaShape", "cone");
                  setCustomShapeFieldVisible(
                    form.getFieldValue("areaShape") === "custom",
                  );
                }
              }}
              label="Area"
            />
          )}
        </form.Field>
        <Show when={visible()}>
          <form.Field name="areaSize">
            {(field) => (
              <NumericInput
                value={field().state.value ?? 0}
                field={field}
                label="Area size"
                minVal={0}
              />
            )}
          </form.Field>
          <form.Field name="areaShape">
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

  const VerbalField: Component = () => {
    return (
      <form.Field name="isVerbal">
        {(field) => (
          <Checkbox value={field().state.value} field={field} label="Verbal" />
        )}
      </form.Field>
    );
  };

  const SomaticField: Component = () => {
    return (
      <form.Field name="isSomatic">
        {(field) => (
          <Checkbox value={field().state.value} field={field} label="Somatic" />
        )}
      </form.Field>
    );
  };

  const MaterialField: Component = () => {
    const [visible, setVisible] = createSignal(
      form.getFieldValue("isMaterial"),
    );
    return (
      <>
        <form.Field name="isMaterial">
          {(field) => (
            <Checkbox
              value={field().state.value}
              field={field}
              label="Material"
              onCheck={() => {
                const isChecked = field().state.value;
                field().handleChange(!isChecked);
                setVisible(!isChecked);
              }}
            />
          )}
        </form.Field>
        <Show when={visible()}>
          <form.Field name="materials">
            {(field) => (
              <TextInput field={field} value={field().state.value ?? ""} />
            )}
          </form.Field>
        </Show>
      </>
    );
  };

  const CastTimeField: Component = () => {
    const [visible, setVisible] = createSignal(
      form.getFieldValue("castTime") === "custom",
    );

    return (
      <>
        <form.Field name="castTime">
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
        </form.Field>
        <Show when={visible()}>
          <form.Field name="customCastTime">
            {(field) => (
              <TextInput field={field} value={field().state.value ?? ""} />
            )}
          </form.Field>
        </Show>
      </>
    );
  };

  const DurationField: Component = () => {
    const [durationVisible, setDurationVisible] = createSignal(
      form.getFieldValue("durationType") === "min" ||
        form.getFieldValue("durationType") === "day" ||
        form.getFieldValue("durationType") === "hour",
    );
    const [customVisible, setCustomVisible] = createSignal(
      form.getFieldValue("durationType") === "custom",
    );

    return (
      <>
        <form.Field name="durationType">
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
                  if (form.getFieldValue("duration") === undefined) {
                    form.setFieldValue("duration", 1);
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
        </form.Field>
        <Show when={durationVisible()}>
          <form.Field name="duration">
            {(field) => (
              <NumericInput
                value={field().state.value ?? 0}
                field={field}
                minVal={0}
              />
            )}
          </form.Field>
        </Show>
        <Show when={customVisible()}>
          <form.Field name="customDuration">
            {(field) => (
              <TextInput field={field} value={field().state.value ?? ""} />
            )}
          </form.Field>
        </Show>
      </>
    );
  };

  const EffectField: Component = () => (
    <form.Field name="effect">
      {(field) => (
        <TextInput
          value={field().state.value}
          field={field}
          label="Main effect"
        />
      )}
    </form.Field>
  );

  const AttackSaveField: Component = () => {
    const [visible, setVisible] = createSignal(
      form.getFieldValue("attackSaveType") === "save",
    );

    return (
      <>
        <form.Field name="attackSaveType">
          {(field) => (
            <Selector
              field={field}
              options={ATTACK_SAVE_TYPES}
              value={ATTACK_SAVE_TYPES.indexOf(field().state.value)}
              label="Attack/Save"
              handleSelect={(i) => {
                const value = ATTACK_SAVE_TYPES[i];
                field().handleChange(value);
                if (value === "save") {
                  setVisible(true);
                  form.setFieldValue("saveStat", "STR");
                } else {
                  setVisible(false);
                }
              }}
            />
          )}
        </form.Field>
        <Show when={visible()}>
          <form.Field name="saveStat">
            {(field) => (
              <Selector
                field={field}
                options={STATS}
                value={STATS.indexOf(field().state.value ?? "STR")}
                handleSelect={(i) => {
                  const value = STATS[i];
                  field().handleChange(value);
                }}
              />
            )}
          </form.Field>
        </Show>
      </>
    );
  };

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
          <NameField />
          <DescriptionField />
          <AtHigherLevelField />
          <LevelField />
          <SchoolField />
          <RangeField />
          <AreaField />
          <VerbalField />
          <SomaticField />
          <MaterialField />
          <CastTimeField />
          <DurationField />
          <EffectField />
          <AttackSaveField />

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
