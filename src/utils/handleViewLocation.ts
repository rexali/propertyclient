export function handleViewLocation(location: string) {
    const position = document.getElementById("#anchor");
    let anchor = document.createElement("a");
    anchor.href = "https://www.google.com/maps/place/" + location
    anchor.target = '_blank';
    anchor.click();
    position?.appendChild(anchor);
}