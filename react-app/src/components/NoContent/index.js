import "./NoContent.css";

export function NoContent({ text }) {
  return (
    <div className="textBox">
      <img className="noResult" src="/images/noResultIcon.svg" />
      <p>{text}</p>
    </div>
  )
}
