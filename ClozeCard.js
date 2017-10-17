exports.ClozeCard = function(text, cloze) {
    let textToLower = text.toLowerCase();
    let clozeToLower = text.toLowerCase();

    if(!textToLower.includes(clozeToLower)){
        console.log("ERROR: cloze does not appear within full text" + " " + cloze);
        return;
    }

    this.cloze = cloze;
    this.partial = text.replace(cloze, "▲▲▲______________");
    this.full = text;
}
