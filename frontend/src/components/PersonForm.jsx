const PersonForm = ({
  onSubmit: handleSubmit,
  handleNameChange,
  handleNumberChange,
  handleClearButton,
  newName,
  newNumber,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <Button onClick={handleSubmit} label="add" />
        <Button onClick={handleClearButton} label="clear" />
      </div>
    </form>
  )
}

const Button = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>
}

export default PersonForm
