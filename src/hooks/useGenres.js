const useGenres = (selectedgenres) => {
    if(selectedgenres<1) return "";
    const GenreIds = selectedgenres.map((s) => s.id);

    return GenreIds.reduce((acc,curr) => acc+','+curr);
}

export default useGenres
