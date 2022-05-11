export default function SearchMovieForm(
  search: string,
  onChange: any,
  onClick: any
) {
  return (
    <div>
      <form>
        <input type="text" value={search} onChange={onChange} />
        <button type="submit" onClick={onClick}>
          seacrh
        </button>
      </form>
    </div>
  );
}
