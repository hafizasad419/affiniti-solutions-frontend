import type React from "react"
import { Field, type FieldProps } from "formik"
import { FiUser, FiMail, FiPhone, FiGlobe, FiBriefcase } from "react-icons/fi"

export interface PremiumTextFieldProps {
  /** The name/id of the field for Formik */
  field: string
  /** Label text to display above the input */
  label_text?: string
  /** Placeholder text for the input */
  placeholder?: string
  /** Input type (text, email, password, etc.) */
  type?: "text" | "email" | "password" | "tel" | "url" | "search" | "number"
  /** Whether the field is disabled */
  isDisabled?: boolean
  /** Additional CSS classes */
  className?: string
  /** Whether the field is required */
  required?: boolean
  /** Help text to display below the input */
  helpText?: string
  /** Maximum length for the input */
  maxLength?: number
  /** Minimum length for the input */
  minLength?: number
  /** Auto-complete attribute */
  autoComplete?: string
  /** Icon type for the input */
  iconType?: "user" | "email" | "phone" | "globe" | "briefcase" | "none"
}

const PremiumTextField: React.FC<PremiumTextFieldProps> = ({
  field,
  label_text,
  placeholder = "",
  type = "text",
  isDisabled = false,
  className = "",
  required = false,
  helpText,
  maxLength,
  minLength,
  autoComplete,
  iconType = "none"
}) => {
  const getIcon = () => {
    switch (iconType) {
      case "user":
        return <FiUser className="w-5 h-5" />
      case "email":
        return <FiMail className="w-5 h-5" />
      case "phone":
        return <FiPhone className="w-5 h-5" />
      case "globe":
        return <FiGlobe className="w-5 h-5" />
      case "briefcase":
        return <FiBriefcase className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <div className="premium-textfield-container">
      {label_text && (
        <label htmlFor={field} className="premium-textfield-label">
          {label_text}
          {required && (
            <span className="premium-textfield-required" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <Field name={field}>
        {({ field: formikField, meta }: FieldProps) => (
          <div className="premium-textfield-wrapper">
            <div className="premium-textfield-input-container">
              {iconType !== "none" && (
                <div className="premium-textfield-icon">
                  {getIcon()}
                </div>
              )}
              <input
                {...formikField}
                id={formikField.name}
                type={type}
                disabled={isDisabled}
                placeholder={placeholder}
                maxLength={maxLength}
                minLength={minLength}
                autoComplete={autoComplete}
                aria-invalid={meta.touched && meta.error ? "true" : "false"}
                aria-describedby={
                  meta.touched && meta.error
                    ? `${formikField.name}-error`
                    : helpText
                      ? `${formikField.name}-help`
                      : undefined
                }
                className={`premium-textfield-input ${
                  meta.touched && meta.error
                    ? "premium-textfield-input--error"
                    : meta.touched && !meta.error
                      ? "premium-textfield-input--success"
                      : ""
                } ${isDisabled ? "premium-textfield-input--disabled" : ""}
                ${iconType !== "none" ? "pl-12" : ""}
                ${className}`}
              />
            </div>

            {meta.touched && meta.error && (
              <div id={`${formikField.name}-error`} className="premium-textfield-error" role="alert" aria-live="polite">
                {meta.error}
              </div>
            )}

            {helpText && !meta.error && (
              <div id={`${formikField.name}-help`} className="premium-textfield-help">
                {helpText}
              </div>
            )}
          </div>
        )}
      </Field>
    </div>
  )
}

export default PremiumTextField
