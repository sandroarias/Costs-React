import styles from "./Select.module.css"

function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <lavel htmlFor={name}>{text}:</lavel>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select
