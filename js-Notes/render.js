import {draw} from "./draw-UI.js";


// метод перерисовки DOM
export function Rerender() {
    draw.RemoveCurrentDOM();
    draw.DrawActiveTable();
    draw.DrawSummaryTable();
    draw.DrawArchiveTable();
}

draw.DrawActiveTable();
draw.DrawAddNoteButton();
draw.DrawSummaryTable();
draw.DrawArchiveTable()