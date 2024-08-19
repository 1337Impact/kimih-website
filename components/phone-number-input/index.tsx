import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./styles.module.css";

export default function PhoneNumberInput({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (value: any) => void;
}) {
  const handleInputChange = (value: any) => {
    handleChange({ target: { id: "phone", value } });
  }
  return (
    <PhoneInput
      inputClass={styles.input}
      containerClass={styles.container}
      country={"us"}
      value={value}
      onChange={handleInputChange}
    />
  );
}
