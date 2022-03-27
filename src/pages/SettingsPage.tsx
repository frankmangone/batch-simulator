import styled from "styled-components"

/* Components */
import PageTitle from "../components/layout/PageTitle"
import OperatingTimesSection from "../components/settings/OperatingTimesSection"
import UnitsSection from "../components/settings/UnitsSection"
import HeatExchangeSection from "../components/settings/HeatExchangeSection"
import MainLayout from "../layouts/MainLayout"

/* Helpers */
import {
  validateEqual,
  validateNotEmpty,
  validateGreaterThan,
} from "../lib/validators"

/* Hooks */
import useSettings from "../hooks/useSettings"
import { useFormik } from "formik"

/* Types */
import type { FormikProps } from "formik"

const SettingsPage: React.VFC = () => {
  const { settings, saveSettings } = useSettings()

  /**
   * Form validation function
   */
  const validate = (values: Settings): SettingsErrors => {
    const { deadTime, initialTemperature, timeStep, reactionTime } = values
    const errors: SettingsErrors = {}

    /* Reaction time validation */
    if (!validateNotEmpty(reactionTime))
      errors.reactionTime = "Reaction time cannot be empty"
    else if (!validateGreaterThan(reactionTime, 0, true))
      errors.reactionTime = "Reaction time cannot be lower than 0"

    /* Dead time validation */
    if (!validateNotEmpty(deadTime))
      errors.deadTime = "Dead time cannot be empty"
    else if (!validateGreaterThan(deadTime, 0, true))
      errors.deadTime = "Dead time cannot be lower than 0"

    /* Time step validation */
    if (!validateNotEmpty(timeStep))
      errors.timeStep = "Time step cannot be empty"
    else if (!validateGreaterThan(timeStep, 0, false))
      errors.timeStep = "Time step has to be greater than 0"
    // TODO: Time step has to be lower than reaction time

    /* Initial temperature validation */
    if (!validateNotEmpty(timeStep))
      errors.initialTemperature = "Initial temperature cannot be empty"
    else if (
      (validateEqual(initialTemperature, "K") ||
        validateEqual(initialTemperature, "R")) &&
      !validateGreaterThan(initialTemperature, 0, false)
    )
      errors.initialTemperature =
        "Initial temperature cannot be equal or lower than 0"
    else if (
      validateEqual(initialTemperature, "°C") &&
      !validateGreaterThan(initialTemperature, -273.15, false)
    )
      errors.initialTemperature =
        "Initial temperature cannot be equal or lower than -273.15"
    else if (
      validateEqual(initialTemperature, "°F") &&
      !validateGreaterThan(initialTemperature, -459.67, false)
    )
      errors.initialTemperature =
        "Initial temperature cannot be equal or lower than -459.67"

    return errors
  }

  const formik: FormikProps<Settings> = useFormik({
    initialValues: { ...settings },
    validate,
    onSubmit: (values) => {
      saveSettings(values)
    },
  })

  const submit = () => {
    formik.handleSubmit()
  }

  const onBlur = submit
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    formik.handleChange(event)

  const sectionProps = {
    formik,
    onBlur,
    onChange,
  }

  return (
    <MainLayout>
      <PageTitle>Operation</PageTitle>

      <Form>
        <OperatingTimesSection {...sectionProps} />
        <UnitsSection {...sectionProps} />
        <HeatExchangeSection {...sectionProps} />
      </Form>
    </MainLayout>
  )
}

export default SettingsPage

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
`
