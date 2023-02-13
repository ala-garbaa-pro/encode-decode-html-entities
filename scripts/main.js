const inputCodeDOMElement = window.document.getElementById("input-code");
const outputCodeDOMElement =
    window.document.getElementById("output-code");
const clearHtmlTagsDOMElement =
    window.document.getElementById("clear-html-tags");

const encodeHTML = (html) =>
    html.replace(/./gm, (s) =>
        s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";"
    );

const onClickOnEncode = () =>
    (outputCodeDOMElement.value = encodeHTML(inputCodeDOMElement.value));

const decodeWithDOM = (html) =>
    (document.createElement("textarea").innerHTML = html).value;

const decodeHTMLWithRegex = (htmlEntities) =>
    (htmlEntities + "").replace(/&#\d+;/gm, (s) =>
        String.fromCharCode(s.match(/\d+/gm)[0])
    );

const decodeHtmlWithDOM = (html) => {
    const shadowElement = document.createElement("textarea");
    shadowElement.innerHTML = html;
    return shadowElement.value;
};

const transformHTMLToText = (html) => {
    const parseHTML = new DOMParser().parseFromString(html, "text/html");
    return parseHTML.body.textContent || "";
};

const onClickOnDecode = () => {
    let output = "";
    const decodedPassOne = decodeHTMLWithRegex(inputCodeDOMElement.value);
    const decodedPassTwo = decodeHtmlWithDOM(decodedPassOne);
    if (clearHtmlTagsDOMElement.checked) {
        output = transformHTMLToText(decodedPassTwo);
    } else {
        output = decodedPassTwo;
    }
    outputCodeDOMElement.value = output;
};

window.onload = () => onClickOnEncode();